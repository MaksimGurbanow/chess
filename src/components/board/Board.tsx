import Row from '../row/Row';
import './board.css';
import { useGame } from '../../context/useGame';

const Board = () => {
  const { boardState } = useGame();

  return (
    <div className="board">
      {boardState.map((row, i) => {
        const rowKey = `row_${i}`;
        return <Row key={rowKey} positions={row} yCoord={i} />;
      })}
    </div>
  );
};

export default Board;