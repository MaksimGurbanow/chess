import { Coordinates, FigureType } from '../../types/types';
import Figure from './Figure';

export default class King extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({
      value: Infinity,
      x,
      y,
      isTransformable: false,
      isWhite,
      name,
      firstMove,
    });
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
