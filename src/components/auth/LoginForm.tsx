import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user/reducers';
import { ILoginCredentials } from '../../types/ILoginCredentials';
import { Input } from '../StyledComponents/Input';
import { Main } from '../StyledComponents/Main';

const MainLogin = styled(Main)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 0;
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  padding-top: 0.5rem;
  gap: 1rem;
`;

const LoginForm = () =>  {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILoginCredentials>();
  const onSubmit: SubmitHandler<ILoginCredentials> = async (data) => {
    try {
      const user = await dispatch(login(data)).unwrap();
      navigate('/');
    } catch (e) {
      // TODO show error message
    }
  }

  return (
    <MainLogin>
      <>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('username')} type='text' placeholder='username' />
          <Input {...register('password')} type='password' placeholder='password' />
          <Input type='submit' />
        </Form>
      </>
    </MainLogin>
  );
};

export { LoginForm };
