export const moneyFormat = (input: string): string => {
  const numericValue = input.replace(/\D/g, '');
  let formattedValue = numericValue.replace(/^0+/, '');
  if (formattedValue === '') {
    formattedValue = '00';
  }
  const integerPart = formattedValue.slice(0, -2);
  const decimalPart = formattedValue.slice(-2);
  formattedValue = `${
    integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || '0'
  }.${decimalPart}`;
  return formattedValue;
};
