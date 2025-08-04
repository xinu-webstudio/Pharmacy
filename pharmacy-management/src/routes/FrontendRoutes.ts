export const FrontendRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",

  // Pharmacy Management
  PRESCRIPTIONS: "/prescriptions",
  ADD_PRESCRIPTIONS: "/prescriptions/add",

  // Inventory Management
  INVENTORY: "/inventory",
  INVENTORYCATEGORYLIST: "/inventory/categories",
  INVENTORYSUBCATEGORYLIST: "/inventory/subcategories",
  ADDCATEGORY: "/inventory/add-category",
  ADDSUBCATEGORY: "/inventory/add-subcategory",

  // Financial Operations
  PHARMACY_INVOICE: "/invoice",
  PHARMACY_PAYMENT: "/payment",
  ADD_PHARMACY_INVOICE: "/invoice/add",
  ADD_PHARMACY_PAYMENT: "/payment/add",

  // Medicine Management
  MEDICINE_LIST: "/medicines",
  ADD_MEDICINE: "/medicines/add",
  ADDPURCHASE: "/medicines/add", // Alias for compatibility
  MEDICINE_CATEGORIES: "/medicines/categories",

  // Reports
  SALES_REPORT: "/reports/sales",
  INVENTORY_REPORT: "/reports/inventory",
  PRESCRIPTION_REPORT: "/reports/prescriptions",

  // Settings
  SETTINGS: "/settings",
  USER_MANAGEMENT: "/settings/users",
  PHARMACY_CONFIG: "/settings/pharmacy-config",
};
