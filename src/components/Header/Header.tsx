import React from 'react';
import styled from 'styled-components';
import { AuthButton } from './AuthButton';
import { HomeButton } from './HomeButton';

const HeaderCustom = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const Header = () => {
  return (
    <HeaderCustom>
      <HomeButton/>
      <AuthButton/>
    </HeaderCustom>
  );
}

export { Header };
