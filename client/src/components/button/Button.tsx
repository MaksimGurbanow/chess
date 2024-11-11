/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';

const Button = ({
  disabled,
  type = 'button',
  onClick,
  children,
  className,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(classes.button, className)}
    >
      {children}
    </button>
  );
};

export default Button;
