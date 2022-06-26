export class EmptyPosition {
  public x: number;
  public y: number;
  constructor(size: number) {
    this.x = size - 1;
    this.y = size - 1;
  }
  equal(x: number, y: number) {
    return x === this.x && y === this.y;
  }
}
