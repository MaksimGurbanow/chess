import { ChessBoard, FigureType, Move } from '../../types/types';
import Figure from './Figure';

export default class Queen extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({ value: 9, x, y, isTransformable: false, isWhite, name, firstMove });
  }

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    const directions = [
      { dx: 1, dy: 0 }, // Right
      { dx: -1, dy: 0 }, // Left
      { dx: 0, dy: 1 }, // Down
      { dx: 0, dy: -1 }, // Up
      { dx: 1, dy: 1 }, // down-right
      { dx: 1, dy: -1 }, // up-right
      { dx: -1, dy: 1 }, // down-left
      { dx: -1, dy: -1 }, // up-left
    ];

    for (const { dx, dy } of directions) {
      let x = this.x + dx;
      let y = this.y + dy;

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const nextCell = board[y][x].name;

        if (this.isFigure(nextCell)) {
          if (
            (this.isWhite && nextCell[0] === 'b') ||
            (!this.isWhite && nextCell[0] === 'w')
          ) {
            moves.push({ x, y });
          }
          break;
        }

        moves.push({ x, y });
        x += dx;
        y += dy;
      }
    }

    return moves;
  }
}
