import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { AuthButton } from './AuthButton';
import { HomeButton } from './HomeButton';

const HeaderCustom = styled.header`
  display: flex;
  width: 100%;
  height: 75px;
  justify-content: space-between;
  padding: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  background-color: ${props => props.theme.colors.primary};
  border-bottom: 1px solid ${props => props.theme.colors.alternative};
`;

const Header = () => {
  const [showLoginBtn, setShowLoginBtn] = useState(false);
  const match = useMatch('login');

  useEffect(() => {
    setShowLoginBtn(match?.pathnameBase !== '/login');
  }, [match]);

  return (
    <HeaderCustom>
      <HomeButton/>
      {showLoginBtn && <AuthButton/>}
    </HeaderCustom>
  );
}

export { Header };
