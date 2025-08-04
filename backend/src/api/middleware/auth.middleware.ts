import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { formatErrorResponse } from '../utilities/formatRes';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}

/**
 * Authentication middleware
 */
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.cookies?.token ||
                  req.header('x-auth-token');

    if (!token) {
      return formatErrorResponse(res, 'Access denied. No token provided.', null, 401);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined in environment variables');
      return formatErrorResponse(res, 'Server configuration error', null, 500);
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      req.user = decoded;
      next();
    } catch (jwtError) {
      return formatErrorResponse(res, 'Invalid token', null, 401);
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return formatErrorResponse(res, 'Authentication failed', error, 500);
  }
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.cookies?.token ||
                  req.header('x-auth-token');

    if (!token) {
      return next();
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, jwtSecret) as any;
      req.user = decoded;
    } catch (jwtError) {
      // Ignore invalid token in optional auth
    }
    
    next();
  } catch (error) {
    console.error('Optional authentication middleware error:', error);
    next();
  }
};

/**
 * Role-based authorization middleware
 */
const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return formatErrorResponse(res, 'Access denied. Authentication required.', null, 401);
    }

    if (!roles.includes(req.user.role)) {
      return formatErrorResponse(res, 'Access denied. Insufficient permissions.', null, 403);
    }

    next();
  };
};

/**
 * Admin only middleware
 */
const adminOnly = authorize(['ADMIN']);

/**
 * Pharmacist or Admin middleware
 */
const pharmacistOrAdmin = authorize(['PHARMACIST', 'ADMIN']);

/**
 * Staff or higher middleware
 */
const staffOrHigher = authorize(['STAFF', 'PHARMACIST', 'MANAGER', 'ADMIN']);

export default {
  authenticate,
  optionalAuthenticate,
  authorize,
  adminOnly,
  pharmacistOrAdmin,
  staffOrHigher,
};
