import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Main } from './components/Main';
import { Home } from './components/Home';
import { LoginForm } from './components/auth/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Routes>
            <Route path='/' element={<Main/>}>
              <Route path='' element={<Home/>} />
              <Route path='login/' element={<LoginForm/>} />
            </Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
