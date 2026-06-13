export const TILE = 16;
export const WORLD_COLS = 32;
export const WORLD_ROWS = 22;
export const VIEW_W = 320;
export const VIEW_H = 180;
export const MAX_SOURCE_LINES = 200;

export const solidTiles = new Set(['W', 'T', 'H']);

export const controls = {
  actionKeys: new Set(['e', 'enter', ' ']),
  directions: {
    up: ['arrowup', 'w'],
    down: ['arrowdown', 's'],
    left: ['arrowleft', 'a'],
    right: ['arrowright', 'd']
  }
};
