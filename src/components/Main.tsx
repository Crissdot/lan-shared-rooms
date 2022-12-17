import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

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
    <MainCustom>
      <Outlet/>
    </MainCustom>
  );
}

export { Main };
