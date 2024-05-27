import * as yup from 'yup';

export const accountOpeningSchema = {
  account: yup.object().shape({
    accountType: yup
      .string()
      .oneOf(['Current', 'Debit'])
      .required('Account type is required'),
    currency: yup.string().required('Choose a currency'),
  }),
  business: yup.object().shape({
    businessName: yup.string().required('Business name is required'),
    tin: yup.string().required('Enter the TIN for  your business'),
    businessAddress: yup.string().required('Enter business address'),
    city: yup.string().required('choose a city'),
    state: yup.string().required('choose a state'),
    natureOfBusiness: yup.string().required('What is this business into?'),
  }),
  personal: yup.object().shape({
    bvn: yup
      .string()
      .matches(/^\d{11}$/, 'BVN must be 11 digits')
      .required('Provide BVN'),
    firstName: yup.string().required('Enter your first name'),
    middleName: yup.string(),
    lastName: yup.string().required('Enter your last name'),
    dateOfBirth: yup
      .string()
      .matches(
        /^(0?[1-9]|1[0-9]|2[0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/,
        'Invalid date format. Please use dd/mm/yyyy format.',
      )
      .test('future-date', 'Date cannot be a future date.', function (value) {
        const currentDate = new Date();
        const [day, month, year] = value.split('/');
        const inputDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );
        return inputDate <= currentDate;
      })
      .required('Date is required.'),
    address: yup.string().required('Enter your residential address'),
  }),
};
