/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { memo } from 'react';
import { ChooseFigure } from '../../types/props';
import { FigureType } from '../../types/types';
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
  figure: { name: FigureType; firstMove: boolean };
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
      {figure.name && (
        <Figure figure={figure} showCoords={showCoords} x={x} y={y} />
      )}
    </div>
  );
};

export default memo(Cell);
