import { InputHTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form/Form';
import { ILoginData } from '../types/types';
import useUser from '../hooks/useUser';

const Login = () => {
  const { fetchAndSetUser } = useUser();
  const navigate = useNavigate();
  const [data] = useState<InputHTMLAttributes<HTMLInputElement>[]>([
    { type: 'text', placeholder: 'Type your email', name: 'email' },
    { type: 'password', placeholder: 'Type your password', name: 'password' },
    { type: 'text', placeholder: 'Type your username', name: 'username' },
  ]);
  return (
    <div className="page login">
      <Form<ILoginData>
        inputs={data}
        onSubmit={(formData) => {
          fetchAndSetUser(formData);
          navigate('/');
        }}
      />
    </div>
  );
};

export default Login;
