import { Coordinates } from '../../types/types';
import Figure from './Figure';

export default class King extends Figure {
  constructor(x: number, y: number, isWhite: boolean) {
    super({ value: 3, x, y, isTransformable: false, isWhite });
  }

  public getMoves(): Coordinates[] {
    return this.filter([
      {
        x: this.x - 1,
        y: this.y,
      },
      {
        x: this.x - 1,
        y: this.y + 1,
      },
      {
        x: this.x - 1,
        y: this.y - 1,
      },
      {
        x: this.x,
        y: this.y + 1,
      },
      {
        x: this.x,
        y: this.y - 1,
      },
      {
        x: this.x + 1,
        y: this.y,
      },
      {
        x: this.x + 1,
        y: this.y + 1,
      },
      {
        x: this.x + 1,
        y: this.y - 1,
      },
    ]);
  }
}
