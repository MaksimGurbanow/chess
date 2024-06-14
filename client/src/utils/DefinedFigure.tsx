/// <reference types="vite-plugin-svgr/client" />

import Bishop from '../assets/figures/bishop.svg?react';
import Pawn from '../assets/figures/pawn.svg?react';
import Knight from '../assets/figures/knight.svg?react';
import Rock from '../assets/figures/rock.svg?react';
import Queen from '../assets/figures/queen.svg?react';
import King from '../assets/figures/king.svg?react';
import WBishop from '../assets/figures/wBishop.svg?react';
import WPawn from '../assets/figures/wPawn.svg?react';
import WKnight from '../assets/figures/wKnight.svg?react';
import WRock from '../assets/figures/wRock.svg?react';
import WQueen from '../assets/figures/wQueen.svg?react';
import WKing from '../assets/figures/wKing.svg?react';
import { FigureType } from '../types/types';

const DefinedFigure = ({
  figure,
  color,
}: {
  figure: FigureType[1];
  color: FigureType[0];
}) => {
  switch (figure) {
    case 'b':
      return color === 'b' ? <Bishop /> : <WBishop />;
    case 'k':
      return color === 'b' ? <King /> : <WKing />;
    case 'q':
      return color === 'b' ? <Queen /> : <WQueen />;
    case 'n':
      return color === 'b' ? <Knight /> : <WKnight />;
    case 'r':
      return color === 'b' ? <Rock /> : <WRock />;
    default:
      return color === 'b' ? <Pawn /> : <WPawn />;
  }
};

export default DefinedFigure;
