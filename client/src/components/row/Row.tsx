import { ChooseFigure } from '../../types/props';
import { ChessRow, Coordinates } from '../../types/types';
import Cell from '../cell/Cell';
import './row.scss';

const Row = ({
  positions,
  yCoord,
  showCoords,
  availableCells,
  clickCell,
}: {
  positions: ChessRow;
  yCoord: number;
  showCoords: ChooseFigure;
  availableCells: Coordinates[];
  clickCell: (x: number, y: number) => void;
}) => {
  return (
    <div className="board-row">
      {positions.map((figure, i) => {
        const cellKey = `cell_${i}`;
        return (
          <Cell
            key={cellKey}
            figure={figure}
            showCoords={showCoords}
            onClick={clickCell}
            x={i}
            y={yCoord}
            highlighted={
              !!availableCells.find(
                (availableCell) =>
                  availableCell.x === i && availableCell.y === yCoord
              )
            }
          />
        );
      })}
    </div>
  );
};

export default Row;
