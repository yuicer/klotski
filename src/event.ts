import type { EmptyPosition } from './empty-position';
import { IContainer } from './main';

export function event(
  size: number,
  emptyPosition: EmptyPosition,
  container: IContainer,
  rectLength: number,
  callback: () => void
) {
  container.children.forEach((rect) => {
    rect.on('pointerdown', () => {
      // related rect, queud by top, right, bottom,left
      if (emptyPosition.equal(rect.pos.x, rect.pos.y - 1)) {
        rect.y -= rectLength;
        emptyPosition.y = rect.pos.y;
        rect.pos.y -= 1;
      } else if (emptyPosition.equal(rect.pos.x + 1, rect.pos.y)) {
        rect.x += rectLength;
        emptyPosition.x = rect.pos.x;
        rect.pos.x += 1;
      } else if (emptyPosition.equal(rect.pos.x, rect.pos.y + 1)) {
        rect.y += rectLength;
        emptyPosition.y = rect.pos.y;
        rect.pos.y += 1;
      } else if (emptyPosition.equal(rect.pos.x - 1, rect.pos.y)) {
        rect.x -= rectLength;
        emptyPosition.x = rect.pos.x;
        rect.pos.x -= 1;
      }

      if (checkWin(size, container)) {
        callback();
      }
    });
  });
}

function checkWin(size: number, container: IContainer) {
  let result = true;
  if (
    container.children.find(
      (rect) => rect.number !== rect.pos.x + rect.pos.y * size + 1
    )
  )
    result = false;
  return result;
}
