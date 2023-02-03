import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  height: 2.5rem;
  width: 5rem;
  border-radius: 0.5rem;
  box-shadow: none;
  font-size: 1.25rem;
  text-transform: capitalize;
  background-color: ${props => props.theme.colors.secondary};
  border: none;
`;

const TransparentButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: none;
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: pointer;
`;

export { Button, TransparentButton };
