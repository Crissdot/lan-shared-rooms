import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user/reducers';
import { ILoginCredentials } from '../../types/ILoginCredentials';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoginForm = () =>  {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILoginCredentials>();
  const onSubmit: SubmitHandler<ILoginCredentials> = async (data) => {
    try {
      dispatch(login(data))
      navigate('/');
    } catch (e) {
      // TODO show error message
    }
  }

  return (
    <Div>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} type='text' placeholder='username' />
        <input {...register('password')} type='password' placeholder='password' />
        <input type='submit' />
      </Form>
    </Div>
  );
};

export { LoginForm };
