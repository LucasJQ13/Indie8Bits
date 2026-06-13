import { artStyle } from '../config/artConfig.js';

export function drawAtmosphere(ctx, camera, props) {
  drawAmbientOverlay(ctx);
  props.filter((prop) => prop.type === 'campfire').forEach((fire) => drawFireLight(ctx, fire, camera));
}

function drawAmbientOverlay(ctx) {
  ctx.fillStyle = artStyle.ambientOverlay;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawFireLight(ctx, fire, camera) {
  const x = fire.x - camera.x + fire.w / 2;
  const y = fire.y - camera.y + fire.h / 2;
  const radius = artStyle.fireLightRadius;
  const gradient = ctx.createRadialGradient(x, y, 4, x, y, radius);

  gradient.addColorStop(0, 'rgba(252, 211, 77, 0.34)');
  gradient.addColorStop(0.45, 'rgba(249, 115, 22, 0.16)');
  gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}
