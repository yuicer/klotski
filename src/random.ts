import { rectLength, size, randomCount } from './config';
import type { EmptyPosition } from './empty-position';
import { IContainer } from './main';

type IDirection = 'top' | 'right' | 'bottom' | 'left';

function random(emptyPosition: EmptyPosition, container: IContainer) {
  for (let i = 0; i < randomCount; i++) {
    loop(emptyPosition, container);
  }
}
function loop(emptyPosition: EmptyPosition, container: IContainer) {
  const direction = getRandomRelativeRectPos(
    emptyPosition.x,
    emptyPosition.y,
    size
  );

  if (direction === 'top') {
    const rect = container.children.find((c) => {
      return c.pos.x === emptyPosition.x && c.pos.y === emptyPosition.y - 1;
    });
    if (rect) {
      rect.y += rectLength;
      rect.pos.y += 1;
    }
    emptyPosition.y -= 1;
  } else if (direction === 'right') {
    const rect = container.children.find((c) => {
      return c.pos.x === emptyPosition.x + 1 && c.pos.y === emptyPosition.y;
    });
    if (rect) {
      rect.pos.x -= 1;
      rect.x -= rectLength;
    }
    emptyPosition.x += 1;
  } else if (direction === 'bottom') {
    const rect = container.children.find((c) => {
      return c.pos.x === emptyPosition.x && c.pos.y === emptyPosition.y + 1;
    });
    if (rect) {
      rect.pos.y -= 1;
      rect.y -= rectLength;
    }
    emptyPosition.y += 1;
  } else if (direction === 'left') {
    const rect = container.children.find((c) => {
      return c.pos.x === emptyPosition.x - 1 && c.pos.y === emptyPosition.y;
    });
    if (rect) {
      rect.pos.x += 1;
      rect.x += rectLength;
    }
    emptyPosition.x -= 1;
  }
}

function getRandomRelativeRectPos(
  x: number,
  y: number,
  size: number
): IDirection {
  const map: {
    top?: any;
    right?: any;
    bottom?: any;
    left?: any;
  } = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
  };
  if (x === size - 1) delete map.right;
  else if (x === 0) delete map.left;

  if (y === size - 1) delete map.bottom;
  else if (y === 0) delete map.top;

  const directionArray = Object.keys(map) as IDirection[];
  const direction =
    directionArray[Math.floor(Math.random() * directionArray.length)];

  return direction;
}
export { random };
