import { Coordinates } from '../../types/types';
import Figure from './Figure';

export default class Pawn extends Figure {
  constructor(x: number, y: number, isWhite: boolean) {
    super({ value: 1, x, y, isWhite });
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
