export const getErrorMessage = (error: unknown): string => {
  const fallback = "An unexpected error occurred. Please try again.";

  if (!error) {
    return fallback;
  }

  // Handle Axios errors
  if (typeof error === "object" && error !== null && "isAxiosError" in error) {
    const axiosError = error as {
      message?: string;
      response?: {
        status?: number;
        statusText?: string;
        data?:
          | {
              message?: unknown;
              error?: unknown;
              errors?: unknown;
            }
          | string;
      };
      code?: string;
    };

    const response = axiosError.response;
    const data = response?.data;

    // Network or connection errors
    if (!response) {
      if (axiosError.code === "ECONNABORTED") {
        return "The request timed out. Please try again.";
      }

      return "Unable to connect to the server. Check your internet connection and try again.";
    }

    // Handle string response bodies
    if (typeof data === "string" && data.trim()) {
      return data;
    }

    if (data && typeof data === "object") {
      // NestJS validation errors can be an array of messages
      if (Array.isArray(data.message) && data.message.length > 0) {
        return data.message
          .map((item) =>
            typeof item === "string" ? item : JSON.stringify(item),
          )
          .join(", ");
      }

      // Standard NestJS error response
      if (typeof data.message === "string" && data.message.trim()) {
        return data.message;
      }

      // Alternative API error format
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const firstError = data.errors[0];

        if (typeof firstError === "string") {
          return firstError;
        }

        if (firstError && typeof firstError.message === "string") {
          return firstError.message;
        }
      }

      if (typeof data.error === "string" && data.error.trim()) {
        return data.error;
      }
    }

    return response.statusText || fallback;
  }

  // Handle ordinary JavaScript errors
  if (error instanceof Error && error.message) {
    return error.message;
  }

  // Handle plain objects that contain a message
  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;

    if (typeof message === "string" && message.trim()) {
      return message;
    }

    if (Array.isArray(message) && message.length > 0) {
      return message.join(", ");
    }
  }

  return fallback;
};
