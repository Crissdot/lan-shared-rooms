import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
  padding: 0 10%;
  height: calc(100vh - 75px);
  background-color: ${props => props.theme.colors.primary};
`;

export { Main };
