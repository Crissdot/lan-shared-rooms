import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/typedRedux';
import { actions } from '../../store/user';

const Logout = () =>  {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);

  // TODO logout in backend

  return (
    <>
      {
        user && <button onClick={() => dispatch(actions.logout())}>Logout</button>
      }
    </>
  );
};

export { Logout };
