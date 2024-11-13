import { ChessBoard, FigureType, Move } from '../../types/types';
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

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
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
        const enPassantRight = board[this.y][this.x + 1];
        if (enPassantRight.name === 'bp' && enPassantRight.enPassant) {
          moves.push({
            x: this.x + 1,
            y: this.y - 1,
            isEnpassant: true,
            pieceToRemove: { x: this.x + 1, y: this.y },
          });
        }
      }
      if (this.x - 1 >= 0) {
        const leftPiece = board[this.y - 1][this.x - 1].name;
        if (this.isFigure(leftPiece) && leftPiece[0] === 'b') {
          moves.push({ x: this.x - 1, y: this.y - 1 });
        }
        const enPassantLeft = board[this.y][this.x - 1];
        if (enPassantLeft.name === 'bp' && enPassantLeft.enPassant) {
          moves.push({
            x: this.x - 1,
            y: this.y - 1,
            isEnpassant: true,
            pieceToRemove: { x: this.x - 1, y: this.y },
          });
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
        const enPassanRight = board[this.y][this.x + 1];
        if (enPassanRight.name === 'wp' && enPassanRight.enPassant) {
          moves.push({
            x: this.x + 1,
            y: this.y + 1,
            isEnpassant: true,
            pieceToRemove: { x: this.x + 1, y: this.y },
          });
        }
      }
      if (this.x - 1 >= 0) {
        const leftPiece = board[this.y + 1][this.x - 1].name;
        if (this.isFigure(leftPiece) && leftPiece[0] === 'w') {
          moves.push({ x: this.x - 1, y: this.y + 1 });
        }
        const enPassanLeft = board[this.y][this.x - 1];
        if (enPassanLeft.name === 'wp' && enPassanLeft.enPassant) {
          moves.push({
            x: this.x - 1,
            y: this.y + 1,
            isEnpassant: true,
            pieceToRemove: { x: this.x - 1, y: this.y },
          });
        }
      }
    }
    return this.filter(moves);
  }
}
