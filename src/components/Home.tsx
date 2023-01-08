import React from 'react';
import styled from 'styled-components';
import { Main } from './StyledComponents/Main';

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const Home = () => {
  return (
    <Main>
      <>
        <Title>LAN SHARED ROOMS</Title>
      </>
    </Main>
  );
}

export { Home };
