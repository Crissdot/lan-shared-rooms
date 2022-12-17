import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typedRedux';
import { actions } from '../../store/user';

const AuthButton = () =>  {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    setIsUserLoggedIn(!!user);
  }, [user]);

  const authHandler = () => {
    if (isUserLoggedIn) {
      // TODO logout in backend
      dispatch(actions.logout());
    } else {
      navigate('/login/');
    }
  }

  return (
    <button onClick={authHandler}>{isUserLoggedIn ? 'Logout' : 'Login'}</button>
  );
};

export { AuthButton };
