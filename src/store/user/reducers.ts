import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { config } from '../../config';
import { RootState } from '../';
import { ILoginCredentials } from '../../types/ILoginCredentials';
import { IFethcedUser } from '../../types/IFetchedUser';

export const login = createAsyncThunk<IFethcedUser, ILoginCredentials>('user/login', async (data: ILoginCredentials) => {
  const response = await axios.post(`${config.backendURL}/auth/login`, data);
  return response.data.data.user;
});

export const logout = createAsyncThunk('user/logout', async (data, thunkAPI) => {
  const {user} = (thunkAPI.getState() as RootState).user;

  if (user) {
    await axios.post(`${config.backendURL}/auth/logout`, null, {
      headers: {
        'Token-Auth': user.token,
      }
    });
  }
  return null;
});
