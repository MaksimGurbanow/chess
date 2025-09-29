import { FormEvent } from 'react';
import cn from 'classnames';
import generateKey from '../../utils/generateKey';
import Button from '../Button/Button';
import classes from './Form.module.scss';
import Input from '../Input/Input';
import { FormProps } from '../../types/props';

const Form = <T,>({ inputs, onSubmit }: FormProps<T>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      inputs.map((input) => [
        input.name,
        formData.get(input.name as string) as string,
      ])
    );
    onSubmit(data as T);
  };
  const formId = generateKey().toString();
  return (
    <form onSubmit={handleSubmit} id={formId} className={cn(classes.form)}>
      {inputs.map((input) => (
        <Input
          key={generateKey()}
          name={input.name}
          placeholder={input.placeholder}
          form={formId}
          required
        />
      ))}
      <Button type="submit">Log In</Button>
    </form>
  );
};

export default Form;
