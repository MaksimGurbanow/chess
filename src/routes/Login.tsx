import { InputHTMLAttributes, useState } from 'react';
import Form from '../client/components/form/Form';
import { ILoginData } from '../client/types/types';

const Login = () => {
  const [data] = useState<InputHTMLAttributes<HTMLInputElement>[]>([
    { type: 'text', placeholder: 'Type your email', name: 'email' },
    { type: 'password', placeholder: 'Type your password', name: 'password' },
    { type: 'text', placeholder: 'Type your username', name: 'username' },
  ]);
  return (
    <div className="page login">
      <Form<ILoginData>
        inputs={data}
        callback={(formData) => console.log(formData)}
      />
    </div>
  );
};

export default Login;
