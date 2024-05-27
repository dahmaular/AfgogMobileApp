import * as yup from 'yup';
export const businessCardSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  title: yup.string().required('Title is required'),
  phone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number must be  valid number',
    )
    .required('Password is required'),
  email: yup.string().email().required('Email address is required'),
  businessName: yup.string().required('Bussiness name is required'),
  address: yup.string().required('Bussiness address is required'),
  state: yup.string().required('State is required'),
});
