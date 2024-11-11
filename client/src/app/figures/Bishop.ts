/* eslint-disable no-continue */
import { ChessBoard, Coordinates, FigureType } from '../../types/types';
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

  public getMoves(board: ChessBoard): Coordinates[] {
    const moves = [];
    for (let x = this.x + 1; x < 8; x += 1) {
      const difference = Math.abs(x - this.x);
      if (this.y + difference >= 8) continue;
      const nextUpCell = board[this.y + difference][x].name;
      if (this.isFigure(nextUpCell)) {
        if (
          (this.isWhite && nextUpCell[0] === 'b') ||
          (!this.isWhite && nextUpCell[0] === 'w')
        ) {
          moves.push({ x, y: this.y + difference });
        }
        break;
      }
      moves.push({ x, y: this.y + difference });
    }
    for (let x = this.x - 1; x >= 0; x -= 1) {
      const difference = Math.abs(x - this.x);
      if (this.y + difference >= 8) continue;
      const nextUpCell = board[this.y + difference][x].name;
      if (this.isFigure(nextUpCell)) {
        if (
          (this.isWhite && nextUpCell[0] === 'b') ||
          (!this.isWhite && nextUpCell[0] === 'w')
        ) {
          moves.push({ x, y: this.y + difference });
        }
        break;
      }
      moves.push({ x, y: this.y + difference });
    }
    for (let x = this.x + 1; x < 8; x += 1) {
      const difference = Math.abs(x - this.x);
      if (this.y - difference < 0) continue;
      const nextDownCell = board[this.y - difference][x].name;
      if (this.isFigure(nextDownCell)) {
        if (
          (this.isWhite && nextDownCell[0] === 'b') ||
          (!this.isWhite && nextDownCell[0] === 'w')
        ) {
          moves.push({ x, y: this.y - difference });
        }
        break;
      }
      moves.push({ x, y: this.y - difference });
    }
    for (let x = this.x - 1; x >= 0; x -= 1) {
      const difference = Math.abs(x - this.x);
      if (this.y - difference < 0) continue;
      const nextDownCell = board[this.y - difference][x].name;
      if (this.isFigure(nextDownCell)) {
        if (
          (this.isWhite && nextDownCell[0] === 'b') ||
          (!this.isWhite && nextDownCell[0] === 'w')
        ) {
          moves.push({ x, y: this.y - difference });
        }
        break;
      }
      moves.push({ x, y: this.y - difference });
    }

    return moves.filter(
      (move) => move.x >= 0 && move.y < 8 && move.y >= 0 && move.x < 8
    );
  }
}
