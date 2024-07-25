import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../StyledComponents/Button';

const HomeButton = () =>  {

  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate('/');
  }

  return (
    <Button onClick={goHomeHandler} >
      Home
    </Button>
  );
};

export { HomeButton };
