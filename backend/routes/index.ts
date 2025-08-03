import { Router } from "express";
import medicalProductInventoryRoutes from "./medicalProductInventory.routes";
import posRoutes from "./pos.routes";
import medicineRequestRoutes from "./medicineRequest.routes";

const router = Router();

// Mount all pharmacy routes
router.use("/pharmacy", medicalProductInventoryRoutes);
router.use("/pharmacy", posRoutes);
router.use("/pharmacy", medicineRequestRoutes);

export default router;

// Export individual route modules for flexibility
export {
  medicalProductInventoryRoutes,
  posRoutes,
  medicineRequestRoutes
};
