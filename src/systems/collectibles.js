import { dialogs } from '../data/dialogs.js';
import { rectsOverlap } from '../engine/math.js';

export function updateCollectibles(state) {
  if (state.flags.collectedCrystal) return;

  const crystal = state.collectibles.find((item) => item.id === 'skyCrystal');
  if (!crystal || !rectsOverlap(state.player, crystal)) return;

  state.flags.collectedCrystal = true;
  state.dialog = dialogs.crystalFound;

  state.quest = state.flags.talkedToElder
    ? 'Vuelve con el anciano.'
    : 'Encontraste algo extraño. Busca quién pueda ayudarte.';
}
