import { TILE, VIEW_H, VIEW_W, WORLD_COLS, WORLD_ROWS } from '../config/gameConfig.js';
import { clamp } from './math.js';

export function getCamera(target) {
  return {
    x: clamp(target.x - VIEW_W / 2, 0, WORLD_COLS * TILE - VIEW_W),
    y: clamp(target.y - VIEW_H / 2, 0, WORLD_ROWS * TILE - VIEW_H)
  };
}
