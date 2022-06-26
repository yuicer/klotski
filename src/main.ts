import * as PIXI from 'pixi.js';
import { lottie } from './lottie';
import {
  padding,
  size,
  length,
  containerOpacity,
  backgroundColor,
} from './config';
import { EmptyPosition } from './empty-position';
import { create } from './create';
import { random } from './random';
import { event } from './event';

const app = new PIXI.Application({
  width: length,
  height: length,
  backgroundColor: backgroundColor,
});

app.renderer.plugins.interaction.autoPreventDefault = false;

document.querySelector('#app')?.appendChild(app.view);

export interface posGraphics extends PIXI.Graphics {
  pos: {
    x: number;
    y: number;
  };
  number: number;
}
export interface IContainer extends PIXI.Container {
  children: posGraphics[];
}

const player = lottie();
let gameWin = false;

const container = new PIXI.Container() as IContainer;
container.x = padding;
container.y = padding;
app.stage.addChild(container);

const emptyPosition = new EmptyPosition(size);

const winCallback = () => {
  setTimeout(() => {
    gameWin = true;
  }, 1600);
  container.alpha = containerOpacity;
  player.play();
  container.children.forEach((x) => x.removeAllListeners());
};

function gameStart() {
  // 初始化 size*size 棋盘
  create(emptyPosition, container);
  // event
  event(emptyPosition, container, winCallback);
  // 乱序开局
  random(emptyPosition, container);
}

function controller() {
  document.body.addEventListener('click', () => {
    // restart
    if (!gameWin) return;
    gameWin = false;
    container.alpha = 1;
    player.stop();

    container.removeChildren();
    gameStart();
  });
}

gameStart();
controller();
