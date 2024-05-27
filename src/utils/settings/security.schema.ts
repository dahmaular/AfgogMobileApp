import * as yup from 'yup';
export const securityQuestionSchema = yup.object().shape({
  question1: yup.string().required('Choose question 1'),
  answer1: yup
    .string()
    .required('Provide answer to question one')
    .min(3, 'Answer too short')
    .max(50, 'Answer too long'),
  question2: yup.string().required('Choose question two'),
  answer2: yup
    .string()
    .required('Provide answer to question two')
    .min(3, 'Answer too short')
    .max(50, 'Answer too long'),
  question3: yup.string().required('Choose question three'),
  answer3: yup
    .string()
    .required('Provide answer to question three')
    .min(3, 'Answer too short')
    .max(50, 'Answer too long'),
  pin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter PIN'),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, 'Should not be less than 8 characters')
    .required('Enter old password'),
  newPassword: yup
    .string()
    .min(8, 'Should not be less than 8 characters')
    .required('Enter new password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Enter confirm password'),
});

export const changePinSchema = yup.object().shape({
  oldPin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter old PIN'),
  newPin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter new PIN'),
  confirmPin: yup
    .string()
    .oneOf([yup.ref('newPin'), null], 'PINs must match')
    .required('PIN is required'),
});
export const resetPinSchema = yup.object().shape({
  newPin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter new PIN'),
  confirmPin: yup
    .string()
    .oneOf([yup.ref('newPin'), null], 'PINs must match')
    .required('PIN is required'),
});
