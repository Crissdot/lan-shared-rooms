import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types/IUserState';
import { login } from './reducers';

const userInitialState: IUserState = {
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
