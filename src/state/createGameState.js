import { crystal, elder, playerStart, signs } from '../data/entities.js';

export function createGameState() {
  return {
    player: { ...playerStart },
    npcs: [{ ...elder }],
    signs: signs.map((sign) => ({ ...sign })),
    collectibles: [{ ...crystal }],
    flags: {
      collectedCrystal: false,
      talkedToElder: false
    },
    dialog: null,
    quest: 'Explora la aldea y habla con el anciano.'
  };
}
