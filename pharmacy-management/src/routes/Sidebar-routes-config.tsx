import { FrontendRoutes } from "./FrontendRoutes";

export interface ISidebarDashboardRoutes {
  title: string;
  routes: {
    id: number;
    path: string;
    title: string;
    icon: string;
    children?: {
      path: string;
      id: number;
      title: string;
    }[];
  }[];
}

export const SidebarDashboardRoutes: ISidebarDashboardRoutes = {
  title: "Dashboard",
  routes: [
    {
      id: 1,
      path: FrontendRoutes.DASHBOARD,
      title: "Dashboard",
      icon: "material-symbols:dashboard-outline",
    },
  ],
};

export const SidebarPharmacyRoutes: ISidebarDashboardRoutes = {
  title: "Pharmacy",
  routes: [
    {
      id: 2,
      path: "#",
      title: "Prescriptions",
      icon: "streamline:pharmacy",
      children: [
        {
          path: FrontendRoutes.PRESCRIPTIONS,
          title: "Prescription List",
          id: 21,
        },
        {
          path: FrontendRoutes.ADD_PRESCRIPTIONS,
          title: "Add Prescription",
          id: 22,
        },
      ],
    },
    {
      id: 3,
      path: "#",
      title: "Medicine Inventory",
      icon: "material-symbols:inventory-2-outline",
      children: [
        {
          path: FrontendRoutes.INVENTORY,
          title: "Stock Management",
          id: 31,
        },
        {
          path: FrontendRoutes.INVENTORYCATEGORYLIST,
          title: "Categories",
          id: 32,
        },
        {
          path: FrontendRoutes.INVENTORYSUBCATEGORYLIST,
          title: "Sub Categories",
          id: 33,
        },
      ],
    },
  ],
};

export const SidebarFinancialRoutes: ISidebarDashboardRoutes = {
  title: "Billing",
  routes: [
    {
      id: 4,
      path: FrontendRoutes.PHARMACY_INVOICE,
      title: "Invoices",
      icon: "material-symbols:receipt-long-outline",
    },
    {
      id: 5,
      path: FrontendRoutes.PHARMACY_PAYMENT,
      title: "Payments",
      icon: "material-symbols:payments-outline",
    },
  ],
};

export const SidebarReportsRoutes: ISidebarDashboardRoutes = {
  title: "Reports",
  routes: [
    {
      id: 6,
      path: FrontendRoutes.SALES_REPORT,
      title: "Sales Report",
      icon: "material-symbols:analytics-outline",
    },
    {
      id: 7,
      path: FrontendRoutes.INVENTORY_REPORT,
      title: "Inventory Report",
      icon: "material-symbols:inventory-outline",
    },
    {
      id: 8,
      path: FrontendRoutes.PRESCRIPTION_REPORT,
      title: "Prescription Report",
      icon: "material-symbols:description-outline",
    },
  ],
};

export const SidebarSettingsRoutes: ISidebarDashboardRoutes = {
  title: "Settings",
  routes: [
    {
      id: 9,
      path: FrontendRoutes.SETTINGS,
      title: "General Settings",
      icon: "material-symbols:settings-outline",
    },
    {
      id: 10,
      path: FrontendRoutes.USER_MANAGEMENT,
      title: "User Management",
      icon: "material-symbols:group-outline",
    },
  ],
};
