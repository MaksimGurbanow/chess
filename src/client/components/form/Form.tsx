import { FormEvent, InputHTMLAttributes } from 'react';
import generateKey from '../../utils/generateKey';
import Button from '../button/Button';
import './form.css';
import Input from '../input/Input';

interface FormProps<T> {
  inputs: InputHTMLAttributes<HTMLInputElement>[];
  callback: (data: T) => void;
}

const Form = <T,>({ inputs, callback }: FormProps<T>) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      inputs.map((input) => [
        input.name,
        formData.get(input.name as string) as string,
      ])
    );
    callback(data as T);
  };
  const formId = generateKey().toString();
  return (
    <form onSubmit={handleSubmit} id={formId}>
      {inputs.map((input) => (
        <Input
          key={generateKey()}
          name={input.name}
          placeholder={input.placeholder}
          form={formId}
        />
      ))}
      <Button type="submit" />
    </form>
  );
};

export default Form;
