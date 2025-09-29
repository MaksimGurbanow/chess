/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import classes from './Button.module.scss';

const Button = ({
  disabled,
  type = 'button',
  onClick,
  children,
  style,
  className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(classes.button, className)}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
