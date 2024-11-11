import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { ChessBoard, Color, Coordinates, GameState } from '../types/types';
import initialBoard from '../components/board/data';
import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';

type ChessPiece = King | Queen | Pawn | Bishop | Rook | Knight;

export interface GameStateContext extends GameState {
  setPlayerColor: (v: Color) => void;
  setIsKingAttacked: (v: boolean) => void;
  setBoardState: (state: ChessBoard) => void;
  availableCells: Coordinates[];
  setAvailableCells: (v: Coordinates[]) => void;
  chosenFigure: ChessPiece | null;
  setChosenFigure: (v: ChessPiece | null) => void;
}

const throwError = (name: string) => {
  throw new Error(`${name} must be used within the GameProvider`);
};

export const gameContext = createContext<GameStateContext>({
  playerColor: 'w',
  boardState: initialBoard,
  isKingAttacked: false,
  setPlayerColor: () => throwError("setPlayerColor"),
  setIsKingAttacked: () => throwError("setIsKingAttacked"),
  setBoardState: () => throwError("setBoardState"),
  availableCells: [],
  setAvailableCells: () => throwError("setAvailableCells"),
  chosenFigure: null,
  setChosenFigure: () => throwError("setChosenFigure"),
});

export const useGame = () => useContext(gameContext);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [boardState, setBoardState] = useState<ChessBoard>(initialBoard);
  const [isKingAttacked, setIsKingAttacked] = useState(false);
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const [availableCells, setAvailableCells] = useState<Coordinates[]>([]);
  const [chosenFigure, setChosenFigure] = useState<ChessPiece | null>(null);

  const value = useMemo(
    () => ({
      boardState,
      setBoardState,
      isKingAttacked,
      setIsKingAttacked,
      playerColor,
      setPlayerColor,
      availableCells,
      setAvailableCells,
      chosenFigure,
      setChosenFigure,
    }),
    [boardState, isKingAttacked, playerColor, availableCells, chosenFigure]
  );

  return (
    <gameContext.Provider value={value}>
      {children}
    </gameContext.Provider>
  );
};
