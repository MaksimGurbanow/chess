/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { memo, useCallback, useMemo } from 'react';
import { Coordinates, FigureType } from '../../types/types';
import DefinedFigure from '../../utils/DefinedFigure';
import createFigure from '../../utils/createFigure';
import { useGame } from '../../context/useGame';

const Figure = ({
  figure,
  x,
  y,
}: {
  figure: { name: FigureType; firstMove: boolean };
} & Coordinates) => {
  const { setAvailableCells, setChosenFigure, boardState } = useGame();
  const figureState = useMemo(() => createFigure(figure, x, y), [figure, x, y]);
  const showCoords = useCallback(() => {
    setAvailableCells(figureState.getMoves(boardState));
    setChosenFigure(figureState);
  }, [figureState, setAvailableCells, setChosenFigure, boardState]);

  return (
    <div
      onClick={showCoords!}
      className={`figure ${figure.name[0]}-${figure.name[1].toLowerCase()}`}
    >
      <DefinedFigure figure={figure.name[1]} color={figure.name[0]} />
    </div>
  );
};

export default memo(Figure);
