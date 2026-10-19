export const getFlagUrl = (iso2?: string | null): string | null => {
  if (!iso2) return null;

  return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
};
