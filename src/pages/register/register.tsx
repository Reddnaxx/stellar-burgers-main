import {
  registerAction,
  selectRegisterFormData,
  setRegisterFormData
} from '@slices';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectRegisterFormData);

  const [userName, setUserName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  const [password, setPassword] = useState(formData.password);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerAction({ name: userName, email, password }));
  };

  useEffect(() => {
    dispatch(setRegisterFormData({ name: userName, email, password }));
  }, [userName, email, password]);

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
