/* eslint-disable no-continue */
import { ChessBoard, FigureType, Move } from '../../types/types';
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

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    const directions = [
      {
        dx: 1,
        dy: 1,
      },
      {
        dx: 1,
        dy: -1,
      },
      {
        dx: -1,
        dy: 1,
      },
      {
        dx: -1,
        dy: -1,
      },
    ];
    directions.forEach(({ dx, dy }) => {
      let x = this.x + dx;
      let y = this.y + dy;
      while (this.isWithinBounds({ x, y })) {
        const nextCell = board[y][x].name;
        const oppositeColor = this.isWhite ? 'b' : 'w';
        if (this.isFigure(nextCell)) {
          if (nextCell[0] === oppositeColor) {
            moves.push({ x, y, from: { x: this.x, y: this.y }, to: { x, y } });
          }
          break;
        } else {
          moves.push({ x, y, from: { x: this.x, y: this.y }, to: { x, y } });
        }
        x += dx;
        y += dy;
      }
    });

    return this.filterMoves(moves);
  }
}
