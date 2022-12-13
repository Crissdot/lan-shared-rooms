import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';

const Login = () =>  {
  const dispatch = useDispatch();

  // TODO add logic
  const user = useSelector((state: any) => state.user.user);

  // TODO add logic
  const loginHandler = () => {
    dispatch(actions.login({
      username: 'Criss',
    }));
  }

  return (
    <div>
      <button onClick={loginHandler}>Ingresar</button>
    </div>
  );
};

export { Login };
