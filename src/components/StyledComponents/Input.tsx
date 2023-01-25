import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  border-radius: 1rem;
  border: 1px solid black;
  color: ${props => props.disabled ? 'grey' : 'black'};
  background-color: white;
`;

export { Input };
