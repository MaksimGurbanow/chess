export interface ILoginData {
  email: string;
  password: string;
  username: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
  darkTheme: boolean;
  wins: number;
  loses: number;
  games: number;
  draws: number;
}

export type ChessRow = FigureType[] & { length: 8 };

export type ChessBoard = ChessRow[] & { length: 8 };

export type FigureType =
  | 'bk'
  | 'bq'
  | 'bp'
  | 'bb'
  | 'br'
  | 'bn'
  | ''
  | 'wk'
  | 'wq'
  | 'wp'
  | 'wb'
  | 'wr'
  | 'wn';

export type Color = 'w' | 'b';

export type FigureName = 'k' | 'n' | 'q' | 'b' | 'r' | 'p';

export enum FigurePath {
  k = 'king',
  q = 'queen',
  b = 'bishop',
  n = 'knight',
  p = 'pawn',
  r = 'rock',
}
