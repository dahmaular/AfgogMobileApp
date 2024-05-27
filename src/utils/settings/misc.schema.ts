import * as yup from 'yup';

export const pinConfirmation = yup.object().shape({
  pin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter PIN'),
});
