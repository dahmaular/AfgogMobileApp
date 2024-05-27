import * as Yup from 'yup';

export const addressValidationSchema = Yup.object().shape({
  name: Yup.string(),
  city: Yup.string().required('City is required'),
  phoneNumber: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Phone number must be  valid number',
  ),
  address: Yup.string().required('Address is required'),
});

export const addPropertyValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  houseType: Yup.string(),
  address: Yup.string().required('Address is required'),
  size: Yup.string(),
  model: Yup.string(),
  carYear: Yup.string(),
});
