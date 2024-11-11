import { ChessBoard, Coordinates, FigureType } from '../../types/types';
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

  public getMoves(board: ChessBoard): Coordinates[] {
    const moves: Coordinates[] = [];
    const directions = [
      { dx: 1, dy: 0 },  // Right
      { dx: -1, dy: 0 }, // Left
      { dx: 0, dy: 1 },  // Down
      { dx: 0, dy: -1 }  // Up
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
  
    return this.filter(moves);
  }
  
}
