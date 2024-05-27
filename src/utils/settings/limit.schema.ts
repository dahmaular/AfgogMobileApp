import * as yup from 'yup';

export const transferLimitSchema = yup.object().shape({
  limitFor: yup.string().required('Select the limit type'),
  limit: yup.string().required('Enter transfer limit'),
  pin: yup
    .string()
    .matches(/^\d{4}$/, 'PIN must be exactly 4 digits')
    .required('Enter PIN'),
});
