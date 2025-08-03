// Export all pharmacy models
export * from './medicalProductInventory.model';
export * from './pharmacy.model';

// Re-export commonly used models for convenience
export {
  MedicalProductsModel,
  MedicalProductInventoryModel,
  SalesAndPurchaseModel
} from './medicalProductInventory.model';

export {
  POSTransactionModel,
  MedicineRequestModel,
  PurchaseRequestModel,
  QuotationOrderModel,
  StockMovementModel,
  PrescriptionModel
} from './pharmacy.model';
