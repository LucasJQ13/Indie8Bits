const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const questText = document.querySelector('#quest');

const TILE = 16;
const WORLD_COLS = 32;
const WORLD_ROWS = 22;
const VIEW_W = canvas.width;
const VIEW_H = canvas.height;

const keys = new Set();
let actionPressed = false;
let lastTime = 0;
let dialog = null;
let collectedCrystal = false;
let talkedToElder = false;

const tileMap = [
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WGGGTTTGGGGGGGGGGGGGGGGGTTTGGGGW',
  'WGGGTGTGGGGGGGGGGGGGGGGGTGTGGGGW',
  'WGGGTTTGGGGGGGGGGGGGGGGGTTTGGGGW',
  'WGGGGGGGGGGGGGPPPPGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGPHHPGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGPHHPGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGPPPPGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WGGGGGGGSSSSSSSGGGGGGSSSSGGGGGGW',
  'WGGGGGGGSGGGGGSGGGGGGSGGSGGGGGGW',
  'WGGGGGGGSGGGGGSGGGGGGSSSSGGGGGGW',
  'WGGGGGGGSSSSSSSGGGGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WGGGTTTGGGGGGGGGGGGGGGGGTTTGGGGW',
  'WGGGTGTGGGGGGGGGGGGGGGGGTGTGGGGW',
  'WGGGTTTGGGGGGGGGGGGGGGGGTTTGGGGW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGW',
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'
];

const solidTiles = new Set(['W', 'T', 'H']);

const player = {
  x: 80,
  y: 80,
  w: 12,
  h: 14,
  speed: 72,
  facing: 'down',
  step: 0
};

const elder = {
  x: 252,
  y: 126,
  w: 12,
  h: 14,
  name: 'Anciano Aldeano'
};

const crystal = {
  x: 414,
  y: 260,
  w: 10,
  h: 10
};

const signs = [
  {
    x: 178,
    y: 226,
    w: 12,
    h: 12,
    text: ['Cartel:', 'Bosque Viejo al norte.', 'Ruinas del Cristal al este.']
  }
];

const colors = {
  grassA: '#3f9f4f',
  grassB: '#348d46',
  water: '#2563eb',
  sand: '#caa25a',
  path: '#9a6b38',
  houseWall: '#8b5a2b',
  houseRoof: '#9f1239',
  treeTop: '#166534',
  treeTrunk: '#78350f',
  shadow: 'rgba(0,0,0,0.25)'
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function tileAtPixel(x, y) {
  const col = Math.floor(x / TILE);
  const row = Math.floor(y / TILE);
  if (row < 0 || row >= WORLD_ROWS || col < 0 || col >= WORLD_COLS) return 'W';
  return tileMap[row][col];
}

function isSolidAtRect(rect) {
  const points = [
    [rect.x, rect.y],
    [rect.x + rect.w - 1, rect.y],
    [rect.x, rect.y + rect.h - 1],
    [rect.x + rect.w - 1, rect.y + rect.h - 1]
  ];

  return points.some(([x, y]) => solidTiles.has(tileAtPixel(x, y)));
}

function movePlayer(dx, dy, dt) {
  if (dx === 0 && dy === 0) return;

  if (Math.abs(dx) > Math.abs(dy)) player.facing = dx > 0 ? 'right' : 'left';
  else player.facing = dy > 0 ? 'down' : 'up';

  const length = Math.hypot(dx, dy) || 1;
  const vx = (dx / length) * player.speed * dt;
  const vy = (dy / length) * player.speed * dt;

  const nextX = { ...player, x: player.x + vx };
  if (!isSolidAtRect(nextX) && !rectsOverlap(nextX, elder)) player.x += vx;

  const nextY = { ...player, y: player.y + vy };
  if (!isSolidAtRect(nextY) && !rectsOverlap(nextY, elder)) player.y += vy;

  player.x = clamp(player.x, TILE, WORLD_COLS * TILE - TILE);
  player.y = clamp(player.y, TILE, WORLD_ROWS * TILE - TILE);
  player.step += dt * 9;
}

function getCamera() {
  return {
    x: clamp(player.x - VIEW_W / 2, 0, WORLD_COLS * TILE - VIEW_W),
    y: clamp(player.y - VIEW_H / 2, 0, WORLD_ROWS * TILE - VIEW_H)
  };
}

function drawTile(tile, x, y) {
  if (tile === 'W') {
    ctx.fillStyle = colors.water;
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(x + 2, y + 5, 8, 2);
    return;
  }

  ctx.fillStyle = (x / TILE + y / TILE) % 2 === 0 ? colors.grassA : colors.grassB;
  ctx.fillRect(x, y, TILE, TILE);

  if (tile === 'P') {
    ctx.fillStyle = colors.path;
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x + 3, y + 3, 3, 2);
  }

  if (tile === 'S') {
    ctx.fillStyle = colors.sand;
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = '#8a5a2b';
    ctx.fillRect(x + 3, y + 10, 9, 2);
  }

  if (tile === 'H') {
    ctx.fillStyle = colors.houseRoof;
    ctx.fillRect(x, y, TILE, 6);
    ctx.fillStyle = colors.houseWall;
    ctx.fillRect(x, y + 6, TILE, 10);
  }

  if (tile === 'T') {
    ctx.fillStyle = colors.grassA;
    ctx.fillRect(x, y, TILE, TILE);
    ctx.fillStyle = colors.treeTrunk;
    ctx.fillRect(x + 6, y + 8, 4, 8);
    ctx.fillStyle = colors.treeTop;
    ctx.fillRect(x + 2, y + 2, 12, 10);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(x + 4, y + 3, 4, 2);
  }
}

