import '@lottiefiles/lottie-player';
import type { LottiePlayer } from '@lottiefiles/lottie-player';
import json from './json';

export function lottie() {
  const player = document.createElement('lottie-player') as LottiePlayer;
  player.id = 'lottie';
  const app = document.querySelector('#app');

  app?.appendChild(player);
  player.addEventListener('rendered', () => {
    player.load(json);
  });
  return player;
}
