import { ChessBoard, Color, FigureType, Move } from '../../types/types';
import Figure from './Figure';

export default class Knight extends Figure {
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
    const oppositeColor: Color = this.isWhite ? 'b' : 'w';
    return this.filterMoves(
      [
        { dx: 2, dy: 1 },
        { dx: 2, dy: -1 },
        { dx: 1, dy: 2 },
        { dx: 1, dy: -2 },
        { dx: -2, dy: -1 },
        { dx: -2, dy: 1 },
        {
          dx: -1,
          dy: 2,
        },
        {
          dx: -1,
          dy: -2,
        },
      ].map(({ dx, dy }) => ({
        x: this.x + dx,
        y: this.y + dy,
        from: { x: this.x, y: this.y },
        to: { x: this.x + dx, y: this.y + dy },
      }))
    ).filter(
      ({ x, y }) =>
        board[y][x].name[0] === oppositeColor ||
        !this.isFigure(board[y][x].name)
    );
  }
}
