/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ChooseFigure } from '../../types/props';
import { Color, FigureName, FigureType } from '../../types/types';
import Figure from '../figure/Figure';
import './cell.scss';

const Cell = ({
  figure,
  showCoords,
  x,
  y,
  highlighted,
  onClick,
}: {
  figure: FigureType;
  showCoords: ChooseFigure;
  x: number;
  y: number;
  highlighted: boolean;
  onClick: (x: number, y: number) => void;
}) => {
  return (
    <div
      className="cell"
      onClick={() => {
        if (highlighted) {
          onClick(x, y);
        }
      }}
      role="cell"
    >
      {highlighted && <div className="cell-highlight" />}
      {figure && (
        <Figure
          figure={figure[1] as FigureName}
          color={figure[0] as Color}
          showCoords={showCoords}
          x={x}
          y={y}
        />
      )}
    </div>
  );
};

export default Cell;
