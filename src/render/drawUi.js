import { artStyle } from '../config/artConfig.js';
import { colors } from './colors.js';

export function drawDialog(ctx, dialog) {
  if (!dialog) return;

  const box = artStyle.dialog;
  drawPanel(ctx, box);
  drawPortrait(ctx, box.x + 4, box.y - 4);
  drawDialogText(ctx, dialog, box);
}

function drawPanel(ctx, box) {
  ctx.fillStyle = colors.dialogBorder;
  ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.fillStyle = colors.dialogBg;
  ctx.fillRect(box.x + 3, box.y + 3, box.w - 6, box.h - 6);
  ctx.fillStyle = 'rgba(90, 58, 30, 0.16)';
  ctx.fillRect(box.x + 5, box.y + 5, box.w - 10, 3);
}

function drawPortrait(ctx, x, y) {
  const size = artStyle.portraitSize;
  ctx.fillStyle = colors.dialogBorder;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = colors.portraitBg;
  ctx.fillRect(x + 4, y + 4, size - 8, size - 8);

  ctx.fillStyle = '#2f261c';
  ctx.fillRect(x + 17, y + 14, 25, 18);
  ctx.fillStyle = '#b88355';
  ctx.fillRect(x + 19, y + 22, 21, 19);
  ctx.fillStyle = '#1f2937';
  ctx.fillRect(x + 14, y + 37, 31, 14);
  ctx.fillStyle = '#3f2f1b';
  ctx.fillRect(x + 17, y + 31, 25, 10);
  ctx.fillStyle = colors.ink;
  ctx.fillRect(x + 23, y + 29, 4, 2);
  ctx.fillRect(x + 34, y + 29, 4, 2);
}

function drawDialogText(ctx, dialog, box) {
  const textX = box.x + artStyle.portraitSize + 14;
  const textY = box.y + 18;

  ctx.font = '8px monospace';
  ctx.fillStyle = colors.dialogDark;
  ctx.fillText(dialog[0], textX, textY);

  ctx.fillStyle = colors.ink;
  dialog.slice(1, 4).forEach((line, index) => {
    ctx.fillText(line, textX, textY + 14 + index * 10);
  });

  ctx.fillStyle = colors.dialogDark;
  ctx.fillText('A / E', box.x + box.w - 38, box.y + box.h - 10);
}
