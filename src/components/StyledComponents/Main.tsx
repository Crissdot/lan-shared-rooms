import React from 'react';
import styled from 'styled-components';

const MainCustom = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: calc(100vh - 75px);
  margin: 0 auto;
`;

interface Props {
  children: JSX.Element;
}

const Main = ({children}: Props) => {
  return (
    <MainCustom>
      {children}
    </MainCustom>
  );
}

export { Main };
