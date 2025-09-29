import { useCallback } from 'react';
import {
  ChessBoard,
  Color,
  FilterCellsProps,
  GameResult,
  Move,
} from '../types/types';

import createFigure from '../utils/createFigure';
import Figure from '../app/figures/Figure';

export interface GetNewBoardProps {
  move: Move;
  x: number;
  y: number;
  chosenFigure: Figure;
  oldBoard: ChessBoard;
}

export interface IsAttackedProps {
  board: ChessBoard;
  kingX: number;
  kingY: number;
  playerColor: Color;
}

const useBoardHelper = () => {
  // const { chosenFigure, boardState } = useGame();
  const getNewBoard = useCallback(
    ({
      move,
      x,
      y,
      chosenFigure,
      oldBoard,
    }: GetNewBoardProps): ChessBoard | null => {
      if (!chosenFigure || !move) return null;
      // Probably need to delete
      const {
        pieceToRemove,
        isEnpassant,
        isCastling,
        castlingRook,
        castlingKing,
      } = move;
      const newBoard = oldBoard.map((row, rowIndex) =>
        row.map((cell, cellIndex) => {
          if (rowIndex === y && cellIndex === x && !isCastling) {
            return {
              name: chosenFigure.name,
              firstMove: false,
              ...(chosenFigure.name[1] === 'p' && {
                enPassant: chosenFigure.firstMove,
              }),
            };
          }
          if (
            rowIndex === chosenFigure.y &&
            cellIndex === chosenFigure.x &&
            !isCastling
          )
            return { name: '' };
          return { ...cell, enPassant: false };
        })
      ) as ChessBoard;
      if (isEnpassant && pieceToRemove) {
        newBoard[pieceToRemove.y][pieceToRemove.x] = { name: '' };
      }
      if (isCastling && castlingRook && castlingKing) {
        const { from: fromRook, to: toRook } = castlingRook;
        const { from: fromKing, to: toKing } = castlingKing;
        const rookToReplace = newBoard[fromRook.y][fromRook.x];
        const kingToReplace = newBoard[fromKing.y][fromKing.x];
        newBoard[toRook.y][toRook.x] = {
          ...rookToReplace,
          firstMove: false,
        };
        newBoard[toKing.y][toKing.x] = {
          ...kingToReplace,
          firstMove: false,
        };
        newBoard[fromRook.y][fromRook.x] = { name: '' };
        newBoard[fromKing.y][fromKing.x] = { name: '' };
      }
      return newBoard;
    },
    []
  );

  const isAttacked = useCallback(
    ({ board, playerColor, kingX, kingY }: IsAttackedProps) => {
      let isKingAttacked = false;
      board.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (
            cell.name &&
            cell.name[0] !== playerColor &&
            cell.name[1] !== 'k'
          ) {
            const figureMoves = createFigure(
              {
                name: cell.name,
                firstMove: cell.firstMove || false,
              },
              cellIndex,
              rowIndex
            ).getMoves(board);
            if (
              figureMoves.some((move) => {
                // console.log(move);
                // console.log(kingX, kingY);
                return move.to.x === kingX && move.to.y === kingY;
              })
            ) {
              isKingAttacked = true;
            }
          }
        });
      });
      return isKingAttacked;
    },
    []
  );

  type MoveWithFigure = Move & { figure: Figure };
  const getAllMoves = useCallback(
    ({
      board,
      playerColor,
    }: {
      board: ChessBoard;
      playerColor: Color;
    }): MoveWithFigure[] => {
      const moves: MoveWithFigure[] = board.flatMap((row, rowIndex) =>
        row.flatMap((cell, cellIndex) => {
          if (!cell.name) return [];

          const [color] = cell.name;

          const isCurrentPlayer = color === playerColor;

          if (!isCurrentPlayer) return [];

          const figure = createFigure(
            { name: cell.name, firstMove: cell.firstMove || false },
            cellIndex,
            rowIndex
          );

          return figure.getMoves(board).map((move) => ({ ...move, figure }));
        })
      );

      return moves;
    },
    []
  );

  const defineGameResult = useCallback(
    ({ reason, result }: GameResult): string => {
      let outcome = '';

      switch (result) {
        case 'win':
          outcome = 'You won';
          break;
        case 'lose':
          outcome = 'You lost';
          break;
        case 'draw':
          outcome = 'It’s a draw';
          break;
        default:
          outcome = 'Game ended';
      }

      const player = result === 'lose' ? 'you' : 'your opponent';

      switch (reason) {
        case 'checkmate':
          return `${outcome} by checkmate.`;
        case 'surrendered':
          return `${outcome} — ${player} surrendered.`;
        case 'timeout':
          return `${outcome} due to timeout.`;
        case 'left-game':
          return `${outcome} — ${player} left the game.`;
        case 'no-moves-left':
          return `${outcome} — no legal moves left.`;
        case 'repetitive-moves':
          return `${outcome} — repetitive moves caused a draw.`;
        case 'both-accepted-draw':
          return `Draw — both players agreed to a draw.`;
        default:
          return outcome;
      }
    },
    []
  );

  const filterCells = useCallback(
    ({
      availableCells,
      boardState,
      kingPosition,
      currentMovePlayerColor,
    }: FilterCellsProps) => {
      return availableCells.filter((move) => {
        const newBoard = JSON.parse(JSON.stringify(boardState)) as ChessBoard;

        const piece = newBoard[move.from.y][move.from.x];
        const [, type] = piece.name;
        // used only during development
        // if (piece.name[0] === 'b') return true;

        newBoard[move.from.y][move.from.x] = { name: '' };
        newBoard[move.to.y][move.to.x] = { ...piece, firstMove: false };

        const isKingStillSafe = !isAttacked({
          board: newBoard,
          kingX:
            type === 'k'
              ? move.to.x
              : kingPosition[`${currentMovePlayerColor}k`].x,
          kingY:
            type === 'k'
              ? move.to.y
              : kingPosition[`${currentMovePlayerColor}k`].y,
          playerColor: currentMovePlayerColor,
        });

        return isKingStillSafe;
      });
    },
    [isAttacked]
  );

  return {
    getNewBoard,
    isAttacked,
    getAllMoves,
    defineGameResult,
    filterCells,
  };
};

export default useBoardHelper;
