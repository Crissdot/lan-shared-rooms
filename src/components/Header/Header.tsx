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
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
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
