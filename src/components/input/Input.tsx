/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import classes from './Input.module.scss';
import { InputProps } from '../../types/props';
import cn from 'classnames'

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
    <div className={classes.inputContainer}>
      {variant === 'labeled' && (
        <label
          htmlFor={inputId}
          form={form}
          className={cn(classes.label, { [classes.focused]: value || isFocused })}
          // className={`label ${isFocused || value ? 'focused' : ''}`}
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
        className={classes.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
      />
    </div>
  );
};

export default Input;
