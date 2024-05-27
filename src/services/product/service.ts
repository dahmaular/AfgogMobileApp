import {api} from '@/api';
import {store} from '@/store';
import {
  CartRequest,
  CartResponse,
  CategoryResponse,
  OneProductResponse,
  ProductResponse,
} from '@/utils/api-types/authTypes';

export const bancaProductApi = api.injectEndpoints({
  endpoints: build => ({
    getProductCategory: build.query<CategoryResponse, void>({
      query: () => ({
        url: 'product-category',
        method: 'GET',
      }),
    }),
    getProducts: build.query<ProductResponse, void>({
      query: () => ({
        url: 'product',
        method: 'GET',
      }),
    }),
    getProduct: build.query<OneProductResponse, {id: string}>({
      query: ({id}) => ({
        url: `product/${id}`,
        method: 'GET',
      }),
    }),
    addToCart: build.mutation<CartResponse, CartRequest>({
      query: body => ({
        url: 'cart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    getUserCart: build.query<CartResponse, void>({
      query: () => {
        const id: string = store.getState().user.authData._id;
        return {
          url: `cart/${id}`,
          method: 'GET',
        };
      },
      providesTags: ['cart'],
    }),
  }),
});

export const {
  useGetProductCategoryQuery,
  useGetProductsQuery,
  useAddToCartMutation,
  useGetUserCartQuery,
  useLazyGetProductQuery,
} = bancaProductApi;
