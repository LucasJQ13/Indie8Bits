import { controls } from '../config/gameConfig.js';

const touchKeyByDir = {
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright'
};

export function createInput(dom) {
  const input = { keys: new Set(), actionPressed: false };

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    input.keys.add(key);

    if (controls.actionKeys.has(key)) {
      input.actionPressed = true;
      event.preventDefault();
    }
  });

  window.addEventListener('keyup', (event) => {
    input.keys.delete(event.key.toLowerCase());
  });

  bindTouchButtons(dom, input);
  return input;
}

function bindTouchButtons(dom, input) {
  dom.touchButtons.forEach((button) => {
    const key = touchKeyByDir[button.dataset.dir];

    const press = (event) => {
      event.preventDefault();
      button.classList.add('pressed');
      input.keys.add(key);
    };

    const release = (event) => {
      event.preventDefault();
      button.classList.remove('pressed');
      input.keys.delete(key);
    };

    button.addEventListener('pointerdown', press);
    button.addEventListener('pointerup', release);
    button.addEventListener('pointercancel', release);
    button.addEventListener('pointerleave', release);
  });

  dom.actionButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    input.actionPressed = true;
  });
}
