import { Response } from 'express';

/**
 * Format and send API response
 * @param res - Express response object
 * @param statusCode - HTTP status code
 * @param success - Success flag
 * @param message - Response message
 * @param data - Response data (optional)
 * @param meta - Additional metadata (optional)
 */
export const formatResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any,
  meta?: any
) => {
  const response: any = {
    success,
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (meta !== undefined) {
    response.meta = meta;
  }

  // Add error details for non-success responses
  if (!success && data instanceof Error) {
    response.error = {
      name: data.name,
      message: data.message,
      ...(process.env.NODE_ENV === 'development' && { stack: data.stack }),
    };
    delete response.data;
  }

  return res.status(statusCode).json(response);
};

/**
 * Format success response
 */
export const formatSuccessResponse = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200
) => {
  return formatResponse(res, statusCode, true, message, data);
};

/**
 * Format error response
 */
export const formatErrorResponse = (
  res: Response,
  message: string,
  error?: any,
  statusCode: number = 500
) => {
  return formatResponse(res, statusCode, false, message, error);
};

/**
 * Format validation error response
 */
export const formatValidationErrorResponse = (
  res: Response,
  errors: any[],
  message: string = 'Validation failed'
) => {
  return formatResponse(res, 400, false, message, { errors });
};

/**
 * Format not found response
 */
export const formatNotFoundResponse = (
  res: Response,
  resource: string = 'Resource'
) => {
  return formatResponse(res, 404, false, `${resource} not found`);
};

/**
 * Format unauthorized response
 */
export const formatUnauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized access'
) => {
  return formatResponse(res, 401, false, message);
};

/**
 * Format forbidden response
 */
export const formatForbiddenResponse = (
  res: Response,
  message: string = 'Access forbidden'
) => {
  return formatResponse(res, 403, false, message);
};
