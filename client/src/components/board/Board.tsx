import { useState } from 'react';
import Row from '../row/Row';
import './board.css';
import { ChessBoard } from '../../types/types';

const Board = () => {
  const [figuresState, setFiguresState] = useState<ChessBoard>([
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ]);
  return (
    <div className="board">
      {figuresState.map((row, i) => {
        const rowKey = `row_${i}`;
        return <Row key={rowKey} positions={row} />;
      })}
    </div>
  );
};

export default Board;
