import { Router, RequestHandler } from 'express';

interface ControllerMethods {
  getAll?: RequestHandler;
  getById?: RequestHandler;
  create?: RequestHandler;
  update?: RequestHandler;
  delete?: RequestHandler;
  [key: string]: RequestHandler | undefined;
}

interface MiddlewareConfig {
  getAll?: RequestHandler[];
  getById?: RequestHandler[];
  create?: RequestHandler[];
  update?: RequestHandler[];
  delete?: RequestHandler[];
  [key: string]: RequestHandler[] | undefined;
}

/**
 * Create standardized CRUD routes for a controller
 * @param basePath - Base path for the routes (e.g., '/users')
 * @param controller - Controller object with CRUD methods
 * @param middleware - Optional middleware configuration for each route
 * @returns Express Router with configured routes
 */
const createControllerRoutes = (
  basePath: string,
  controller: ControllerMethods,
  middleware: MiddlewareConfig = {}
): Router => {
  const router = Router();

  // GET all items
  if (controller.getAll) {
    const middlewares = middleware.getAll || [];
    router.get(basePath, ...middlewares, controller.getAll);
  }

  // GET item by ID
  if (controller.getById) {
    const middlewares = middleware.getById || [];
    router.get(`${basePath}/:id`, ...middlewares, controller.getById);
  }

  // POST create new item
  if (controller.create) {
    const middlewares = middleware.create || [];
    router.post(basePath, ...middlewares, controller.create);
  }

  // PUT update item by ID
  if (controller.update) {
    const middlewares = middleware.update || [];
    router.put(`${basePath}/:id`, ...middlewares, controller.update);
  }

  // DELETE item by ID
  if (controller.delete) {
    const middlewares = middleware.delete || [];
    router.delete(`${basePath}/:id`, ...middlewares, controller.delete);
  }

  // Add any custom methods
  Object.keys(controller).forEach(methodName => {
    if (!['getAll', 'getById', 'create', 'update', 'delete'].includes(methodName)) {
      const method = controller[methodName];
      if (method) {
        const middlewares = middleware[methodName] || [];
        
        // Determine HTTP method based on method name
        if (methodName.startsWith('get') || methodName.startsWith('find') || methodName.startsWith('search')) {
          router.get(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        } else if (methodName.startsWith('post') || methodName.startsWith('create') || methodName.startsWith('add')) {
          router.post(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        } else if (methodName.startsWith('put') || methodName.startsWith('update') || methodName.startsWith('edit')) {
          router.put(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        } else if (methodName.startsWith('patch')) {
          router.patch(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        } else if (methodName.startsWith('delete') || methodName.startsWith('remove')) {
          router.delete(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        } else {
          // Default to POST for unknown methods
          router.post(`${basePath}/${methodName.toLowerCase()}`, ...middlewares, method);
        }
      }
    }
  });

  return router;
};

/**
 * Create routes with custom path patterns
 * @param routes - Array of route configurations
 * @returns Express Router with configured routes
 */
export const createCustomRoutes = (routes: Array<{
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  path: string;
  handler: RequestHandler;
  middleware?: RequestHandler[];
}>): Router => {
  const router = Router();

  routes.forEach(({ method, path, handler, middleware = [] }) => {
    router[method](path, ...middleware, handler);
  });

  return router;
};

/**
 * Create nested resource routes
 * @param parentPath - Parent resource path (e.g., '/users')
 * @param childPath - Child resource path (e.g., '/posts')
 * @param controller - Controller object with methods
 * @param middleware - Optional middleware configuration
 * @returns Express Router with nested routes
 */
export const createNestedRoutes = (
  parentPath: string,
  childPath: string,
  controller: ControllerMethods,
  middleware: MiddlewareConfig = {}
): Router => {
  const router = Router();
  const fullPath = `${parentPath}/:parentId${childPath}`;

  // GET all child items for parent
  if (controller.getAll) {
    const middlewares = middleware.getAll || [];
    router.get(fullPath, ...middlewares, controller.getAll);
  }

  // GET specific child item
  if (controller.getById) {
    const middlewares = middleware.getById || [];
    router.get(`${fullPath}/:id`, ...middlewares, controller.getById);
  }

  // POST create new child item for parent
  if (controller.create) {
    const middlewares = middleware.create || [];
    router.post(fullPath, ...middlewares, controller.create);
  }

  // PUT update child item
  if (controller.update) {
    const middlewares = middleware.update || [];
    router.put(`${fullPath}/:id`, ...middlewares, controller.update);
  }

  // DELETE child item
  if (controller.delete) {
    const middlewares = middleware.delete || [];
    router.delete(`${fullPath}/:id`, ...middlewares, controller.delete);
  }

  return router;
};

export default createControllerRoutes;
