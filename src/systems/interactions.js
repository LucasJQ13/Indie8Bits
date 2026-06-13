import { dialogs } from '../data/dialogs.js';
import { rectsOverlap } from '../engine/math.js';

export function updateInteractions(state, input) {
  if (!input.actionPressed) return;

  input.actionPressed = false;

  if (state.dialog) {
    state.dialog = null;
    return;
  }

  const hit = interactionRect(state.player);
  const npc = state.npcs.find((item) => rectsOverlap(hit, item));
  const sign = state.signs.find((item) => rectsOverlap(hit, item));

  if (npc?.id === 'elder') {
    talkToElder(state);
    return;
  }

  if (sign) {
    state.dialog = dialogs[sign.dialog];
  }
}

function talkToElder(state) {
  state.flags.talkedToElder = true;

  if (!state.flags.collectedCrystal) {
    state.dialog = dialogs.elderBeforeCrystal;
    state.quest = 'Encuentra el cristal celeste al sudeste.';
    return;
  }

  state.dialog = dialogs.elderAfterCrystal;
  state.quest = 'Misión completada. Próximo paso: abrir el sendero del norte.';
}

function interactionRect(player) {
  const reach = 10;
  const base = { x: player.x, y: player.y, w: player.w, h: player.h };

  if (player.facing === 'up') return { ...base, y: player.y - reach, h: reach };
  if (player.facing === 'down') return { ...base, y: player.y + player.h, h: reach };
  if (player.facing === 'left') return { ...base, x: player.x - reach, w: reach };

  return { ...base, x: player.x + player.w, w: reach };
}
