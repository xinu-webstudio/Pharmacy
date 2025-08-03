// Export all pharmacy controllers
export * from './medicalProductInventory.controller';
export * from './salesPurchase.controller';
export * from './pos.controller';
export * from './medicineRequest.controller';

// Re-export commonly used controllers for convenience
export { medicalProductController, medicalInventoryController } from './medicalProductInventory.controller';
export { salePurchaseController } from './salesPurchase.controller';
export { posController } from './pos.controller';
export { medicineRequestController } from './medicineRequest.controller';
