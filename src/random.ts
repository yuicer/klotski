import { randomCount } from './config';
import type { EmptyPosition } from './empty-position';
import { IContainer } from './main';

type IDirection = 'top' | 'right' | 'bottom' | 'left';

function random(
  size: number,
  emptyPosition: EmptyPosition,
  container: IContainer,
  rectLength: number
) {
  let path: IDirection[] = [];
  let realCount = randomCount === 1 ? 1 : randomCount + size * 5;
  for (let i = 0; i < realCount; i++) {
    loop(size, emptyPosition, container, rectLength, path);
  }

  // @ts-ignore
  window.path = path;
}
function loop(
  size: number,
  emptyPosition: EmptyPosition,
  container: IContainer,
  rectLength: number,
  path: IDirection[]
) {
  const direction = getRandomRelativeRectPos(
    emptyPosition.x,
    emptyPosition.y,
    size,
    path.length > 0 ? path[path.length - 1] : undefined
  );

  path.push(direction);

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
  size: number,
  preDirection?: IDirection
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
  if (preDirection) {
    const walkedDirection = getOppositeDirection(preDirection);
    delete map[walkedDirection];
  }

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

function getOppositeDirection(direction: IDirection): IDirection {
  if (direction === 'top') return 'bottom';
  else if (direction === 'bottom') return 'top';
  else if (direction === 'left') return 'right';
  else return 'left';
}
