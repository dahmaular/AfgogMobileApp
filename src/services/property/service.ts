import {api} from '@/api';
// import {store} from '@/store';
import {
  CreatePropertyResponse,
  PropertyRequest,
} from '@/utils/api-types/authTypes';

export const afgogPropertyApi = api.injectEndpoints({
  endpoints: build => ({
    createProperty: build.mutation<CreatePropertyResponse, PropertyRequest>({
      query: body => ({
        url: 'property',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['property'],
    }),
    getProperty: build.query<CreatePropertyResponse, void>({
      query: () => ({
        url: 'property',
        method: 'GET',
      }),
      providesTags: ['property'],
    }),
    // getProduct: build.query<OneProductResponse, {id: string}>({
    //   query: ({id}) => ({
    //     url: `product/${id}`,
    //     method: 'GET',
    //   }),
    // }),
    // addToCart: build.mutation<CartResponse, CartRequest>({
    //   query: body => ({
    //     url: 'cart',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['cart'],
    // }),
    // getUserCart: build.query<CartResponse, void>({
    //   query: () => {
    //     const id: string = store.getState().user.authData._id;
    //     return {
    //       url: `cart/${id}`,
    //       method: 'GET',
    //     };
    //   },
    //   providesTags: ['cart'],
    // }),
  }),
});

export const {
  useCreatePropertyMutation,
  useGetPropertyQuery,
  useLazyGetPropertyQuery,
} = afgogPropertyApi;
