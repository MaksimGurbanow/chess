/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ChooseFigure } from '../../types/props';
import { Color, Coordinates, FigureName, FigureType } from '../../types/types';
import DefinedFigure from '../../utils/DefinedFigure';
import createFigure from '../../utils/createFigure';

const Figure = ({
  figure,
  color,
  x,
  y,
  showCoords,
}: {
  figure: FigureName;
  color: Color;
  showCoords: ChooseFigure;
} & Coordinates) => {
  const figureClass = createFigure(figure, color, x, y);
  return (
    <div
      onClick={() => {
        showCoords(figureClass.getMoves(), {
          elem: (color + figure) as FigureType,
          ownCoordinates: { x, y },
        });
      }}
      className="figure"
    >
      <DefinedFigure figure={figure} color={color} />
    </div>
  );
};

export default Figure;
