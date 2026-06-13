import { VIEW_H, VIEW_W } from '../config/gameConfig.js';
import { colors } from './colors.js';

export function drawDialog(ctx, dialog) {
  if (!dialog) return;

  ctx.fillStyle = colors.dialogBg;
  ctx.fillRect(12, VIEW_H - 62, VIEW_W - 24, 50);
  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 2;
  ctx.strokeRect(12, VIEW_H - 62, VIEW_W - 24, 50);

  ctx.fillStyle = colors.yellow;
  ctx.font = '8px monospace';
  ctx.fillText(dialog[0], 22, VIEW_H - 46);

  ctx.fillStyle = colors.white;
  dialog.slice(1, 4).forEach((line, index) => {
    ctx.fillText(line, 22, VIEW_H - 32 + index * 10);
  });

  ctx.fillStyle = colors.muted;
  ctx.fillText('E / Enter / A', VIEW_W - 86, VIEW_H - 18);
}
