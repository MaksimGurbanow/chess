import { Coordinates } from '../../types/types';
import Figure from './Figure';

export default class Knight extends Figure {
  constructor(x: number, y: number, isWhite: boolean) {
    super({ value: 3, x, y, isTransformable: false, isWhite });
  }

  public getMoves(): Coordinates[] {
    return [
      {
        x: this.x - 2,
        y: this.y - 1,
      },
      {
        x: this.x - 2,
        y: this.y + 1,
      },
      {
        x: this.x + 2,
        y: this.y - 1,
      },
      {
        x: this.x + 2,
        y: this.y + 1,
      },
      {
        y: this.y - 2,
        x: this.x - 1,
      },
      {
        y: this.y - 2,
        x: this.x + 1,
      },
      {
        y: this.y + 2,
        x: this.x - 1,
      },
      {
        y: this.y + 2,
        x: this.x + 1,
      },
    ].filter(
      (coordinate) =>
        coordinate.x >= 0 &&
        coordinate.y >= 0 &&
        coordinate.x < 8 &&
        coordinate.y < 8
    );
  }
}
