import * as yup from 'yup';

export const add = yup.object().shape({
  firstName: yup.string().required('Enter first name'),
  phone: yup
    .string()
    .matches(
      /^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/,
      'Phone number must be  valid number',
    )
    .required('Enter phone number'),
  email: yup
    .string()
    .email('Email is invalid')
    .required('Enter email address')
    .trim('Email can not contain spaces'),
  selectAccount: yup.string().required('Select an account'),
  canViewTransactions: yup.boolean(),
  canViewBalance: yup.boolean(),
  canGenerateStatement: yup.boolean(),
});
