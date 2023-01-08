import React from 'react';
import styled from 'styled-components';

const ButtonCustom = styled.button`
  height: 2.5rem;
  width: 5rem;
  border-radius: 0.5rem;
  box-shadow: none;
  font-size: 1.25rem;
  text-transform: capitalize;
`;

interface Props {
  onClick: () => void;
  text: string;
}

const Button = ({onClick, text}: Props) => {
  return (
    <ButtonCustom onClick={onClick}>
      {text}
    </ButtonCustom>
  );
}

export { Button };
