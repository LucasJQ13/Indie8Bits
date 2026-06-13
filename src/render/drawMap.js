import { TILE, VIEW_H, VIEW_W } from '../config/gameConfig.js';
import { tileMap } from '../data/worldMap.js';
import { colors } from './colors.js';

export function drawMap(ctx, camera) {
  const startCol = Math.floor(camera.x / TILE);
  const endCol = Math.ceil((camera.x + VIEW_W) / TILE);
  const startRow = Math.floor(camera.y / TILE);
  const endRow = Math.ceil((camera.y + VIEW_H) / TILE);

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (!tileMap[row]?.[col]) continue;
      drawTile(ctx, tileMap[row][col], col * TILE - camera.x, row * TILE - camera.y);
    }
  }
}

function drawTile(ctx, tile, x, y) {
  if (tile === 'W') return drawWater(ctx, x, y);

  ctx.fillStyle = (x / TILE + y / TILE) % 2 === 0 ? colors.grassA : colors.grassB;
  ctx.fillRect(x, y, TILE, TILE);

  if (tile === 'P') drawPath(ctx, x, y);
  if (tile === 'S') drawSand(ctx, x, y);
  if (tile === 'H') drawHouse(ctx, x, y);
  if (tile === 'T') drawTree(ctx, x, y);
}

function drawWater(ctx, x, y) {
  ctx.fillStyle = colors.water;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.fillRect(x + 2, y + 5, 8, 2);
}

function drawPath(ctx, x, y) {
  ctx.fillStyle = colors.path;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.fillRect(x + 3, y + 3, 3, 2);
}

function drawSand(ctx, x, y) {
  ctx.fillStyle = colors.sand;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(x + 3, y + 10, 9, 2);
}

function drawHouse(ctx, x, y) {
  ctx.fillStyle = colors.houseRoof;
  ctx.fillRect(x, y, TILE, 6);
  ctx.fillStyle = colors.houseWall;
  ctx.fillRect(x, y + 6, TILE, 10);
}

function drawTree(ctx, x, y) {
  ctx.fillStyle = colors.treeTrunk;
  ctx.fillRect(x + 6, y + 8, 4, 8);
  ctx.fillStyle = colors.treeTop;
  ctx.fillRect(x + 2, y + 2, 12, 10);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(x + 4, y + 3, 4, 2);
}
