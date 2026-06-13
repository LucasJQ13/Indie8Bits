import { solidTiles, TILE, WORLD_COLS, WORLD_ROWS } from '../config/gameConfig.js';
import { tileMap } from '../data/worldMap.js';
import { rectsOverlap } from './math.js';

export function tileAtPixel(x, y) {
  const col = Math.floor(x / TILE);
  const row = Math.floor(y / TILE);

  if (row < 0 || row >= WORLD_ROWS || col < 0 || col >= WORLD_COLS) {
    return 'W';
  }

  return tileMap[row][col];
}

export function isSolidAtRect(rect) {
  const points = [
    [rect.x, rect.y],
    [rect.x + rect.w - 1, rect.y],
    [rect.x, rect.y + rect.h - 1],
    [rect.x + rect.w - 1, rect.y + rect.h - 1]
  ];

  return points.some(([x, y]) => solidTiles.has(tileAtPixel(x, y)));
}

export function collidesWithAny(rect, entities) {
  return entities.some((entity) => rectsOverlap(rect, entity));
}
