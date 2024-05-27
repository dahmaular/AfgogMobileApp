import {api} from '@/api';
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '@/utils/api-types/changePassword';
import {retry} from '@reduxjs/toolkit/dist/query';

export const bancaChangePasswordApi = api.injectEndpoints({
  endpoints: build => ({
    changePassword: build.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: credentials => ({
        url: 'Authentication/ChangePassword',
        method: 'POST',
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          retry.fail({fake: 'error'});
        },
      },
    }),
  }),
});

export const {useChangePasswordMutation} = bancaChangePasswordApi;
