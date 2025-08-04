import { ReactElement } from "react";
import { FrontendRoutes } from "./FrontendRoutes";
import Prescriptions from "../pages/Pharmacy/Prescriptions";
import Add_Prescriptions from "../pages/Pharmacy/Add_Prescriptions";
import InventoryPage from "../pages/InventoryManagement/Inventory/InventoryPage";
import CategoryList from "../pages/InventoryManagement/CategoryList/CategoryList";
import SubCategory from "../pages/InventoryManagement/SubCategoryList/SubCategory";
import AddCategory from "../pages/InventoryManagement/CategoryList/components/AddCategory";
import AddSubCategory from "../pages/InventoryManagement/SubCategoryList/components/AddSubCategories";
import PharmacyInvoice from "../pages/FinancialOps/Invoice/components/Pharmacy";
import PharmacyPayment from "../pages/FinancialOps/Payment/components/Pharmacy";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";
import SalesReport from "../pages/Reports/SalesReport";

export interface IRoutesConfig {
  path: string;
  element: ReactElement;
  children?: IRoutesConfig[];
}

export const routesConfig: IRoutesConfig[] = [
  {
    path: FrontendRoutes.HOME,
    element: <Dashboard />,
  },
  {
    path: FrontendRoutes.DASHBOARD,
    element: <Dashboard />,
  },

  // Pharmacy Routes
  {
    path: FrontendRoutes.PRESCRIPTIONS,
    element: <Prescriptions />,
  },
  {
    path: FrontendRoutes.ADD_PRESCRIPTIONS,
    element: <Add_Prescriptions />,
  },

  // Inventory Management Routes
  {
    path: FrontendRoutes.INVENTORY,
    element: <InventoryPage />,
  },
  {
    path: FrontendRoutes.INVENTORYCATEGORYLIST,
    element: <CategoryList />,
  },
  {
    path: FrontendRoutes.INVENTORYSUBCATEGORYLIST,
    element: <SubCategory />,
  },
  {
    path: FrontendRoutes.ADDCATEGORY,
    element: <AddCategory />,
  },
  {
    path: FrontendRoutes.ADDSUBCATEGORY,
    element: <AddSubCategory />,
  },

  // Financial Operations Routes
  {
    path: FrontendRoutes.PHARMACY_INVOICE,
    element: <PharmacyInvoice />,
  },
  {
    path: FrontendRoutes.PHARMACY_PAYMENT,
    element: <PharmacyPayment />,
  },

  // Reports Routes
  {
    path: FrontendRoutes.SALES_REPORT,
    element: <SalesReport />,
  },

  // Catch all route
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
