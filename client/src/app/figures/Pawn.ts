import { Coordinates, FigureType } from '../../types/types';
import Figure from './Figure';

export default class Pawn extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({ value: 1, x, y, isTransformable: false, isWhite, name, firstMove });
  }

  public getMoves(): Coordinates[] {
    const moves = [];
    if (this.isWhite) {
      moves.push({ x: this.x, y: this.y - 1 });
    } else {
      moves.push({ x: this.x, y: this.y + 1 });
    }
    if (this.firstMove) {
      if (this.isWhite) {
        moves.push({ x: this.x, y: this.y - 2 });
      } else {
        moves.push({ x: this.x, y: this.y + 2 });
      }
    }
    return this.filter(moves);
  }
}
