import { colors } from './colors.js';

export function drawProps(ctx, props, camera) {
  props.forEach((prop) => {
    if (prop.type === 'campfire') drawCampfire(ctx, prop, camera);
    if (prop.type === 'well') drawWell(ctx, prop, camera);
    if (prop.type === 'stone') drawStone(ctx, prop, camera);
    if (prop.type === 'grassTuft') drawGrassTuft(ctx, prop, camera);
    if (prop.type === 'crate') drawCrate(ctx, prop, camera);
  });
}

function screen(prop, camera) {
  return { x: Math.round(prop.x - camera.x), y: Math.round(prop.y - camera.y) };
}

function shadow(ctx, x, y, w) {
  ctx.fillStyle = colors.shadow;
  ctx.fillRect(x + 2, y + 12, w, 4);
}

function drawCampfire(ctx, prop, camera) {
  const { x, y } = screen(prop, camera);
  shadow(ctx, x, y, 18);
  ctx.fillStyle = '#5b2b18';
  ctx.fillRect(x + 1, y + 12, 15, 4);
  ctx.fillStyle = '#f97316';
  ctx.fillRect(x + 6, y + 5, 6, 9);
  ctx.fillStyle = '#facc15';
  ctx.fillRect(x + 8, y + 2, 4, 8);
  ctx.fillStyle = '#fee2a8';
  ctx.fillRect(x + 9, y + 6, 2, 4);
}

function drawWell(ctx, prop, camera) {
  const { x, y } = screen(prop, camera);
  shadow(ctx, x, y, 26);
  ctx.fillStyle = '#1e1b4b';
  ctx.fillRect(x + 3, y + 6, 22, 12);
  ctx.fillStyle = '#312e81';
  ctx.fillRect(x + 1, y + 2, 26, 8);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(x + 6, y + 5, 16, 7);
}

function drawStone(ctx, prop, camera) {
  const { x, y } = screen(prop, camera);
  shadow(ctx, x, y, 12);
  ctx.fillStyle = '#4b5563';
  ctx.fillRect(x + 2, y + 3, 10, 6);
  ctx.fillStyle = '#6b7280';
  ctx.fillRect(x + 4, y + 1, 7, 3);
}

function drawGrassTuft(ctx, prop, camera) {
  const { x, y } = screen(prop, camera);
  ctx.fillStyle = '#1f4f46';
  ctx.fillRect(x + 2, y + 5, 2, 5);
  ctx.fillRect(x + 5, y + 2, 2, 8);
  ctx.fillRect(x + 8, y + 4, 2, 6);
}

function drawCrate(ctx, prop, camera) {
  const { x, y } = screen(prop, camera);
  shadow(ctx, x, y, 14);
  ctx.fillStyle = '#7c4a21';
  ctx.fillRect(x, y, 16, 14);
  ctx.fillStyle = '#a16207';
  ctx.fillRect(x + 2, y + 2, 12, 3);
  ctx.fillRect(x + 6, y, 3, 14);
}