function drawMap(camera) {
  const startCol = Math.floor(camera.x / TILE);
  const endCol = Math.ceil((camera.x + VIEW_W) / TILE);
  const startRow = Math.floor(camera.y / TILE);
  const endRow = Math.ceil((camera.y + VIEW_H) / TILE);

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (row < 0 || col < 0 || row >= WORLD_ROWS || col >= WORLD_COLS) continue;
      drawTile(tileMap[row][col], col * TILE - camera.x, row * TILE - camera.y);
    }
  }
}

function drawCharacter(entity, camera, palette) {
  const x = Math.round(entity.x - camera.x);
  const y = Math.round(entity.y - camera.y);
  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x + 1, y + entity.h - 2, entity.w, 3);
  ctx.fillStyle = palette.body;
  ctx.fillRect(x + 2, y + 5, entity.w - 4, 8);
  ctx.fillStyle = palette.face;
  ctx.fillRect(x + 3, y + 1, entity.w - 6, 6);
  ctx.fillStyle = palette.hair;
  ctx.fillRect(x + 2, y, entity.w - 4, 3);
  ctx.fillStyle = '#020617';
  if (entity.facing === 'left') ctx.fillRect(x + 3, y + 4, 2, 1);
  else if (entity.facing === 'right') ctx.fillRect(x + 7, y + 4, 2, 1);
  else {
    ctx.fillRect(x + 4, y + 4, 1, 1);
    ctx.fillRect(x + 8, y + 4, 1, 1);
  }
}

function drawObjects(camera) {
  signs.forEach((sign) => {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(sign.x - camera.x + 5, sign.y - camera.y + 7, 2, 7);
    ctx.fillStyle = '#facc15';
    ctx.fillRect(sign.x - camera.x, sign.y - camera.y, sign.w, 8);
  });

  if (!collectedCrystal) {
    const pulse = Math.sin(performance.now() / 170) * 2;
    ctx.fillStyle = '#67e8f9';
    ctx.fillRect(crystal.x - camera.x + 3, crystal.y - camera.y + pulse, 4, 10);
    ctx.fillStyle = '#ecfeff';
    ctx.fillRect(crystal.x - camera.x + 4, crystal.y - camera.y + 2 + pulse, 2, 2);
  }
}

function interactionRect() {
  const reach = 10;
  const base = { x: player.x, y: player.y, w: player.w, h: player.h };
  if (player.facing === 'up') return { ...base, y: player.y - reach, h: reach };
  if (player.facing === 'down') return { ...base, y: player.y + player.h, h: reach };
  if (player.facing === 'left') return { ...base, x: player.x - reach, w: reach };
  return { ...base, x: player.x + player.w, w: reach };
}

