import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .trim('Can not contain trailing spaces'),
  password: Yup.string()
    .min(8, 'Should not be less than 8 characters')
    .required('Password is required'),
});

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .trim('Can not contain trailing spaces'),
  phoneNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number must be  valid number',
    )
    .required('Phone number is required'),
});

export const createPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .trim('Can not contain trailing spaces')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

export const getStartedSterlingValidationSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Account number must be a valid number',
    )
    .matches(/^\d{10}$/, 'Account number must be 10 digits')
    .required('Account number is required'),
  bvn: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'BVN must be a valid number',
    )
    .matches(/^\d{11}$/, 'BVN must be 11 digits')
    .required('BVN is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .trim('Can not contain trailing spaces'),
});

export const getStartedValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .trim('Can not contain trailing spaces'),
  answer: Yup.string().required('Selct an answer'),
});

export const otpValidationSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    .min(6, ({min}) => `OTP must be at least ${min} numbers`),
});

export const businessValidationSchema = Yup.object().shape({
  businessName: Yup.string(),
  tin: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  nature: Yup.string(),
});

export const idCardValidationSchema = Yup.object().shape({
  category: Yup.string().required('Select a type'),
  docNumber: Yup.string().required('ID card number is required'),
  expiry: Yup.string().required('Select expiry date'),
  issue: Yup.string().required('Select issue date'),
});
