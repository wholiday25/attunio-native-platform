/**
 * API Error Handler
 * Centralized error handling for API requests
 */

export class ApiError extends Error {
  statusCode?: number;
  data?: any;

  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const handleApiError = (error: any): string => {
  if (error.response) {
    // Server responded with error
    const status = error.response.status;
    const message = error.response.data?.message || error.message;

    switch (status) {
      case 400:
        return `Bad request: ${message}`;
      case 401:
        return 'Authentication failed. Please log in again.';
      case 403:
        return 'Access denied. You do not have permission for this action.';
      case 404:
        return 'Resource not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return message || 'An unexpected error occurred.';
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your internet connection.';
  } else {
    // Something else went wrong
    return error.message || 'An unexpected error occurred.';
  }
};

export const logError = (error: Error, context?: string) => {
  if (__DEV__) {
    console.error(`[${context || 'Error'}]:`, error);
  }
  // TODO: In production, send to error tracking service (Sentry, Bugsnag, etc.)
};
