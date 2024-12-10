import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TAuthSliceState = {
  isAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
  registerFormData: TRegisterData;
  loginFormData: TLoginData;
};

const initialState: TAuthSliceState = {
  isAuth: false,
  user: null,
  isLoading: !!getCookie('accessToken'),
  error: null,
  registerFormData: {
    name: '',
    email: '',
    password: ''
  },
  loginFormData: {
    email: '',
    password: ''
  }
};

export const loginAction = createAsyncThunk(
  'auth/login',
  async (credentials: TLoginData) => loginUserApi(credentials)
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const tokenAction = createAsyncThunk('auth/token', async () =>
  getUserApi()
);

export const logoutAction = createAsyncThunk('auth/logout', async () =>
  logoutApi()
);

export const updateUserAction = createAsyncThunk(
  'auth/update',
  async (data: Partial<TUser>) => updateUserApi(data)
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisterFormData: (state, action: PayloadAction<TRegisterData>) => {
      state.registerFormData = { ...state.registerFormData, ...action.payload };
    },
    setLoginFormData: (state, action: PayloadAction<TLoginData>) => {
      state.loginFormData = { ...state.loginFormData, ...action.payload };
    },
    clearRegisterFormData: (state) => {
      state.registerFormData = initialState.registerFormData;
    },
    clearLoginFormData: (state) => {
      state.loginFormData = initialState.loginFormData;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.isLoading = false;
      state.isAuth = true;
      state.user = user;
      state.error = null;

      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка при входе в аккаунт';
    });

    builder.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.isLoading = false;
      state.isAuth = true;
      state.user = user;
      state.error = null;

      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка при регистрации';
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      state.error = null;

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка при выходе из аккаунта';
    });

    builder.addCase(tokenAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(tokenAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(tokenAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = null;
      state.error = action.error.message ?? 'Ошибка при проверке токена';
    });

    builder.addCase(updateUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? 'Ошибка при обновлении данных';
    });
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectIsAuthLoading: (state) => state.isLoading,
    selectError: (state) => state.error,
    selectLoginFormData: (state) => state.loginFormData,
    selectRegisterFormData: (state) => state.registerFormData
  }
});

export const {
  selectCurrentUser,
  selectError,
  selectIsAuth,
  selectIsAuthLoading,
  selectLoginFormData,
  selectRegisterFormData
} = authSlice.selectors;

export const {
  clearLoginFormData,
  clearRegisterFormData,
  setLoginFormData,
  setRegisterFormData
} = authSlice.actions;

export const authReducer = authSlice.reducer;
export default authSlice.reducer;
