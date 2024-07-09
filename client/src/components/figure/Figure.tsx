/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useMemo } from 'react';
import { ChooseFigure } from '../../types/props';
import { Coordinates, FigureType } from '../../types/types';
import DefinedFigure from '../../utils/DefinedFigure';
import createFigure from '../../utils/createFigure';

const Figure = ({
  figure,
  x,
  y,
  showCoords,
}: {
  figure: { name: FigureType; firstMove: boolean };
  showCoords: ChooseFigure;
} & Coordinates) => {
  const figureState = useMemo(() => createFigure(figure, x, y), [figure, x, y]);

  const handleClick = () => {
    showCoords(figureState.getMoves(), figureState);
  };

  return (
    <div
      onClick={handleClick}
      className={`figure ${figure.name[0]}-${figure.name[1].toLowerCase()}`}
    >
      <DefinedFigure figure={figure.name[1]} color={figure.name[0]} />
    </div>
  );
};

export default memo(Figure);
