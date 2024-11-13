import { memo } from 'react';
import { RowProps } from '../../types/props';
import Cell from '../cell/Cell';
import classes from './Row.module.scss';

const Row = ({ positions, yCoord }: RowProps) => {
  return (
    <div className={classes.boardRow}>
      {positions.map((figure, i) => {
        const cellKey = `cell_${i}`;
        return (
          <Cell
            key={cellKey}
            figure={{
              name: figure.name,
              firstMove: !!figure.firstMove,
            }}
            x={i}
            y={yCoord}
            className={classes.cell}
          />
        );
      })}
    </div>
  );
};

const arePositionsEqual = (
  prev: Readonly<RowProps>,
  next: Readonly<RowProps>
) => {
  if (prev.yCoord !== next.yCoord) return false;

  if (prev.positions.length !== next.positions.length) return false;

  for (let i = 0; i < prev.positions.length; i += 1) {
    if (prev.positions[i].name !== next.positions[i].name) {
      return false;
    }
  }

  return true;
};

export default memo(Row, arePositionsEqual);
