import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user/reducers';
import { ILoginCredentials } from '../../types/ILoginCredentials';

const Login = () =>  {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<ILoginCredentials>();
  const onSubmit: SubmitHandler<ILoginCredentials> = (data) => {
    dispatch(login(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} type='text' placeholder='username' />
      <input {...register('password')} type='password' placeholder='password' />
      <input type='submit' />
    </form>
  );
};

export { Login };
