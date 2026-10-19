export const formatNumber = (num: number) => {
  if (num === null || num === undefined) return "0.00";

  const sign = num < 0 ? "-" : "";
  num = Math.abs(num);

  if (num >= 1.0e12) {
    return sign + (num / 1.0e12).toFixed(2) + "T"; // Trillion
  } else if (num >= 1.0e9) {
    return sign + (num / 1.0e9).toFixed(2) + "B"; // Billion
  } else if (num >= 1.0e6) {
    return sign + (num / 1.0e6).toFixed(2) + "M"; // Million
  } else {
    // Below 1M → commas + 2 decimals
    return (
      sign +
      num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
};
