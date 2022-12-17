import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/typedRedux';
import { logout } from '../../store/user/reducers';

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
      try {
        dispatch(logout());
      } catch (e) {
        // TODO
      }
    } else {
      navigate('/login/');
    }
  }

  return (
    <button onClick={authHandler}>{isUserLoggedIn ? 'Logout' : 'Login'}</button>
  );
};

export { AuthButton };
