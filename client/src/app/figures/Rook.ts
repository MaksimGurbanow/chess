import { Coordinates, FigureType } from '../../types/types';
import Figure from './Figure';

export default class Rook extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({ value: 5, x, y, isTransformable: false, isWhite, name, firstMove });
  }

  public getMoves(): Coordinates[] {
    const moves = [];

    for (let x = 0; x < 8; x += 1) {
      if (x !== this.x) {
        moves.push({ x, y: this.y });
      }
    }

    for (let y = 0; y < 8; y += 1) {
      if (y !== this.y) {
        moves.push({ x: this.x, y });
      }
    }

    return this.filter(moves);
  }
}
