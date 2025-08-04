// Main application constants

export const DB = {
  // User and authentication
  USER: 'user',
  USERFULL: 'user-full',
  TOKEN: 'token',
  
  // Hospital and departments
  HOSPITAL: 'hospital',
  DEPARTMENT: 'department',
  DEPARTMENTCATEGORY: 'department-cat',
  DEPARTMENTSUBCAT: 'depa-subcat',
  
  // Medical and pharmacy
  MEDICALPRODUCT: 'medicalproduct',
  MEDICALPRODUCTINVENTORY: 'medicalInventory',
  SALEPURCHASE: 'salepurchase',
  
  // Financial
  BANK: 'bank',
  BANKTRANSACTION: 'banktransaction',
  FINANCIALTRANSACTION: 'financialtransaction',
  MASTERINVOICE: 'invoice',
  
  // Inventory and stores
  STORE: 'store',
  INVENTORY: 'inventory',
  
  // Other entities
  PATIENT: 'patient',
  APPOINTMENT: 'appointment',
  SHIFT: 'shift',
  ATTENDANCE: 'attendance',
  PERMISSION: 'permission',
};

export const PACKAGINGENUM = {
  BOX: 'BOX',
  BOTTLE: 'BOTTLE',
  STRIP: 'STRIP',
  VIAL: 'VIAL',
  TUBE: 'TUBE',
  SACHET: 'SACHET',
  AMPOULE: 'AMPOULE',
  OTHER: 'OTHER',
};

export const FORMENUM = {
  TABLET: 'TABLET',
  CAPSULE: 'CAPSULE',
  INJECTION: 'INJECTION',
  LIQUID: 'LIQUID',
  SYRUP: 'SYRUP',
  CREAM: 'CREAM',
  OINTMENT: 'OINTMENT',
  GEL: 'GEL',
  POWDER: 'POWDER',
  DROPS: 'DROPS',
  INHALER: 'INHALER',
  SPRAY: 'SPRAY',
  OTHER: 'OTHER',
};

export const ROUTEENUM = {
  ORAL: 'ORAL',
  INJECTION: 'INJECTION',
  TOPICAL: 'TOPICAL',
  INHALATION: 'INHALATION',
  SUBLINGUAL: 'SUBLINGUAL',
  RECTAL: 'RECTAL',
  VAGINAL: 'VAGINAL',
  OPHTHALMIC: 'OPHTHALMIC',
  OTIC: 'OTIC',
  NASAL: 'NASAL',
  OTHER: 'OTHER',
};

export const PAYMENTMETHOD = {
  CASH: 'CASH',
  CARD: 'CARD',
  BANK: 'BANK',
  CHEQUE: 'CHEQUE',
  ONLINE: 'ONLINE',
  UPI: 'UPI',
  WALLET: 'WALLET',
  CREDIT: 'CREDIT',
};

export const PAYMENTSTATUS = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  PARTIALLY_PAID: 'PARTIALLY-PAID',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
};

export const INVENTORYSTATUS = {
  IN_STOCK: 'IN-STOCK',
  LOW_STOCK: 'LOW-STOCK',
  OUT_OF_STOCK: 'OUT-OF-STOCK',
  EXPIRED: 'EXPIRED',
  NEAR_EXPIRY: 'NEAR-EXPIRY',
};

export const TRANSACTIONTYPE = {
  PURCHASE: 'PURCHASE',
  SALE: 'SALE',
  RETURN: 'RETURN',
  ADJUSTMENT: 'ADJUSTMENT',
  TRANSFER: 'TRANSFER',
  DAMAGE: 'DAMAGE',
  EXPIRED: 'EXPIRED',
};

export const PRODUCTCATEGORY = {
  DRUG: 'DRUG',
  DEVICES: 'DEVICES',
  BEAUTIESSKINCARE: 'BEAUTIES-SKINCARE',
  MEDICALSUPPLIES: 'MEDICAL-SUPPLIES',
  LABTEST: 'LAB-TEST',
  OTHER: 'OTHER',
};

export const PERMISSIONMODULES = {
  Dashboard: 10001,
  Patient: 10002,
  ShiftManagement: 10009,
  Attendance: 10014,
  POS: 10060,
  MedicineRequest: 10061,
  FinanceSection: 10062,
};

export const PERMISSIONSUBMODULES = {
  OutPatient: 10003,
  InPatient: 10004,
  MyShift: 10013,
  FinancialInvoice: 10066,
};

export const USERROLES = {
  ADMIN: 'ADMIN',
  PHARMACIST: 'PHARMACIST',
  DOCTOR: 'DOCTOR',
  NURSE: 'NURSE',
  RECEPTIONIST: 'RECEPTIONIST',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
};

export const ORDERSTATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED',
};

export default {
  DB,
  PACKAGINGENUM,
  FORMENUM,
  ROUTEENUM,
  PAYMENTMETHOD,
  PAYMENTSTATUS,
  INVENTORYSTATUS,
  TRANSACTIONTYPE,
  PRODUCTCATEGORY,
  PERMISSIONMODULES,
  PERMISSIONSUBMODULES,
  USERROLES,
  ORDERSTATUS,
};
