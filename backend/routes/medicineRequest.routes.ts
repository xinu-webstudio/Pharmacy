import { Router } from "express";
import { medicineRequestController } from "../controllers/medicineRequest.controller";
import authMiddleware from "../../api/middleware/auth.middleware";
import createControllerRoutes from "../../api/utilities/createControllerRoute";
import pharmacyConstants from "../constants";
import mainConstants from "../../api/constants";
import { checkPermission } from "../../api/middleware/permission.middleware";

const { PERMISSIONMODULES, PERMISSIONSUBMODULES } = mainConstants;
const router = Router();

// Medicine Request Routes
const medicineRequestRoute = createControllerRoutes("/medicine-request", medicineRequestController, {
  getAll: [authMiddleware.authenticate],
  getById: [authMiddleware.authenticate],
  create: [authMiddleware.authenticate],
  update: [authMiddleware.authenticate],
  delete: [authMiddleware.authenticate],
});

// Additional Medicine Request specific routes
router.put("/medicine-request/:id/approve", 
  authMiddleware.authenticate,
  medicineRequestController.approve
);

router.put("/medicine-request/:id/reject", 
  authMiddleware.authenticate,
  medicineRequestController.reject
);

router.put("/medicine-request/:id/dispense", 
  authMiddleware.authenticate,
  medicineRequestController.dispense
);

router.use(medicineRequestRoute);

export default router;