function handleAction() {
  if (dialog) {
    dialog = null;
    return;
  }

  const hit = interactionRect();

  if (rectsOverlap(hit, elder)) {
    talkedToElder = true;
    if (!collectedCrystal) {
      dialog = ['Anciano Aldeano', 'El bosque está raro...', 'Busca el cristal celeste al sudeste.', 'Con él podremos abrir el viejo sendero.'];
      questText.textContent = 'Encuentra el cristal celeste al sudeste.';
    } else {
      dialog = ['Anciano Aldeano', '¡Lo encontraste!', 'Esta aldea vuelve a tener esperanza.', 'Próximo objetivo: abrir el sendero del norte.'];
      questText.textContent = 'Misión completada. Próximo paso: abrir el sendero del norte.';
    }
    return;
  }

  for (const sign of signs) {
    if (rectsOverlap(hit, sign)) {
      dialog = sign.text;
      return;
    }
  }
}

function update(dt) {
  let dx = 0;
  let dy = 0;

  if (!dialog) {
    if (keys.has('arrowleft') || keys.has('a')) dx -= 1;
    if (keys.has('arrowright') || keys.has('d')) dx += 1;
    if (keys.has('arrowup') || keys.has('w')) dy -= 1;
    if (keys.has('arrowdown') || keys.has('s')) dy += 1;
    movePlayer(dx, dy, dt);
  }

  if (!collectedCrystal && rectsOverlap(player, crystal)) {
    collectedCrystal = true;
    dialog = ['Cristal Celeste', 'Obtuviste el primer objeto clave.', 'Vuelve con el anciano.'];
    questText.textContent = talkedToElder ? 'Vuelve con el anciano.' : 'Encontraste algo extraño. Busca quién pueda ayudarte.';
  }

  if (actionPressed) {
    handleAction();
    actionPressed = false;
  }
}

function drawDialog() {
  if (!dialog) return;
  ctx.fillStyle = 'rgba(2, 6, 23, 0.92)';
  ctx.fillRect(12, VIEW_H - 62, VIEW_W - 24, 50);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, VIEW_H - 62, VIEW_W - 24, 50);

  ctx.fillStyle = '#facc15';
  ctx.font = '8px monospace';
  ctx.fillText(dialog[0], 22, VIEW_H - 46);

  ctx.fillStyle = '#f8fafc';
  dialog.slice(1, 4).forEach((line, index) => {
    ctx.fillText(line, 22, VIEW_H - 32 + index * 10);
  });

  ctx.fillStyle = '#cbd5e1';
  ctx.fillText('E / Enter / A', VIEW_W - 86, VIEW_H - 18);
}

function draw() {
  const camera = getCamera();
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, VIEW_W, VIEW_H);

  drawMap(camera);
  drawObjects(camera);
  drawCharacter(elder, camera, { body: '#6d28d9', face: '#f1c27d', hair: '#f8fafc' });
  drawCharacter(player, camera, { body: '#2563eb', face: '#f3c78a', hair: '#1f2937' });
  drawDialog();
}

function loop(time) {
  const dt = Math.min((time - lastTime) / 1000 || 0, 0.033);
  lastTime = time;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  keys.add(key);
  if (key === 'e' || key === 'enter' || key === ' ') {
    actionPressed = true;
    event.preventDefault();
  }
});

window.addEventListener('keyup', (event) => {
  keys.delete(event.key.toLowerCase());
});

const dirMap = {
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright'
};

document.querySelectorAll('[data-dir]').forEach((button) => {
  const key = dirMap[button.dataset.dir];
  const press = (event) => {
    event.preventDefault();
    button.classList.add('pressed');
    keys.add(key);
  };
  const release = (event) => {
    event.preventDefault();
    button.classList.remove('pressed');
    keys.delete(key);
  };
  button.addEventListener('pointerdown', press);
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('pointerleave', release);
});

document.querySelector('#action-button').addEventListener('pointerdown', (event) => {
  event.preventDefault();
  actionPressed = true;
});

requestAnimationFrame(loop);
