import Cell from '../cell/Cell';
import './board.css';

const Board = () => {
  return (
    <div className="board">
      {Array.from({ length: 64 }).map((_k, i) => {
        const cellKey = `key-${i}`;
        return <Cell key={cellKey} />;
      })}
    </div>
  );
};

export default Board;
