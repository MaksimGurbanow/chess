/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo, useCallback, useMemo } from 'react';
import { CellProps, ChooseFigure } from '../../types/props';
import Figure from '../figure/Figure';
import classes from './Cell.module.scss';
import cn from 'classnames';
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
  } = useGame();
  const highlighted = useMemo(
    () =>
      !!availableCells.find(
        (availableCell) => availableCell.x === x && availableCell.y === y
      ),
    [availableCells, x, y]
  );
  const handleAvailableCellClick = useCallback(
    () => {
      if (chosenFigure) {
        const newBoard = boardState.map((row, rowIndex) =>
          row.map((cell, cellIndex) => {
            if (rowIndex === y && cellIndex === x)
              return { name: chosenFigure.name, firstMove: false };
            if (rowIndex === chosenFigure.y && cellIndex === chosenFigure.x)
              return { name: '' };
            return cell;
          })
        );
        setBoardState(newBoard as ChessBoard);
        setAvailableCells([]);
        setChosenFigure(null);
      }
    },
    [chosenFigure]
  );
  const clickHandler = useCallback(() => {
    if (highlighted) {
      handleAvailableCellClick();
    } else {
      if (chosenFigure) {
        setAvailableCells([]);
        setChosenFigure(null);
      }
    }
  }, [highlighted, chosenFigure]);
  return (
    <div
      className={cn(classes.cell, className)}
      onClick={clickHandler}
      role="cell"
    >
      {highlighted && <div className={classes.cellHighlight} />}
      {figure.name && <Figure figure={figure} x={x} y={y} />}
    </div>
  );
};

export default memo(Cell, (prev, next) => {
  return (
    prev.figure.name === next.figure.name &&
    prev.figure.firstMove === prev.figure.firstMove &&
    prev.x === next.x &&
    prev.y === next.y
  );
});
