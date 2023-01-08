import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () =>  {

  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate('/');
  }

  return (
    <button onClick={goHomeHandler}>Home</button>
  );
};

export { HomeButton };
