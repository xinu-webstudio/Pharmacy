import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

// Import pharmacy pages
import {
  PharmacyPosPage,
  MedicineRequestPage,
  MedicineRequestDetailsPage,
  PharmacyInventoryPage,
  PharmacyProductListPage,
  PharmacyExpense,
  PharmacyFinanceReportsPage,
  SalesPage,
} from './page/index';

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
  </div>
);

// Home page component
const HomePage = () => (
  <div className="min-h-screen bg-grey-50 p-8">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-grey-900 mb-8">
        Pharmacy Management System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Point of Sale (POS)</h2>
          <p className="text-grey-600 mb-4">
            Manage sales transactions and process customer purchases.
          </p>
          <a href="/pos" className="btn btn-primary">
            Go to POS
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
          <p className="text-grey-600 mb-4">
            Track stock levels, manage products, and monitor inventory.
          </p>
          <a href="/inventory" className="btn btn-primary">
            View Inventory
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Medicine Requests</h2>
          <p className="text-grey-600 mb-4">
            Process and manage medicine requests from departments.
          </p>
          <a href="/medicine-requests" className="btn btn-primary">
            View Requests
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
          <p className="text-grey-600 mb-4">
            View sales reports, expenses, and financial analytics.
          </p>
          <a href="/finance/reports" className="btn btn-primary">
            View Reports
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Product Management</h2>
          <p className="text-grey-600 mb-4">
            Add, edit, and manage pharmacy products and medications.
          </p>
          <a href="/products" className="btn btn-primary">
            Manage Products
          </a>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          <p className="text-grey-600 mb-4">
            Track and manage pharmacy expenses and costs.
          </p>
          <a href="/finance/expenses" className="btn btn-primary">
            View Expenses
          </a>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pos" element={<PharmacyPosPage />} />
          <Route path="/medicine-requests" element={<MedicineRequestPage />} />
          <Route
            path="/medicine-requests/:id"
            element={<MedicineRequestDetailsPage />}
          />
          <Route path="/inventory" element={<PharmacyInventoryPage />} />
          <Route path="/products" element={<PharmacyProductListPage />} />
          <Route path="/finance/expenses" element={<PharmacyExpense />} />
          <Route
            path="/finance/reports"
            element={<PharmacyFinanceReportsPage />}
          />
          <Route path="/finance/sales" element={<SalesPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-grey-900 mb-4">404</h1>
                  <p className="text-grey-600 mb-4">Page not found</p>
                  <a href="/" className="btn btn-primary">
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
