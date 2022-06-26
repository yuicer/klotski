import * as PIXI from 'pixi.js';
import { rectLength, size } from './config';
import { IContainer, posGraphics } from './main';
import type { EmptyPosition } from './empty-position';

function create(emptyPosition: EmptyPosition, container: IContainer) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      // 华容道删一个
      if (i * size + j === Math.pow(size, 2) - 1) break;

      const rect = new PIXI.Graphics() as posGraphics;

      rect.pos = { x: j, y: i };
      rect.number = i * size + j + 1;

      rect.beginFill(0x434343);
      rect.lineStyle(4, 0x262626);
      rect.drawRect(j * rectLength, i * rectLength, rectLength, rectLength);
      rect.endFill();
      rect.interactive = true;

      let text = new PIXI.Text(i * size + j + 1, {
        fontSize: rectLength / 2,
        fill: 0xfafafa,
      });
      text.anchor.set(0.5, 0.5);
      text.x = rectLength / 2 + rectLength * j;
      text.y = rectLength / 2 + rectLength * i;
      rect.addChild(text);

      container.addChild(rect);
    }
  }
}

export { create };
