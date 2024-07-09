/* eslint-disable no-continue */
import { Coordinates, FigureType } from '../../types/types';
import Figure from './Figure';

export default class Bishop extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({ value: 3, x, y, isTransformable: false, isWhite, name, firstMove });
  }

  public getMoves(): Coordinates[] {
    const moves = [];
    for (let x = 0; x < 8; x += 1) {
      if (x === this.x) continue;
      const difference = Math.abs(x - this.x);
      moves.push({ x, y: this.y - difference }, { x, y: this.y + difference });
    }

    return moves.filter(
      (move) => move.x >= 0 && move.y < 8 && move.y >= 0 && move.x < 8
    );
  }
}
