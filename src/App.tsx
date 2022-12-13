import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home } from './components/Home';
import { store } from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
