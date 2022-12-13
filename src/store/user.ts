import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface User {
  username: string;
}

export const login = createAsyncThunk('user/login', async (data: User) => {
  // TODO something async
  return data;
});

interface UserState {
  user: User | null;
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
