import { ChessBoard, Color, FigureType, Move } from '../../types/types';
import Bishop from './Bishop';
import Figure from './Figure';
import Knight from './Knight';
import Pawn from './Pawn';
import Queen from './Queen';
import Rook from './Rook';

export default class King extends Figure {
  constructor(
    x: number,
    y: number,
    isWhite: boolean,
    name: FigureType,
    firstMove: boolean = true
  ) {
    super({
      value: Infinity,
      x,
      y,
      isTransformable: false,
      isWhite,
      name,
      firstMove,
    });
  }

  static isAttacked(
    board: ChessBoard,
    kingX: number,
    kingY: number,
    playersColor: Color
  ): boolean {
    const opponentColor = playersColor === 'w' ? 'b' : 'w';

    for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
      for (
        let cellIndex = 0;
        cellIndex < board[rowIndex].length;
        cellIndex += 1
      ) {
        const cell = board[rowIndex][cellIndex];

        if (cell.name[0] === opponentColor) {
          const figure = createFigure(
            { name: cell.name, firstMove: cell.firstMove || false },
            cellIndex,
            rowIndex
          );

          if (
            figure
              .getMoves(board)
              .some((move) => move.x === kingX && move.y === kingY)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public getCastlingMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    if (this.firstMove) {
      const rightEdge = board[this.y][this.x + 3];
      let isWhiteRock = rightEdge.name === 'wr';
      let isBlackRock = rightEdge.name === 'br';
      let y = isWhiteRock ? 7 : 0;
      if (
        !this.isFigure(board[this.y][this.x + 1].name) &&
        !this.isFigure(board[this.y][this.x + 2].name) &&
        ((isWhiteRock && this.isWhite) || (isBlackRock && !this.isWhite)) &&
        rightEdge.firstMove
      ) {
        moves.push(
          {
            x: this.x + 2,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 7, y }, to: { x: 5, y } },
          },
          {
            x: this.x + 3,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 7, y }, to: { x: 5, y } },
          }
        );
      }
      const leftEdge = board[this.y][this.x - 4];
      isWhiteRock = leftEdge.name === 'wr';
      isBlackRock = leftEdge.name === 'br';
      y = isWhiteRock ? 7 : 0;
      if (
        !this.isFigure(board[this.y][this.x - 1].name) &&
        !this.isFigure(board[this.y][this.x - 2].name) &&
        !this.isFigure(board[this.y][this.x - 3].name) &&
        ((isWhiteRock && this.isWhite) || (isBlackRock && !this.isWhite)) &&
        leftEdge.firstMove
      ) {
        moves.push(
          {
            x: this.x - 2,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 0, y }, to: { x: 3, y } },
          },
          {
            x: this.x - 4,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 0, y }, to: { x: 3, y } },
          }
        );
      }
    }
    return moves;
  }

  public getMoves(board: ChessBoard): Move[] {
    const moves: Move[] = [];
    const directions = [
      {
        dx: 0,
        dy: -1,
      },
      {
        dx: 1,
        dy: -1,
      },
      {
        dx: -1,
        dy: -1,
      },
      {
        dx: -1,
        dy: 0,
      },
      {
        dx: 1,
        dy: 0,
      },
      {
        dx: 0,
        dy: 1,
      },
      {
        dx: 1,
        dy: 1,
      },
      {
        dx: -1,
        dy: 1,
      },
    ];

    directions.forEach(({ dx, dy }) => {
      const x = this.x + dx;
      const y = this.y + dy;

      if (!(x < 0 || y < 0 || x >= 8 || y >= 8)) {
        const nextCell = board[y][x].name;

        if (this.isFigure(nextCell)) {
          if (
            (this.isWhite && nextCell[0] === 'b') ||
            (!this.isWhite && nextCell[0] === 'w')
          ) {
            moves.push({ x, y });
          }
        } else {
          moves.push({ x, y });
        }
      }
    });
    moves.push(...this.getCastlingMoves(board));
    return moves;
  }
}

const createFigure = (
  figure: { name: FigureType; firstMove: boolean },
  x: number,
  y: number
) => {
  const { name, firstMove } = figure;
  const isWhite = name[0] === 'w';
  switch (name[1]) {
    case 'k':
      return new King(x, y, isWhite, name, firstMove);
    case 'q':
      return new Queen(x, y, isWhite, name, firstMove);
    case 'p':
      return new Pawn(x, y, isWhite, name, firstMove);
    case 'b':
      return new Bishop(x, y, isWhite, name, firstMove);
    case 'r':
      return new Rook(x, y, isWhite, name, firstMove);
    case 'n':
      return new Knight(x, y, isWhite, name, firstMove);
    default:
      throw new Error(`Incorrect figure type: ${name[0] + figure}`);
  }
};
