import React from 'react';
import styled from 'styled-components';
import { AuthButton } from './auth/AuthButton';

const HeaderCustom = styled.main`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const Header = () => {
  return (
    <HeaderCustom>
      <AuthButton/>
    </HeaderCustom>
  );
}

export { Header };
