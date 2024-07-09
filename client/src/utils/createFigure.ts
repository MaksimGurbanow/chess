import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';
import { FigureType } from '../types/types';

export default (
  figure: { name: FigureType; firstMove: boolean },
  x: number,
  y: number
) => {
  const { name, firstMove } = figure;
  switch (name[1]) {
    case 'k':
      return new King(x, y, name[0] === 'w', name, firstMove);
    case 'q':
      return new Queen(x, y, name[0] === 'w', name, firstMove);
    case 'p':
      return new Pawn(x, y, name[0] === 'w', name, firstMove);
    case 'b':
      return new Bishop(x, y, name[0] === 'w', name, firstMove);
    case 'r':
      return new Rook(x, y, name[0] === 'w', name, firstMove);
    case 'n':
      return new Knight(x, y, name[0] === 'w', name, firstMove);
    default:
      throw new Error(`Incorrect figure type: ${name[0] + figure}`);
  }
};
