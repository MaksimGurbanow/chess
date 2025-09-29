/// <reference types="vite-plugin-svgr/client" />

import React, { useMemo } from 'react';
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
import { DefinedFigureProps } from '../types/props';

const DefinedFigure = ({ figure, color, style = {} }: DefinedFigureProps) => {
  const figureStyle: Partial<React.CSSProperties> = useMemo(
    () => ({
      transform: 'translateX(-1px)',
      ...style,
      aspectRatio: 1,
    }),
    [style]
  );
  switch (figure) {
    case 'b':
      return color === 'b' ? (
        <Bishop style={figureStyle} />
      ) : (
        <WBishop style={figureStyle} />
      );
    case 'k':
      return color === 'b' ? (
        <King style={figureStyle} />
      ) : (
        <WKing style={figureStyle} />
      );
    case 'q':
      return color === 'b' ? (
        <Queen style={figureStyle} />
      ) : (
        <WQueen style={figureStyle} />
      );
    case 'n':
      return color === 'b' ? (
        <Knight style={figureStyle} />
      ) : (
        <WKnight style={figureStyle} />
      );
    case 'r':
      return color === 'b' ? (
        <Rock style={figureStyle} />
      ) : (
        <WRock style={figureStyle} />
      );
    default:
      return color === 'b' ? (
        <Pawn style={figureStyle} />
      ) : (
        <WPawn style={figureStyle} />
      );
  }
};

export default DefinedFigure;
