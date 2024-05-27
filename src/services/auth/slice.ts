import {createSlice} from '@reduxjs/toolkit';
import {afgogAuthApi} from './service';
import {RootState} from '@/store';

export type UserDataType = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
};

export interface IMyBankInitialState {
  status: 'login' | 'login-success' | 'login-error' | 'idle';
  authData: UserDataType;
  token?: string | null;
  isAuthenticated: boolean;
  isAgent: boolean;
  isRealEstate: boolean;
}

const initState: IMyBankInitialState = {
  status: 'idle',
  authData: {
    _id: '',
    fullName: '',
    email: '',
    phone: '',
  },
  token: '',
  isAuthenticated: false,
  isAgent: false,
  isRealEstate: false,
};

export const afgogAuthSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    logout: state => {
      // state.status = "idle";
      state.isAuthenticated = false;
    },
    login: state => {
      state.status = 'login';
    },
    loginSuccess: state => {
      state.status = 'login-success';
    },
    loginError: state => {
      state.status = 'login-error';
      state.isAuthenticated = false;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(afgogAuthApi.endpoints.login.matchPending, state => {
      state.status = 'login';
    });
    builder.addMatcher(
      afgogAuthApi.endpoints.login.matchFulfilled,
      (state, {payload}) => {
        const {authData, isSuccess, token} = payload;
        if (isSuccess) {
          state.authData = authData;
          state.token = token;
          state.status = 'login-success';
          state.isAuthenticated = true;
          state.isAgent = authData.isAgent;
          state.isRealEstate = authData.isRealEstate;

          return;
        }
        state.status = 'login-error';
        state.isAuthenticated = false;
      },
    );
    builder.addMatcher(afgogAuthApi.endpoints.login.matchRejected, state => {
      state.status = 'login-error';
      state.isAuthenticated = false;
    });
  },
});

export const {logout, login, loginSuccess, loginError} = afgogAuthSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export default afgogAuthSlice.reducer;
