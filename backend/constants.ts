// Pharmacy Module Constants

export const PHARMACY_DB = {
  // pharmacy database collections
  MEDICALPRODUCT: 'medicalproduct',
  MEDICALPRODUCTINVENTORY: 'medicalproductinventory',
  SALEPURCHASE: 'salepurchase',
  PRODUCTPURCHASEREQUEST: 'purchaseRequest',
  MASTERINVOICE: 'invoice',
  PRODUCTQUOTATIONORDER: 'quotationorder',
};

export const PHARMACY_NOTIFICATIONS = {
  // pharmacy management notifications
  MEDICINEPICKUP: 'MEDICINEPICKUP',
  MEDICINEREQUEST: 'MEDICINEREQUEST',
  PRESCRIPTIONEXPIRED: 'PRESCRIPTIONEXPIRED',
  STOCKUNAVAILABLE: 'STOCKUNAVAILABLE',
  MEDICATIONREMINDER: 'MEDICATIONREMINDER',
};

export const PHARMACY_ENUMS = {
  FORMENUM: [
    'TABLET',
    'INJECTION',
    'LIQUID',
    'CREAM',
    'GEL',
    'OINTMENT',
    'DROPS',
    'SPRAY',
    'INHALER',
    'PATCH',
    'SUPPOSITORY',
    'POWDER',
    'CAPSULE',
    'SYRUP',
    'SUSPENSION',
    'EMULSION',
    'LOTION',
    'SOLUTION',
    'TINCTURE',
    'EXTRACT',
    'GRANULES',
    'PELLETS',
    'IMPLANT',
    'DEVICE',
    'KIT',
    'OTHER'
  ],
  
  PAYMENTMETHOD: ['CASH', 'BANK', 'CHEQUE'],
  PAYMENTSTATUS: ['PENDING', 'PAID', 'PARTIALLY-PAID', 'REJECTED'],
  
  PRESCRIPTIONENUM: [
    'PENDING',
    'COMPLETED',
    'REJECTED',
    'EXPIRED',
    'CANCELLED'
  ],
  
  INVENTORY_CATEGORY: [
    'DRUG',
    'MEDICAL_SUPPLIES',
    'DEVICE',
    'PERSONAL_CARE',
    'LIFESTYLE_PRODUCT',
    'BEAUTY_SKIN_CARE',
    'LAB_TEST_EQUIPMENT',
    'OTHER'
  ],
  
  PRODUCT_STATUS: [
    'ACTIVE',
    'INACTIVE',
    'DISCONTINUED',
    'OUT_OF_STOCK',
    'LOW_STOCK'
  ],
  
  TRANSACTION_TYPE: [
    'SALE',
    'PURCHASE',
    'RETURN',
    'ADJUSTMENT',
    'TRANSFER'
  ]
};

export const PHARMACY_MODULES = {
  // pharmacy module permissions
  PHARMACISTMODULES: {
    Dashboard: 10001,
    Patient: 10002,
    ShiftManagement: 10009,
    Attendance: 10014,
    POS: 10060,
    MedicineRequest: 10061,
    FinanceSection: 10062,
  },

  PHARMACYSUBMODULES: {
    OutPatient: 10003,
    InPatient: 10004,
    MyShift: 10013,
    FinancialInvoice: 10066,
  },
};

export const PHARMACY_PERMISSIONS = {
  // Pharmacy submodules
  PharmacyExpense: 10063,
  PharmacySales: 10064,
  PharmacyReport: 10065,
  
  // Main modules
  POS: 10060,
  MedicineRequest: 10061,
  FinanceSection: 10062,
};

export const PHARMACY_PERMISSION_MAPPING = {
  10060: [], // Pharmacy - POS
  10061: [], // Pharmacy - Medicine Request
  10062: [10063, 10064, 10065], // Finance - Expenses, Sales, Reports
};

export const PHARMACY_ROUTES = {
  MEDICAL_INVENTORY: '/medicalInventory',
  SALE_PURCHASE: '/salePurchase',
  MEDICAL_PRODUCT: '/medicalproduct',
  PURCHASE_REQUEST: '/purchase-request',
  QUOTATION: '/quotation',
  POS: '/pos',
  MEDICINE_REQUEST: '/medicine-request',
  PHARMACY_REPORTS: '/pharmacy-reports',
};

export default {
  DB: PHARMACY_DB,
  NOTIFICATIONS: PHARMACY_NOTIFICATIONS,
  ENUMS: PHARMACY_ENUMS,
  MODULES: PHARMACY_MODULES,
  PERMISSIONS: PHARMACY_PERMISSIONS,
  PERMISSION_MAPPING: PHARMACY_PERMISSION_MAPPING,
  ROUTES: PHARMACY_ROUTES,
};
