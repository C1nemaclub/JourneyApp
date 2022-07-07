import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//Get User from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  recentUsers: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

//*Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//*Login User

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (e) {
    const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//*Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

//*getRecentUsers
export const getRecentUsers = createAsyncThunk(
  'auth/recentUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getRecentUsers(token);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getRecentUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecentUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recentUsers = action.payload;
      })
      .addCase(getRecentUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.recentUsers = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
