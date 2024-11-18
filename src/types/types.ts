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

export type ChessRow = {
  name: FigureType;
  firstMove?: boolean;
  enPassant?: boolean; // only for pawns
}[] & {
  length: 8;
};

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

export type Coordinates = { x: number; y: number };

export type Move = Coordinates & {
  from: Coordinates;
  to: Coordinates;
  isEnpassant?: boolean;
  isCastling?: boolean;
  castlingRook?: { from: Coordinates; to: Coordinates };
  castlingKing?: { from: Coordinates; to: Coordinates };
  pieceToRemove?: Coordinates;
};

export interface IFigure {
  firstMove: boolean;
  x: number;
  y: number;
  isTransformable: boolean;
  value: number;
}

export interface FigureProps {
  x: number;
  y: number;
  value: number;
  isWhite: boolean;
}

export interface GameState {
  playerColor: Color;
  boardState: ChessBoard;
  isKingAttacked: boolean;
  playersMove: boolean;
  setPlayersMove: (v: boolean) => void;
}
