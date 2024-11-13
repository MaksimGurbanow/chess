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
      return color === 'b' ? (
        <Bishop style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WBishop style={{ transform: 'translateX(-1px)' }} />
      );
    case 'k':
      return color === 'b' ? (
        <King style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WKing style={{ transform: 'translateX(-1px)' }} />
      );
    case 'q':
      return color === 'b' ? (
        <Queen style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WQueen style={{ transform: 'translateX(-1px)' }} />
      );
    case 'n':
      return color === 'b' ? (
        <Knight style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WKnight style={{ transform: 'translateX(-1px)' }} />
      );
    case 'r':
      return color === 'b' ? (
        <Rock style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WRock style={{ transform: 'translateX(-1px)' }} />
      );
    default:
      return color === 'b' ? (
        <Pawn style={{ transform: 'translateX(-1px)' }} />
      ) : (
        <WPawn style={{ transform: 'translateX(-1px)' }} />
      );
  }
};

export default DefinedFigure;
