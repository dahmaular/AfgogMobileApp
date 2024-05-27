import {api} from '@/api';
import {
  DeliveryRequest,
  DeliveryResponse,
  PaymentCardRequest,
  PaymentCardResponse,
  UpdateUserRequest,
  VerifyResponse,
} from '@/utils/api-types/authTypes';

export const afgogProfileApi = api.injectEndpoints({
  endpoints: build => ({
    profileUpdate: build.mutation<VerifyResponse, UpdateUserRequest>({
      query: ({phone, fullName, userId}) => ({
        url: `users/${userId}`,
        method: 'PUT',
        body: {
          fullName,
          phone,
        },
      }),
    }),
    addDeliveryAddress: build.mutation<VerifyResponse, DeliveryRequest>({
      query: body => ({
        url: 'delivery-address',
        method: 'POST',
        body,
      }),
    }),
    getDeliveryAddress: build.query<DeliveryResponse, {userId: string}>({
      query: ({userId}) => ({
        url: `delivery-address/${userId}`,
        method: 'GET',
      }),
    }),
    addPaymentCard: build.mutation<PaymentCardResponse, PaymentCardRequest>({
      query: body => ({
        url: 'payment-cards',
        method: 'POST',
        body,
      }),
    }),
    getPaymentCards: build.query<PaymentCardResponse, {userId: string}>({
      query: ({userId}) => ({
        url: `payment-cards/${userId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useProfileUpdateMutation,
  useAddDeliveryAddressMutation,
  useLazyGetDeliveryAddressQuery,
  useAddPaymentCardMutation,
  useLazyGetPaymentCardsQuery,
} = afgogProfileApi;
