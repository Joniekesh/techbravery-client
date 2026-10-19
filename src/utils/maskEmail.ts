export const maskEmail = (email: string): string => {
  if (!email || !email.includes("@")) return "";

  const [username, domain] = email.split("@");

  // Keep only first letter of username
  const firstLetter = username.charAt(0);

  // Always show ".com" if present
  const maskedDomain = domain.endsWith(".com")
    ? domain.replace(/^[^.]+/, "****")
    : "****.com";

  return `${firstLetter}****@${maskedDomain}`;
};
