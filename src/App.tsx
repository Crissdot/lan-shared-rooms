import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { Wrapper } from './components/Wrapper';
import { Home } from './components/Home';
import { LoginForm } from './components/auth/LoginForm';
import { ThemeProvider } from 'styled-components';
import { ITheme } from './types/ITheme';

function App() {
  const theme: ITheme = {
    colors: {
      primary: '#001427',
      secondary: '#5C80BC',
      alternative: '#D3D4D9',
    }
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <ThemeProvider theme={theme} >
            <Routes>
              <Route path='/' element={<Wrapper/>}>
                <Route path='' element={<Home/>} />
                <Route path='login/' element={<LoginForm/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
