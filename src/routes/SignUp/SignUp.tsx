import { InputHTMLAttributes, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form';
import { ISignUpData } from '../../types/types';
import classes from './SignUp.module.scss';
import { useUser } from '../../context/useUser';
import Alert from '../../components/Alert/Alert';

const SignUp = () => {
  const navigate = useNavigate();
  const [data] = useState<InputHTMLAttributes<HTMLInputElement>[]>([
    { type: 'text', placeholder: 'Type your username', name: 'username' },
    { type: 'text', placeholder: 'Type your email', name: 'email' },
    { type: 'password', placeholder: 'Type your password', name: 'password' },
  ]);
  const { createNewUser, error, setError } = useUser();

  const handleSubmit = useCallback(
    async (submitData: ISignUpData) => {
      await createNewUser(submitData);
      navigate('/');
    },
    [createNewUser, navigate]
  );
  return (
    <div className="page SignUp">
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={() => setError(null)}
          duration={3000}
        />
      )}
      <Form<ISignUpData> inputs={data} onSubmit={handleSubmit} />
      <button
        type="button"
        onClick={() => navigate('/login')}
        className={classes.loginLink}
      >
        Login to your account
      </button>
    </div>
  );
};

export default SignUp;
