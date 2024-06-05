import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { IconProps } from 'react-bootstrap-icons';

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
