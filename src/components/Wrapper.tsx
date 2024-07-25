import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

const Wrapper = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}

export { Wrapper };
