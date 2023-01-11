import React from 'react';
import styled from 'styled-components';
import { ChatInput } from './ChatInput';
import { Main } from './StyledComponents/Main';

const Title = styled.h1`
  padding-top: 2rem;
  font-size: 2rem;
  text-align: center;
`;

const Home = () => {
  return (
    <Main>
      <>
        <Title>LAN SHARED ROOMS</Title>
        <ChatInput/>
      </>
    </Main>
  );
}

export { Home };
