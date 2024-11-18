import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ChessBoard,
  Color,
  Coordinates,
  GameState,
  Move,
} from '../types/types';
import initialBoard from '../routes/Main/components/Board/data';
import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';
import createFigure from '../utils/createFigure';

type ChessPiece = King | Queen | Pawn | Bishop | Rook | Knight;

export interface GameStateContext extends GameState {
  setPlayerColor: (v: Color) => void;
  setIsKingAttacked: (v: boolean) => void;
  setBoardState: (state: ChessBoard) => void;
  availableCells: Move[];
  setAvailableCells: (v: Move[]) => void;
  chosenFigure: ChessPiece | null;
  setChosenFigure: (v: ChessPiece | null) => void;
  kingPosition: Coordinates;
}

const throwError = (name: string) => {
  throw new Error(`${name} must be used within the GameProvider`);
};

export const gameContext = createContext<GameStateContext>({
  playerColor: 'w',
  boardState: initialBoard,
  isKingAttacked: false,
  setPlayerColor: () => throwError('setPlayerColor'),
  setIsKingAttacked: () => throwError('setIsKingAttacked'),
  setBoardState: () => throwError('setBoardState'),
  availableCells: [],
  setAvailableCells: () => throwError('setAvailableCells'),
  chosenFigure: null,
  setChosenFigure: () => throwError('setChosenFigure'),
  kingPosition: { x: 0, y: 0 },
  playersMove: true,
  setPlayersMove: () => throwError('playersMove'),
});

export const useGame = () => useContext(gameContext);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [boardState, setBoardState] = useState<ChessBoard>(initialBoard);
  const [isKingAttacked, setIsKingAttacked] = useState(false);
  const [playerColor, setPlayerColor] = useState<Color>('w');
  const [availableCells, setAvailableCells] = useState<Move[]>([]);
  const [chosenFigure, setChosenFigure] = useState<ChessPiece | null>(null);
  const [kingPosition, setKingPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const [playersMove, setPlayersMove] = useState(true);

  const isAttacked = useCallback(
    (board: ChessBoard, kingX: number, kingY: number) => {
      const opponentColor = playerColor === 'w' ? 'b' : 'w';

      for (let rowIndex = 0; rowIndex < board.length; rowIndex += 1) {
        for (
          let cellIndex = 0;
          cellIndex < board[rowIndex].length;
          cellIndex += 1
        ) {
          if (
            rowIndex >= 0 &&
            rowIndex < 8 &&
            cellIndex >= 0 &&
            cellIndex < 8
          ) {
            const cell = board[rowIndex][cellIndex];
            if (cell.name[0] === opponentColor) {
              const figure = createFigure(
                { name: cell.name, firstMove: cell.firstMove || false },
                cellIndex,
                rowIndex
              );

              if (
                figure
                  .getMoves(board)
                  .some((move) => move.x === kingX && move.y === kingY)
              ) {
                return true;
              }
            }
          }
        }
      }
      return false;
    },
    [playerColor]
  );

  const filteredCells = useMemo(() => {
    return availableCells.filter((move) => {
      const newBoard = JSON.parse(JSON.stringify(boardState)) as ChessBoard;

      const piece = newBoard[move.from.y][move.from.x];
      // used only during development
      if (piece.name[0] === 'b') return true;

      newBoard[move.from.y][move.from.x] = { name: '' };
      newBoard[move.to.y][move.to.x] = { ...piece, firstMove: false };

      console.log(newBoard, move.to);

      const isKingStillSafe = !isAttacked(
        newBoard,
        piece.name[1] === 'k' ? move.to.x : kingPosition.x,
        piece.name[1] === 'k' ? move.to.y : kingPosition.y
      );

      return isKingStillSafe;
    });
  }, [availableCells, boardState, isAttacked, kingPosition.x, kingPosition.y]);

  useEffect(() => {
    setIsKingAttacked(isAttacked(boardState, kingPosition.x, kingPosition.y));
  }, [boardState, isAttacked, kingPosition.x, kingPosition.y]);

  useEffect(() => {
    const kingName = playerColor === 'w' ? 'wk' : 'bk';

    boardState.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell.name === kingName) {
          setKingPosition({ x, y });
        }
      });
    });
  }, [boardState, playerColor]);

  const value = useMemo(
    () => ({
      boardState,
      setBoardState,
      isKingAttacked,
      setIsKingAttacked,
      playerColor,
      setPlayerColor,
      availableCells: filteredCells,
      setAvailableCells,
      chosenFigure,
      setChosenFigure,
      kingPosition,
      playersMove,
      setPlayersMove,
    }),
    [
      boardState,
      isKingAttacked,
      playerColor,
      filteredCells,
      chosenFigure,
      kingPosition,
      playersMove,
    ]
  );

  return <gameContext.Provider value={value}>{children}</gameContext.Provider>;
};
