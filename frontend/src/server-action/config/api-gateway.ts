import axios from 'axios';

// Configure base URL from environment variables
export const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}api/v1/en/`;
export const API_BASE_URL_EN = `${import.meta.env.VITE_API_LOCAL_URL}`;
// const network = 'http://192.168.1.112:8080/api/v1/en';
export const network = 'http://62.72.42.129:8100/api/v1/en';
//192.168.1.112:8080/api/v1/en

// Create an axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Reduced timeout from 100000ms to 30000ms (30 seconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Apply enhanced interceptors
// import { applyInterceptors } from '../interceptors/api-interceptors';
// applyInterceptors(apiClient);

// Store ongoing requests
const controllers = new Map<string, AbortController>();

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('_UPLFMMATRIX');

    // Only add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Cancel any previous request to the same endpoint
    if (config.url && controllers.has(config.url)) {
      controllers.get(config.url)?.abort();
      controllers.delete(config.url);
    }

    // Create a new AbortController and attach signal to request
    const controller = new AbortController();
    config.signal = controller.signal;
    if (config.url) controllers.set(config.url, controller);

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Remove completed requests from map
    if (response.config.url) {
      controllers.delete(response.config.url);
    }
    return response;
  },
  (error: any) => {
    // Handle unauthorized access
    if (error.response?.status === 401) {
      console.log(error);
      // localStorage.clear();
      // const redirectPath = encodeURIComponent(window.location.pathname);
      // window.location.href = `/auth-login?redirect=${redirectPath}`;
    }

    console.log(error, 'from interceptor');

    if (error.response?.data?.error) {
      const errorMessage = error?.response?.data?.error?.[0]?.message;

      return Promise.reject(errorMessage);
    }
    // If request was canceled, do not show error
    if (axios.isCancel(error as any)) {
      return Promise.resolve({ canceled: true });
    }

    // Format error message
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';

    return Promise.reject(errorMessage);
  }
);

// Optional: Add TypeScript interfaces
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

/**
 * Standardized API response utility function
 * @param data - The response data
 * @param message - Optional success message
 * @param success - Success status (defaults to true)
 * @returns Standardized ApiResponse object
 */
export const apiResponse = <T>(
  data: T,
  message?: string,
  success: boolean = true
): ApiResponse<T> => {
  return {
    data,
    message,
    success,
  };
};

/**
 * Standardized API error response utility function
 * @param message - Error message
 * @param data - Optional error data
 * @returns Standardized ApiResponse object with success: false
 */
export const apiErrorResponse = <T = null>(
  message: string,
  data: T = null as T
): ApiResponse<T> => {
  return {
    data,
    message,
    success: false,
  };
};

/**
 * Standardized paginated API response utility function
 * @param data - Array of data items
 * @param total - Total number of items
 * @param page - Current page number
 * @param limit - Items per page
 * @param message - Optional success message
 * @returns Standardized PaginatedResponse object
 */
export const apiPaginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
): PaginatedResponse<T> => {
  return {
    data,
    total,
    page,
    limit,
    message,
    success: true,
  };
};
