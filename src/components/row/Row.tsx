import { memo } from 'react';
import { RowProps } from '../../types/props';
import Cell from '../cell/Cell';
import classes from './Row.module.scss';

const Row = ({
  positions,
  yCoord,
}: RowProps) => {
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

export default memo(Row);
