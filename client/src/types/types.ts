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

export type ChessRow = Figure[] & { length: 8 };

export type ChessBoard = ChessRow[] & { length: 8 };

export type Figure = 'bk' | 'bq' | 'bp' | 'bb' | 'br' | 'bn' | '' | 'wk' | 'wq' | 'wp' | 'wb' | 'wr' | 'wn';
