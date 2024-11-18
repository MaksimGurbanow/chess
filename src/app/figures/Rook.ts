import { ChessBoard, FigureType, Move } from '../../types/types';
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

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
    ];

    directions.forEach(({ dx, dy }) => {
      let x = this.x + dx;
      let y = this.y + dy;

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const nextCell = board[y][x].name;

        if (this.isFigure(nextCell)) {
          if (
            (this.isWhite && nextCell[0] === 'b') ||
            (!this.isWhite && nextCell[0] === 'w')
          ) {
            moves.push({ x, y, to: { x, y }, from: { x: this.x, y: this.y } });
          }
          break;
        }

        moves.push({ x, y, to: { x, y }, from: { x: this.x, y: this.y } });
        x += dx;
        y += dy;
      }
    });

    return moves;
  }
}
