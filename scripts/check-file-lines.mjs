import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_LINES = 200;
const ROOT = process.cwd();
const CHECK_EXTENSIONS = new Set(['.js', '.css', '.html', '.json', '.md']);
const IGNORED_DIRS = new Set(['.git', 'dist', 'node_modules']);

const failures = [];

function extensionOf(path) {
  const index = path.lastIndexOf('.');
  return index === -1 ? '' : path.slice(index);
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (CHECK_EXTENSIONS.has(extensionOf(fullPath))) {
      checkFile(fullPath);
    }
  }
}

function checkFile(path) {
  const content = readFileSync(path, 'utf8');
  const lines = content.split('\n').length;

  if (lines > MAX_LINES) {
    failures.push({ path: path.replace(`${ROOT}/`, ''), lines });
  }
}

walk(ROOT);

if (failures.length > 0) {
  console.error(`Archivos sobre el límite sano de ${MAX_LINES} líneas:`);
  failures.forEach((file) => console.error(`- ${file.path}: ${file.lines} líneas`));
  process.exit(1);
}

console.log(`OK: ningún archivo supera ${MAX_LINES} líneas.`);
