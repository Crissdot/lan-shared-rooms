import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = createAsyncThunk('user/login', async (data: LoginCredentials) => {
  const response = await axios.post('http://localhost:9999/api/v1/auth/login', data);
  return response.data.data.user;
});

interface UserState {
  user: object | null;
  status: string;
}

const userInitialState: UserState = {
  user: null,
  status: 'idle',
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    }).addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = 'success';
    }).addCase(login.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { actions, reducer } = userSlice;
