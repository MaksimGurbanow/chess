import { useState } from 'react';
import Row from '../row/Row';
import './board.css';
import { ChessBoard, Coordinates } from '../../types/types';
import { ChooseFigure } from '../../types/props';
import Bishop from '../../app/figures/Bishop';
import King from '../../app/figures/King';
import Knight from '../../app/figures/Knight';
import Pawn from '../../app/figures/Pawn';
import Queen from '../../app/figures/Queen';
import Rook from '../../app/figures/Rook';
import initialBoard from './data';

const Board = () => {
  const [boardState, setBoardState] = useState<ChessBoard>(initialBoard);
  const [availableCells, setAvailableCells] = useState<Coordinates[]>([]);
  const [chosenFigure, setChosenFigure] = useState<
    King | Queen | Pawn | Bishop | Rook | Knight | null
  >();
  const showCoords: ChooseFigure = (coords, figure) => {
    setAvailableCells(coords);
    setChosenFigure(figure);
  };

  const handleAvailableCellClick = (x: number, y: number) => {
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
