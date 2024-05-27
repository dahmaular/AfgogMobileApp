import {api} from '@/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyRequest,
  VerifyResponse,
} from '@/utils/api-types/authTypes';
import {retry} from '@reduxjs/toolkit/dist/query';

export const afgogAuthApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth-user',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({fake: 'error'});
        },
      },
    }),
    createAccount: build.mutation<RegisterResponse, RegisterRequest>({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({fake: 'error'});
        },
      },
    }),
    verifyEmail: build.mutation<VerifyResponse, VerifyRequest>({
      query: body => ({
        url: 'verify-email',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateAccountMutation,
  useVerifyEmailMutation,
} = afgogAuthApi;
