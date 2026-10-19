export const toDateInputValue = (value?: string | null): string => {
  if (!value) {
    return "";
  }

  /*
   * Handles:
   * 1990-10-10
   * 1990-10-10T00:00:00.000Z
   */
  return value.slice(0, 10);
};

export const formatDate = (value?: string | null): string => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export const formatDateTime = (value?: string | null): string => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const formatDocumentType = (value?: string | null): string => {
  if (!value) {
    return "Not provided";
  }

  return value
    .replace(/ /g, "")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const formatKycStatus = (value?: string | null): string => {
  if (!value) {
    return "Not started";
  }

  return value
    .replace(/ /g, "")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

export const isValidDateString = (value: string) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime());
};

export const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const getText = (value: unknown): string => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return "";
};

export const displayValue = (value: unknown): string => {
  const text = getText(value);
  return text || "Not provided";
};

export const humanize = (value: unknown): string => {
  const text = getText(value);
  if (!text) return "Not provided";

  return text
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
};

// const formatDate = (value: unknown): string => {
//   const text = getText(value);
//   if (!text) return "Not provided";

//   const date = new Date(text);
//   if (Number.isNaN(date.getTime())) return text;

//   return new Intl.DateTimeFormat(undefined, {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     timeZone: "UTC",
//   }).format(date);
// };

export const formatSize = (value: unknown): string => {
  const size = Number(value);
  if (!Number.isFinite(size) || size < 0) return "";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const formatInvestmentAmount = (
  value: unknown,
  currency?: {
    iso?: string;
    code?: string;
    symbol?: string;
  },
): string => {
  const rawAmount = getText(value).replace(/,/g, "");

  if (!rawAmount) return "Not provided";

  const amount = Number(rawAmount);

  if (!Number.isFinite(amount) || amount < 0) {
    return "Invalid amount";
  }

  const currencyCode = getText(currency?.iso || currency?.code).toUpperCase();

  if (currencyCode) {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch {
      // Fall back to a numeric display if the currency code is invalid.
    }
  }

  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return currency?.symbol
    ? `${currency.symbol}${formattedAmount}`
    : formattedAmount;
};
