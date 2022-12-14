import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/typedRedux';
import { login } from '../../store/user';

interface ILoginInput {
  username: string;
  password: string;
}

const Login = () =>  {
  const dispatch = useAppDispatch();

  const { register, handleSubmit } = useForm<ILoginInput>();
  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    dispatch(login(data));
  }

  // TODO add logic
  // const user = useSelector((state: any) => state.user.user);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} type='text' placeholder='username' />
      <input {...register('password')} type='password' placeholder='password' />
      <input type='submit' />
    </form>
  );
};

export { Login };
