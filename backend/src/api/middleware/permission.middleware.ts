import { Request, Response, NextFunction } from 'express';
import { formatErrorResponse } from '../utilities/formatRes';

/**
 * Permission-based authorization middleware
 */
export const checkPermission = (requiredPermissions: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return formatErrorResponse(res, 'Access denied. Authentication required.', null, 401);
      }

      // For now, we'll implement a basic permission check
      // In a real application, you would check against user permissions from database
      const userPermissions = req.user.permissions || [];
      
      // Check if user has any of the required permissions
      const hasPermission = requiredPermissions.some(permission => 
        userPermissions.includes(permission)
      );

      if (!hasPermission && req.user.role !== 'ADMIN') {
        return formatErrorResponse(
          res, 
          'Access denied. Insufficient permissions.', 
          { requiredPermissions }, 
          403
        );
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      return formatErrorResponse(res, 'Permission check failed', error, 500);
    }
  };
};

/**
 * Module permission check
 */
export const checkModulePermission = (moduleId: number) => {
  return checkPermission([moduleId]);
};

/**
 * Multiple permissions check (user must have ALL permissions)
 */
export const checkAllPermissions = (requiredPermissions: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return formatErrorResponse(res, 'Access denied. Authentication required.', null, 401);
      }

      const userPermissions = req.user.permissions || [];
      
      // Check if user has ALL required permissions
      const hasAllPermissions = requiredPermissions.every(permission => 
        userPermissions.includes(permission)
      );

      if (!hasAllPermissions && req.user.role !== 'ADMIN') {
        return formatErrorResponse(
          res, 
          'Access denied. Missing required permissions.', 
          { requiredPermissions }, 
          403
        );
      }

      next();
    } catch (error) {
      console.error('Permission middleware error:', error);
      return formatErrorResponse(res, 'Permission check failed', error, 500);
    }
  };
};

/**
 * Owner or admin check - allows access if user owns the resource or is admin
 */
export const checkOwnershipOrAdmin = (resourceUserIdField: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return formatErrorResponse(res, 'Access denied. Authentication required.', null, 401);
      }

      // Admin can access everything
      if (req.user.role === 'ADMIN') {
        return next();
      }

      // Check if user owns the resource
      const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
      
      if (resourceUserId && resourceUserId === req.user.id) {
        return next();
      }

      return formatErrorResponse(
        res, 
        'Access denied. You can only access your own resources.', 
        null, 
        403
      );
    } catch (error) {
      console.error('Ownership middleware error:', error);
      return formatErrorResponse(res, 'Ownership check failed', error, 500);
    }
  };
};
