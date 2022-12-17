import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user/reducers';
import { ILoginCredentials } from '../../types/ILoginCredentials';

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

const Login = () =>  {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<ILoginCredentials>();
  const onSubmit: SubmitHandler<ILoginCredentials> = (data) => {
    dispatch(login(data));
  }

  return (
    <>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} type='text' placeholder='username' />
        <input {...register('password')} type='password' placeholder='password' />
        <input type='submit' />
      </Form>
    </>
  );
};

export { Login };
