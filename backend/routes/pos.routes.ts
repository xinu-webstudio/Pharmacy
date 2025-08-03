import { Router } from "express";
import { posController } from "../controllers/pos.controller";
import authMiddleware from "../../api/middleware/auth.middleware";
import createControllerRoutes from "../../api/utilities/createControllerRoute";
import pharmacyConstants from "../constants";
import mainConstants from "../../api/constants";
import { checkPermission } from "../../api/middleware/permission.middleware";

const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = mainConstants;
const router = Router();

// POS Routes
const posRoute = createControllerRoutes("/pos", posController, {
  getAll: [authMiddleware.authenticate],
  getById: [authMiddleware.authenticate],
  create: [authMiddleware.authenticate],
  update: [authMiddleware.authenticate],
});

// Additional POS specific routes
router.get("/pos/daily-summary", 
  authMiddleware.authenticate,
  posController.getDailySummary
);

router.use(posRoute);

export default router;
