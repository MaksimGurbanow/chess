import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';
import { Color, FigureName } from '../types/types';

export default (figure: FigureName, color: Color, x: number, y: number) => {
  switch (figure) {
    case 'k':
      return new King(x, y, color === 'w');
    case 'q':
      return new Queen(x, y, color === 'w');
    case 'p':
      return new Pawn(x, y, color === 'w');
    case 'b':
      return new Bishop(x, y, color === 'w');
    case 'r':
      return new Rook(x, y, color === 'w');
    case 'n':
      return new Knight(x, y, color === 'w');
    default:
      throw new Error("Figure type is not defined or it doesn' appropriate");
  }
};
