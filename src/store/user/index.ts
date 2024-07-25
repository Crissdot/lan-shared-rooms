import { ActionReducerMapBuilder, AsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserState } from '../../types/IUserState';
import { login, logout } from './reducers';

const userInitialState: IUserState = {
  user: null,
  status: 'idle',
}

const extraReducersBuilder = (builder: ActionReducerMapBuilder<IUserState>, actionCreator: AsyncThunk<any, any, any>) => {
  builder.addCase(actionCreator.pending, (state) => {
    state.status = 'loading';
  }).addCase(actionCreator.fulfilled, (state, action) => {
    state.user = action.payload;
    state.status = 'success';
  }).addCase(actionCreator.rejected, (state) => {
    state.status = 'failed';
  });
}

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersBuilder(builder, login);
    extraReducersBuilder(builder, logout);
  },
});

export const { actions, reducer } = userSlice;
