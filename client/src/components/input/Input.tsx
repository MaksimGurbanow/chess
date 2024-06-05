/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import './input.scss';
import { InputProps } from '../../types/props';

const Input = ({
  placeholder,
  name,
  htmlFor,
  form,
  type,
  variant = 'labeled',
  required = false,
}: InputProps) => {
  const inputId = name || htmlFor;
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="input-container">
      {variant === 'labeled' && (
        <label
          htmlFor={inputId}
          form={form}
          className={`label ${isFocused || value ? 'focused' : ''}`}
        >
          {name}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type || 'text'}
        placeholder={variant === 'placeholder' ? placeholder : undefined}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
      />
    </div>
  );
};

export default Input;
