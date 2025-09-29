import { useRef, useMemo, useCallback } from 'react';
import cn from 'classnames';
import { useGame } from '../../../../context/useGame';
import createFigure from '../../../../utils/createFigure';
import DefinedFigure from '../../../../utils/DefinedFigure';
import { FigureProps } from '../../../../types/props';
import classes from './Figure.module.scss';

const Figure = ({ figure, x, y, figureStyle = {} }: FigureProps) => {
  const figureRef = useRef<HTMLDivElement>(null);
  const {
    setAvailableCells,
    setChosenFigure,
    boardState,
    playerColor,
    playersMove,
    isOnline,
    chosenFigure,
    filterCells,
    currentBoardIndex,
    boardHistory,
  } = useGame();

  const figureState = useMemo(() => createFigure(figure, x, y), [figure, x, y]);
  const isAvailable = useMemo(() => {
    return (
      (isOnline && figure.name[0] === playerColor && playersMove) ||
      (!isOnline &&
        ((figure.name[0] === playerColor && playersMove) ||
          (figure.name[0] !== playerColor && !playersMove)))
    );
  }, [figure.name, isOnline, playerColor, playersMove]);
  const moves = useMemo(
    () =>
      filterCells({
        availableCells: figureState.getMoves(boardState),
        boardState,
      }),
    [filterCells, figureState, boardState]
  );

  const showCoords = useCallback(() => {
    if (isAvailable && currentBoardIndex === boardHistory.length - 1) {
      setAvailableCells(moves);
      setChosenFigure(figureState);
    }
  }, [
    isAvailable,
    currentBoardIndex,
    boardHistory.length,
    setAvailableCells,
    moves,
    setChosenFigure,
    figureState,
  ]);

  return (
    <div
      role="button"
      aria-label="Draggable chess figure"
      aria-pressed={chosenFigure?.x === x && chosenFigure.y === y}
      tabIndex={isAvailable && moves.length > 0 ? 0 : -1}
      onClick={showCoords}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') showCoords();
      }}
      data-x={x}
      data-y={y}
      className={cn(
        classes.figure,
        `${figure.name[0]}-${figure.name[1].toLowerCase()}`,
        {
          [classes.reversed]: playerColor === 'b',
          [classes.chosen]: chosenFigure?.x === x && chosenFigure.y === y,
          [classes.available]: isAvailable,
        }
      )}
    >
      <div
        ref={figureRef}
        style={figureStyle}
        draggable={!!(figure.name && isAvailable && moves.length !== 0)}
        onDragStart={() => {
          showCoords();
          figureRef.current?.classList.add(classes.dragging);
        }}
        className={cn(classes.figureDraggableBox)}
        onDrag={() => {
          figureRef.current?.classList.add(classes.dragging);
        }}
        onDragEnd={() => {
          figureRef.current?.classList.remove(classes.dragging);
        }}
      >
        <DefinedFigure
          figure={figure.name[1]}
          color={figure.name[0]}
          style={figureStyle}
        />
      </div>
    </div>
  );
};
export default Figure;
