// Export all pharmacy utilities
export * from './inventoryHelpers';
export * from './billingHelpers';

// Re-export commonly used utilities for convenience
export {
  updateInventoryStock,
  checkStockAvailability,
  getLowStockAlerts,
  getExpiryAlerts,
  calculateInventoryValue,
  getInventoryTurnover
} from './inventoryHelpers';

export {
  calculateBillTotals,
  validateBillItems,
  generateInvoiceNumber,
  calculateInsuranceCoverage,
  applyDiscountRules,
  getSalesSummary,
  calculateProfitMargins
} from './billingHelpers';
