import { FormEvent } from 'react';
import generateKey from '../../utils/generateKey';
import Button from '../button/Button';
import './form.css';
import Input from '../input/Input';
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
    <form onSubmit={handleSubmit} id={formId} className="form">
      {inputs.map((input) => (
        <Input
          key={generateKey()}
          name={input.name}
          placeholder={input.placeholder}
          form={formId}
        />
      ))}
      <Button type="submit">Log In</Button>
    </form>
  );
};

export default Form;
