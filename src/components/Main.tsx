import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { AuthButton } from './auth/AuthButton';

const MainCustom = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
`;

const Main = () => {
  return (
    <>
      <header>
        <AuthButton/>
      </header>
      <MainCustom>
        <Outlet/>
      </MainCustom>
    </>
  );
}

export { Main };
