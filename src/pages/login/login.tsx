import { loginAction, selectLoginFormData, setLoginFormData } from '@slices';
import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectLoginFormData);

  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  useEffect(() => {
    dispatch(setLoginFormData({ email, password }));
  }, [email, password]);

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
