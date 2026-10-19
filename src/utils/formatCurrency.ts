export const formatCurrency = (value: number | string): string => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0.00";

  const fixed = num.toFixed(2);
  const [intPart, decimalPart] = fixed.split(".");

  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${withCommas}.${decimalPart}`;
};
