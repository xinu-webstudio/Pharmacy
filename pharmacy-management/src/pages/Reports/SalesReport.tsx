import Header from "../../components/Header";
import { Icon } from "@iconify/react";

const SalesReport = () => {
  const salesData = [
    {
      date: "2025-08-03",
      medicine: "Paracetamol",
      quantity: 50,
      unitPrice: 5.00,
      total: 250.00,
      customer: "John Doe"
    },
    {
      date: "2025-08-03",
      medicine: "Amoxicillin",
      quantity: 30,
      unitPrice: 12.50,
      total: 375.00,
      customer: "Jane Smith"
    },
    {
      date: "2025-08-02",
      medicine: "Ibuprofen",
      quantity: 25,
      unitPrice: 8.00,
      total: 200.00,
      customer: "Mike Brown"
    },
  ];

  const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="flex flex-col gap-4">
      <Header listTitle="Sales Report" hideHeader />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#28ABE8] p-3 rounded-lg">
              <Icon icon="material-symbols:payments-outline" className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-900">₹{totalSales.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#4AD991] p-3 rounded-lg">
              <Icon icon="material-symbols:receipt-long-outline" className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
              <p className="text-2xl font-bold text-gray-900">{salesData.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#6A49E6] p-3 rounded-lg">
              <Icon icon="material-symbols:trending-up" className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Avg. Order Value</h3>
              <p className="text-2xl font-bold text-gray-900">₹{(totalSales / salesData.length).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Medicine</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Unit Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{sale.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{sale.medicine}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{sale.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{sale.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">₹{sale.unitPrice.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">₹{sale.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
