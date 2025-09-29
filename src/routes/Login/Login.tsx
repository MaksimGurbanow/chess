import { InputHTMLAttributes, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { ILoginData } from '../../types/types';
import classes from './Login.module.scss';
import { useUser } from '../../context/useUser';
import Alert from '../../components/Alert/Alert';

const Login = () => {
  const navigate = useNavigate();
  const [data] = useState<InputHTMLAttributes<HTMLInputElement>[]>([
    { type: 'text', placeholder: 'Type your username', name: 'username' },
    { type: 'password', placeholder: 'Type your password', name: 'password' },
  ]);
  const { login, error, setError } = useUser();

  const handleSubmit = useCallback(
    async (submitData: ILoginData) => {
      await login(submitData).then(() => {
        navigate('/');
      });
    },
    [login, navigate]
  );
  return (
    <div className="page login">
      {error && (
        <Alert
          message={error}
          type="error"
          duration={3000}
          onClose={() => setError(null)}
        />
      )}
      <Form<ILoginData> inputs={data} onSubmit={handleSubmit} />
      <button
        type="button"
        onClick={() => navigate('/signup')}
        className={classes.registerLink}
      >
        Go to Register
      </button>
    </div>
  );
};

export default Login;
