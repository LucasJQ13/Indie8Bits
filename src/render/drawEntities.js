import { colors } from './colors.js';

const playerPalette = { body: '#2563eb', face: '#f3c78a', hair: '#1f2937' };

export function drawEntities(ctx, state, camera) {
  drawSigns(ctx, state.signs, camera);
  drawCollectibles(ctx, state, camera);
  state.npcs.forEach((npc) => drawCharacter(ctx, npc, camera, npc.palette));
  drawCharacter(ctx, state.player, camera, playerPalette);
}

function drawSigns(ctx, signs, camera) {
  signs.forEach((sign) => {
    ctx.fillStyle = '#78350f';
    ctx.fillRect(sign.x - camera.x + 5, sign.y - camera.y + 7, 2, 7);
    ctx.fillStyle = colors.yellow;
    ctx.fillRect(sign.x - camera.x, sign.y - camera.y, sign.w, 8);
  });
}

function drawCollectibles(ctx, state, camera) {
  if (state.flags.collectedCrystal) return;

  const crystal = state.collectibles.find((item) => item.id === 'skyCrystal');
  if (!crystal) return;

  const pulse = Math.sin(performance.now() / 170) * 2;
  ctx.fillStyle = '#67e8f9';
  ctx.fillRect(crystal.x - camera.x + 3, crystal.y - camera.y + pulse, 4, 10);
  ctx.fillStyle = '#ecfeff';
  ctx.fillRect(crystal.x - camera.x + 4, crystal.y - camera.y + 2 + pulse, 2, 2);
}

function drawCharacter(ctx, entity, camera, palette) {
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
  drawEyes(ctx, entity, x, y);
}

function drawEyes(ctx, entity, x, y) {
  ctx.fillStyle = colors.ink;

  if (entity.facing === 'left') ctx.fillRect(x + 3, y + 4, 2, 1);
  else if (entity.facing === 'right') ctx.fillRect(x + 7, y + 4, 2, 1);
  else {
    ctx.fillRect(x + 4, y + 4, 1, 1);
    ctx.fillRect(x + 8, y + 4, 1, 1);
  }
}
