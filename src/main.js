import { VIEW_H, VIEW_W } from './config/gameConfig.js';
import { getCamera } from './engine/camera.js';
import { getDom } from './engine/dom.js';
import { startGameLoop } from './engine/gameLoop.js';
import { createInput } from './engine/input.js';
import { drawEntities } from './render/drawEntities.js';
import { drawMap } from './render/drawMap.js';
import { drawDialog } from './render/drawUi.js';
import { createGameState } from './state/createGameState.js';
import { updateCollectibles } from './systems/collectibles.js';
import { updateInteractions } from './systems/interactions.js';
import { updatePlayerMovement } from './systems/playerMovement.js';

const dom = getDom();
const input = createInput(dom);
const state = createGameState();

function update(dt) {
  updatePlayerMovement(state, input, dt);
  updateCollectibles(state);
  updateInteractions(state, input);
  dom.questText.textContent = state.quest;
}

function draw() {
  const camera = getCamera(state.player);

  dom.ctx.imageSmoothingEnabled = false;
  dom.ctx.clearRect(0, 0, VIEW_W, VIEW_H);

  drawMap(dom.ctx, camera);
  drawEntities(dom.ctx, state, camera);
  drawDialog(dom.ctx, state.dialog);
}

startGameLoop({ update, draw });
