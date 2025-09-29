import initialBoard from '../routes/Main/components/Board/data';
import { ChessBoard, FigureType } from '../types/types';

export const hashBoard = (board: ChessBoard): string => {
  return board
    .flat(3)
    .map((cell) => {
      if (!cell.name) return '_';
      let code = cell.name;
      if (cell.firstMove) code += 'f';
      if (cell.enPassant) code += 'e';
      return code;
    })
    .join('|');
};

export const getBoardFromHash = (hash: string): ChessBoard => {
  const rows = hash.split('|');
  const board: ChessBoard = initialBoard;

  rows.forEach((row, index) => {
    const x = Math.floor(index / 8);
    const y = index - x * 8;
    if (row === '_') board[x][y] = { name: '' };
    else {
      board[x][y] = {
        name: row.slice(0, 2) as FigureType,
        firstMove: row.includes('f'),
        enPassant: row.includes('e'),
      };
    }
  });
  return board;
};
