/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { CellProps } from '../../types/props';
import Figure from '../figure/Figure';
import classes from './Cell.module.scss';
import { useGame } from '../../context/useGame';
import { ChessBoard } from '../../types/types';

const Cell = ({ figure, x, y, className }: CellProps) => {
  const {
    availableCells,
    chosenFigure,
    boardState,
    setBoardState,
    setAvailableCells,
    setChosenFigure,
    setPlayersMove,
  } = useGame();
  const availableCell = useMemo(
    () => availableCells.find((cell) => cell.x === x && cell.y === y),
    [availableCells, x, y]
  );
  const clickHandler = useCallback(() => {
    if (chosenFigure) {
      if (availableCell) {
        const newBoard = boardState.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x) {
              return {
                name: chosenFigure.name,
                firstMove: false,
                enPassant:
                  chosenFigure.name[1] === 'p' && chosenFigure.firstMove,
              };
            }
            if (rowIndex === chosenFigure.y && cellIndex === chosenFigure.x)
              return { name: '' };
            return { ...cell, enPassant: false };
          })
        );
        const { pieceToRemove, isEnpassant, isCastling, castlingRook } =
          availableCell;
        if (isEnpassant && pieceToRemove) {
          newBoard[pieceToRemove.y][pieceToRemove.x] = { name: '' };
        }
        if (isCastling && castlingRook) {
          const { from, to } = castlingRook;
          const temp = newBoard[from.y][from.x];
          newBoard[from.y][from.x] = { name: '' };
          newBoard[to.y][to.x] = { ...temp, firstMove: false };
        }
        setBoardState(newBoard as ChessBoard);
        setPlayersMove(false);
      }
      setChosenFigure(null);
      setAvailableCells([]);
    }
  }, [
    availableCell,
    boardState,
    chosenFigure,
    setAvailableCells,
    setBoardState,
    setChosenFigure,
    setPlayersMove,
    x,
    y,
  ]);
  return (
    <div
      className={cn(classes.cell, className)}
      onClick={clickHandler}
      role="cell"
    >
      {availableCell && <div className={classes.cellHighlight} />}
      {figure.name && <Figure figure={figure} x={x} y={y} />}
    </div>
  );
};

export default memo(Cell, (prev, next) => {
  return (
    prev.figure.name === next.figure.name &&
    prev.figure.firstMove === next.figure.firstMove &&
    prev.x === next.x &&
    prev.y === next.y &&
    prev.className === next.className
  );
});
