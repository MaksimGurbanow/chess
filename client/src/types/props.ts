import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { IconProps } from 'react-bootstrap-icons';
import { Coordinates } from './types';
import Bishop from '../app/figures/Bishop';
import King from '../app/figures/King';
import Knight from '../app/figures/Knight';
import Pawn from '../app/figures/Pawn';
import Queen from '../app/figures/Queen';
import Rook from '../app/figures/Rook';

export interface CustomIconProps extends Partial<IconProps> {
  callback: () => void;
  icon: React.ReactElement<IconProps>;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  LabelHTMLAttributes<HTMLLabelElement> & {
    variant?: 'labeled' | 'placeholder';
  };

export interface FormProps<T> {
  inputs: InputHTMLAttributes<HTMLInputElement>[];
  onSubmit: (data: T) => void;
}

export type ChooseFigure = (
  coords: Coordinates[],
  elem: King | Queen | Pawn | Bishop | Rook | Knight
) => void;
