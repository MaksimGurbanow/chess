/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';
import './button.scss';

const Button = ({
  disabled,
  type = 'button',
  onClick,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="button"
    >
      {children}
    </button>
  );
};

export default Button;
