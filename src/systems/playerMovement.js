import { TILE, WORLD_COLS, WORLD_ROWS, controls } from '../config/gameConfig.js';
import { collidesWithAny, isSolidAtRect } from '../engine/collision.js';
import { clamp } from '../engine/math.js';

export function updatePlayerMovement(state, input, dt) {
  if (state.dialog) return;

  const dx = axis(input, 'right') - axis(input, 'left');
  const dy = axis(input, 'down') - axis(input, 'up');

  movePlayer(state, dx, dy, dt);
}

function axis(input, direction) {
  return controls.directions[direction].some((key) => input.keys.has(key)) ? 1 : 0;
}

function movePlayer(state, dx, dy, dt) {
  const player = state.player;
  if (dx === 0 && dy === 0) return;

  player.facing = Math.abs(dx) > Math.abs(dy)
    ? dx > 0 ? 'right' : 'left'
    : dy > 0 ? 'down' : 'up';

  const length = Math.hypot(dx, dy) || 1;
  const vx = (dx / length) * player.speed * dt;
  const vy = (dy / length) * player.speed * dt;

  tryMoveAxis(state, 'x', vx);
  tryMoveAxis(state, 'y', vy);

  player.x = clamp(player.x, TILE, WORLD_COLS * TILE - TILE);
  player.y = clamp(player.y, TILE, WORLD_ROWS * TILE - TILE);
  player.step += dt * 9;
}

function tryMoveAxis(state, axisName, amount) {
  const next = { ...state.player, [axisName]: state.player[axisName] + amount };

  if (!isSolidAtRect(next) && !collidesWithAny(next, state.npcs)) {
    state.player[axisName] += amount;
  }
}
