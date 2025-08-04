import { Router } from "express";
import {
  medicalInventoryController,
  medicalProductController,
} from "../controllers/medicalProductInventory.controller";
import { salePurchaseController } from "../controllers/salesPurchase.controller";
import authMiddleware from "../src/api/middleware/auth.middleware";
import createControllerRoutes from "../src/api/utilities/createControllerRoute";
import pharmacyConstants from "../constants";
import mainConstants from "../src/api/constants";
import { checkPermission } from "../src/api/middleware/permission.middleware";

const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = mainConstants;
const router = Router();

// Medical Inventory Routes
const medicalInventoryRoute = createControllerRoutes(
  "/medicalInventory",
  medicalInventoryController,
  {
    getAll: [authMiddleware.authenticate],
    getById: [authMiddleware.authenticate],
    create: [authMiddleware.authenticate],
    update: [authMiddleware.authenticate],
    delete: [authMiddleware.authenticate],
  }
);

// Sale Purchase Routes
const salePurchaseRoute = createControllerRoutes(
  "/salePurchase",
  salePurchaseController,
  {
    getAll: [authMiddleware.authenticate],
    getById: [authMiddleware.authenticate],
    create: [authMiddleware.authenticate],
    update: [authMiddleware.authenticate],
    delete: [authMiddleware.authenticate],
  }
);

// Medical Product Routes
const medicalProductRoute = createControllerRoutes(
  "/medicalproduct",
  medicalProductController,
  {
    getAll: [authMiddleware.authenticate],
    getById: [authMiddleware.authenticate],
    create: [authMiddleware.authenticate],
    update: [authMiddleware.authenticate],
    delete: [authMiddleware.authenticate],
  }
);

router.use(medicalInventoryRoute);
router.use(salePurchaseRoute);
router.use(medicalProductRoute);

export default router;
