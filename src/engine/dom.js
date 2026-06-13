export function getDom() {
  const canvas = document.querySelector('#game');
  const questText = document.querySelector('#quest');
  const actionButton = document.querySelector('#action-button');
  const touchButtons = document.querySelectorAll('[data-dir]');

  if (!canvas || !questText || !actionButton) {
    throw new Error('No se encontró la interfaz base del juego.');
  }

  return {
    canvas,
    ctx: canvas.getContext('2d'),
    questText,
    actionButton,
    touchButtons
  };
}
