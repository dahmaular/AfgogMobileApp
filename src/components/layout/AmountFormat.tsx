export const FormatAmount = (
  number: number,
  symbol: string | null = null,
): string => {
  const newNumber = !number ? 0 : number;
  if (symbol) {
    return symbol + newNumber.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
  }
  return newNumber.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
};
