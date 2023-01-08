import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

const MainCustom = styled.main`
  display: flex;
  width: 80%;
  height: calc(100vh - 75px);
  margin: 0 auto;
`;

const Main = () => {
  return (
    <>
      <Header/>
      <MainCustom>
        <Outlet/>
      </MainCustom>
    </>
  );
}

export { Main };
