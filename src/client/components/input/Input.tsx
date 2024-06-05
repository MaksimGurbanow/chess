/* eslint-disable jsx-a11y/label-has-associated-control */
import { InputHTMLAttributes, LabelHTMLAttributes, useState } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  LabelHTMLAttributes<HTMLLabelElement>;

const Input = ({ placeholder, name, htmlFor, form, type }: InputProps) => {
  const inputId = name || htmlFor;
  const [value, setValue] = useState('');

  return (
    <>
      <label htmlFor={inputId} form={form} />
      <input
        id={inputId}
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
    </>
  );
};

export default Input;
