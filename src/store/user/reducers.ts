import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILoginCredentials } from '../../types/ILoginCredentials';

export const login = createAsyncThunk('user/login', async (data: ILoginCredentials) => {
  const response = await axios.post('http://localhost:9999/api/v1/auth/login', data);
  return response.data.data.user;
});
