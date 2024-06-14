import { useState } from 'react';
import Row from '../row/Row';
import './board.css';
import { ChessBoard, Coordinates, FigureType } from '../../types/types';
import { ChooseFigure } from '../../types/props';

const Board = () => {
  const [boardState, setBoardState] = useState<ChessBoard>([
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr'],
  ]);
  const [availableCells, setAvailableCells] = useState<Coordinates[]>([]);
  const [chosenFigure, setChosenFigure] = useState<{
    elem: FigureType;
    ownCoordinates: Coordinates;
  } | null>();
  const showCoords: ChooseFigure = (coords, { elem, ownCoordinates }) => {
    setAvailableCells(coords);
    setChosenFigure({ elem, ownCoordinates });
  };

  const handleAvailableCellClick = (x: number, y: number) => {
    if (chosenFigure) {
      const { elem, ownCoordinates } = chosenFigure;
      const newBoard = [...boardState];
      newBoard[y][x] = elem;
      newBoard[ownCoordinates.y][ownCoordinates.x] = '';
      setBoardState([...newBoard] as ChessBoard);
      setAvailableCells([]);
      setChosenFigure(null);
    }
  };
  return (
    <div className="board">
      {boardState.map((row, i) => {
        const rowKey = `row_${i}`;
        return (
          <Row
            key={rowKey}
            positions={row}
            yCoord={i}
            showCoords={showCoords}
            availableCells={availableCells}
            clickCell={handleAvailableCellClick}
          />
        );
      })}
    </div>
  );
};

export default Board;
