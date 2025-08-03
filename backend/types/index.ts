// Export all pharmacy types
export * from './medicalProductInventory.types';
export * from './pharmacy.types';

// Re-export commonly used types for convenience
export type {
  IMedicalProductInventory,
  ISaleAndPurchase,
  IProductList,
  IMEDICALPRODUCTS,
  IDrug,
  IMedicalSupplies,
  IDeviceSchema,
  IBeautyAndSkinCare,
  ILabtestEqipments,
  IOther
} from './medicalProductInventory.types';

export type {
  IPOSTransaction,
  IPOSItem,
  IMedicineRequest,
  IMedicationRequest,
  IPurchaseRequest,
  IPurchaseRequestItem,
  IQuotationOrder,
  IQuotationItem,
  IStockAlert,
  IStockMovement,
  IPharmacyReport,
  IPrescription,
  IPrescriptionMedication
} from './pharmacy.types';
