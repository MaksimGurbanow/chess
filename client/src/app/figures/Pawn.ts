import { ChessBoard, Coordinates, FigureType } from '../../types/types';
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

  public getMoves(board: ChessBoard): Coordinates[] {
    const moves = [];
    if (this.isWhite) {
      if (!this.isFigure(board[this.y - 1][this.x].name)) {
        // adds the move if figure is white and there is no pieces on the possible move
        moves.push({ x: this.x, y: this.y - 1 });
        if (this.firstMove && !this.isFigure(board[this.y - 2][this.x].name)) {
          moves.push({ x: this.x, y: this.y - 2 });
        }
      }
      // adds white pawn's attacking moves
      if (this.x + 1 < 8) {
        const rightPiece = board[this.y - 1][this.x + 1].name;
        if (this.isFigure(rightPiece) && rightPiece[0] === 'b') {
          moves.push({ x: this.x + 1, y: this.y - 1 });
        }
      }
      if (this.x - 1 >= 0) {
        const leftPiece = board[this.y - 1][this.x - 1].name;
        if (this.isFigure(leftPiece) && leftPiece[0] === 'b') {
          moves.push({ x: this.x - 1, y: this.y - 1 });
        }
      }
    } else {
      if (!this.isFigure(board[this.y + 1][this.x].name)) {
        // adds the move if piece is black and here is no pieces on the possible move
        moves.push({ x: this.x, y: this.y + 1 });
        if (this.firstMove && !this.isFigure(board[this.y + 2][this.x].name)) {
          moves.push({ x: this.x, y: this.y + 2 });
        }
      }
      // adds black pawn's attacking moves
      if (this.x + 1 < 8) {
        const rightPiece = board[this.y + 1][this.x + 1].name;
        if (this.isFigure(rightPiece) && rightPiece[0] === 'w') {
          moves.push({ x: this.x + 1, y: this.y + 1 });
        }
      }
      if (this.x - 1 >= 0) {
        const leftPiece = board[this.y + 1][this.x - 1].name;
        if (this.isFigure(leftPiece) && leftPiece[0] === 'w') {
          moves.push({ x: this.x - 1, y: this.y + 1 });
        }
      }
    }
    return this.filter(moves);
  }
}
