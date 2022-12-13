import React from 'react';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user';

const Login = () =>  {
  const dispatch = useAppDispatch();

  // TODO add logic
  // const user = useSelector((state: any) => state.user.user);

  // TODO add logic
  const loginHandler = () => {
    dispatch(login({username: 'Criss', password: '123456'}));
  }

  return (
    <div>
      <button onClick={loginHandler}>Ingresar</button>
    </div>
  );
};

export { Login };
