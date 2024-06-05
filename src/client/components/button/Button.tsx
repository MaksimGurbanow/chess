/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from 'react';

const Button = ({
  disabled,
  type = 'button',
  onClick,
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
