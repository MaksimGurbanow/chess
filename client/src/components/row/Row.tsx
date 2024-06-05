import { ChessRow } from '../../types/types';
import Cell from '../cell/Cell';
import './row.scss';

const Row = ({ key, positions }: { key: string | number; positions: ChessRow }) => {
  return (
    <div className="board-row">
      {positions.map((figure, i) => {
        const cellKey = `${key}_${i}`;
        return <Cell key={cellKey} figure={figure} />;
      })}
    </div>
  );
};

export default Row;
