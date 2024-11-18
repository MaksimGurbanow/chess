import { ChessBoard, FigureType, Move } from '../../types/types';
import Figure from './Figure';

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

  // static isAttacked(
  //   board: ChessBoard,
  //   kingX: number,
  //   kingY: number,
  //   playersColor: Color
  // ): boolean {
  //   const opponentColor = playersColor === 'w' ? 'b' : 'w';

  //   for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
  //     for (
  //       let cellIndex = 0;
  //       cellIndex < board[rowIndex].length;
  //       cellIndex += 1
  //     ) {
  //       const cell = board[rowIndex][cellIndex];

  //       if (cell.name[0] === opponentColor) {
  //         const figure = createFigure(
  //           { name: cell.name, firstMove: cell.firstMove || false },
  //           cellIndex,
  //           rowIndex
  //         );

  //         if (
  //           !(figure instanceof King) &&
  //           figure
  //             .getMoves(board)
  //             .some((move) => move.x === kingX && move.y === kingY)
  //         ) {
  //           return true;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // }

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
            from: { x: this.x, y: this.y },
            to: { x: 6, y: this.y },
            x: this.x + 2,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 7, y }, to: { x: 5, y } },
            castlingKing: {
              from: { x: this.x, y: this.y },
              to: { x: 6, y: this.y },
            },
          },
          {
            from: { x: this.x, y: this.y },
            to: { x: 6, y: this.y },
            x: this.x + 3,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 7, y }, to: { x: 5, y } },
            castlingKing: {
              from: { x: this.x, y: this.y },
              to: { x: 6, y: this.y },
            },
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
            from: { x: this.x, y: this.y },
            to: { x: 2, y: this.y },
            x: this.x - 2,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 0, y }, to: { x: 3, y } },
            castlingKing: {
              from: { x: this.x, y: this.y },
              to: { x: 2, y: this.y },
            },
          },
          {
            from: { x: this.x, y: this.y },
            to: { x: 2, y: this.y },
            x: this.x - 4,
            y: this.y,
            isCastling: true,
            castlingRook: { from: { x: 0, y }, to: { x: 3, y } },
            castlingKing: {
              from: { x: this.x, y: this.y },
              to: { x: 2, y: this.y },
            },
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

      if (this.isWithinBounds({ x, y })) {
        const nextCell = board[y][x].name;

        if (this.isFigure(nextCell)) {
          if (
            (this.isWhite && nextCell[0] === 'b') ||
            (!this.isWhite && nextCell[0] === 'w')
          ) {
            moves.push({ x, y, from: { x: this.x, y: this.y }, to: { x, y } });
          }
        } else {
          moves.push({ x, y, from: { x: this.x, y: this.y }, to: { x, y } });
        }
      }
    });
    moves.push(...this.getCastlingMoves(board));
    return moves;
  }
}
