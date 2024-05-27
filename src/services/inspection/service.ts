import {api} from '@/api';
import {
  InspectionRequest,
  InspectionResponse,
} from '@/utils/api-types/authTypes';

export const afgogInspectionApi = api.injectEndpoints({
  endpoints: build => ({
    requestInspection: build.mutation<InspectionResponse, InspectionRequest>({
      query: credentials => ({
        url: 'inspection',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useRequestInspectionMutation} = afgogInspectionApi;
