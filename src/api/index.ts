import {RootState} from '@/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://afgog.pendodesign.co/api/',
  prepareHeaders: (headers, {getState}) => {
    const {token} = (getState() as RootState).user;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['cart', 'property'],
  endpoints: () => ({}),
});
