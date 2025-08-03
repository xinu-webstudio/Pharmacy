/**
 * Pharmacy Module
 * 
 * This module provides comprehensive pharmacy management functionality including:
 * - Medical Product Management
 * - Inventory Management
 * - Sales and Purchase Management
 * - POS (Point of Sale) System
 * - Medicine Request Management
 * - Pharmacy Billing and Reports
 * - Purchase Request and Quotation Management
 */

// Export constants
export { default as pharmacyConstants } from './constants';

// Export types
export * from './types';

// Export models
export * from './models';

// Export controllers
export * from './controllers';

// Export routes
export { default as pharmacyRoutes } from './routes';

// Export utilities
export * from './utilities';

// Main pharmacy module configuration
export const pharmacyModule = {
  name: 'Pharmacy Management System',
  version: '1.0.0',
  description: 'Comprehensive pharmacy management module for hospital management system',
  
  // Module capabilities
  capabilities: [
    'Medical Product Management',
    'Inventory Tracking',
    'Stock Management',
    'Sales and Purchase Management',
    'POS System',
    'Medicine Request Processing',
    'Prescription Management',
    'Billing and Invoicing',
    'Reports and Analytics',
    'Purchase Request Management',
    'Quotation Management',
    'Stock Alerts and Notifications',
    'Expiry Management',
    'Profit Analysis'
  ],
  
  // Module endpoints
  endpoints: {
    medicalProducts: '/pharmacy/medicalproduct',
    inventory: '/pharmacy/medicalInventory',
    salesPurchase: '/pharmacy/salePurchase',
    pos: '/pharmacy/pos',
    medicineRequests: '/pharmacy/medicine-request',
    purchaseRequests: '/pharmacy/purchase-request',
    quotations: '/pharmacy/quotation',
  },
  
  // Module permissions
  permissions: {
    modules: {
      Dashboard: 10001,
      Patient: 10002,
      ShiftManagement: 10009,
      Attendance: 10014,
      POS: 10060,
      MedicineRequest: 10061,
      FinanceSection: 10062,
    },
    submodules: {
      OutPatient: 10003,
      InPatient: 10004,
      MyShift: 10013,
      FinancialInvoice: 10066,
    },
    operations: {
      PharmacyExpense: 10063,
      PharmacySales: 10064,
      PharmacyReport: 10065,
    }
  }
};

// Convenience exports for commonly used functionality
export const {
  // Models
  MedicalProductsModel,
  MedicalProductInventoryModel,
  SalesAndPurchaseModel,
  POSTransactionModel,
  MedicineRequestModel,
  PurchaseRequestModel,
  QuotationOrderModel,
  StockMovementModel,
  PrescriptionModel,
  
  // Controllers
  medicalProductController,
  medicalInventoryController,
  salePurchaseController,
  posController,
  medicineRequestController,
  
  // Utilities
  updateInventoryStock,
  checkStockAvailability,
  getLowStockAlerts,
  getExpiryAlerts,
  calculateBillTotals,
  validateBillItems,
  generateInvoiceNumber,
  getSalesSummary,
  calculateProfitMargins,
} = {} as any; // This will be properly typed when imported

// Default export
export default {
  ...pharmacyModule,
  constants: pharmacyConstants,
  routes: pharmacyRoutes,
};
