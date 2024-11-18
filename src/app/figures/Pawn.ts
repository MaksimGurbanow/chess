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

  // possible bugs
  private moveIfIsValid(board: ChessBoard) {
    const moves: Move[] = [];
    const { x } = this;
    const y = this.isWhite ? this.y - 1 : this.y + 1;
    const twoY = this.isWhite ? this.y - 2 : this.y + 2;
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (!this.isFigure(board[y][x].name)) {
        moves.push({
          x,
          y,
          from: { x: this.x, y: this.y },
          to: { x, y },
        });
        if (this.firstMove && !this.isFigure(board[twoY][x].name)) {
          moves.push({
            x: this.x,
            y: twoY,
            to: { x, y: twoY },
            from: { x: this.x, y: this.y },
          });
        }
      }
    }

    return moves;
  }

  // possible bugs
  private enPassantMoves(board: ChessBoard) {
    const moves: Move[] = [];
    const sides = [this.x + 1, this.x - 1];
    const y = this.isWhite ? this.y - 1 : this.y + 1;
    const oppositePawn = this.isWhite ? 'bp' : 'wp';
    sides.forEach((x) => {
      if (this.isWithinBounds({ x, y })) {
        const enPassantPiece = board[this.y][x];
        if (enPassantPiece.name === oppositePawn && enPassantPiece.enPassant) {
          moves.push({
            x,
            y,
            isEnpassant: true,
            pieceToRemove: { x, y: this.y },
            to: { x, y },
            from: { x: this.x, y: this.y },
          });
        }
      }
    });

    return moves;
  }

  private attackingMoves(board: ChessBoard) {
    const moves: Move[] = [];
    const directions = [this.x + 1, this.x - 1];
    const y = this.isWhite ? this.y - 1 : this.y + 1;
    const oppositePieceColor = this.isWhite ? 'b' : 'w';
    directions.forEach((x) => {
      if (this.isWithinBounds({ x, y })) {
        const rightPiece = board[y][x].name;
        if (this.isFigure(rightPiece) && rightPiece[0] === oppositePieceColor) {
          moves.push({
            x,
            y,
            from: { x: this.x, y: this.y },
            to: { x, y },
          });
        }
      }
    });

    return moves;
  }

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    moves.push(
      ...this.moveIfIsValid(board),
      ...this.attackingMoves(board),
      ...this.enPassantMoves(board)
    );
    return this.filterMoves(moves);
  }
}
