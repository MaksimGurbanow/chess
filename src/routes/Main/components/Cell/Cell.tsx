/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo } from 'react';
import cn from 'classnames';
import { CellProps } from '../../../../types/props';
import Figure from '../Figure/Figure';
import classes from './Cell.module.scss';
import { useGame } from '../../../../context/useGame';
import useCellHandlers from '../../../../hooks/useCellHandlers';

const Cell = ({
  figure,
  x,
  y,
  className,
  onClick,
  setTransformInfo,
}: CellProps) => {
  const { lastMoveInfo } = useGame();
  const {
    availableCell,
    isDragEntered,
    moveHandler,
    handleDragEnter,
    handleDragLeave,
  } = useCellHandlers({
    x,
    y,
    onClick,
    setTransformInfo,
  });

  return (
    <div
      className={cn(classes.cell, className, {
        [classes.dragentered]: isDragEntered && !figure.name,
        [classes.lastMove]:
          (lastMoveInfo?.from &&
            lastMoveInfo?.from.x === x &&
            lastMoveInfo?.from.y === y) ||
          (lastMoveInfo?.to &&
            lastMoveInfo?.to.x === x &&
            lastMoveInfo?.to.y === y),
      })}
      onClick={moveHandler}
      role="cell"
      aria-rowindex={y}
      aria-colindex={x}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        handleDragEnter(e);
      }}
      onDrop={(e) => {
        handleDragLeave(e);
        moveHandler();
      }}
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
