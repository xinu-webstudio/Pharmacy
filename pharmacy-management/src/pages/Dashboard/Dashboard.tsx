import Header from "../../components/Header";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { FrontendRoutes } from "../../routes/FrontendRoutes";

const Dashboard = () => {
  const navigate = useNavigate();

  const statsCards = [
    {
      title: "Total Prescriptions",
      value: "1,234",
      icon: "streamline:pharmacy",
      color: "bg-[#28ABE8]",
      change: "+12%",
    },
    {
      title: "Medicine Stock",
      value: "856",
      icon: "material-symbols:inventory-2-outline",
      color: "bg-[#4AD991]",
      change: "+5%",
    },
    {
      title: "Daily Sales",
      value: "₹12,450",
      icon: "material-symbols:payments-outline",
      color: "bg-[#6A49E6]",
      change: "+8%",
    },
    {
      title: "Low Stock Items",
      value: "23",
      icon: "material-symbols:warning-outline",
      color: "bg-[#ED4242]",
      change: "-3%",
    },
  ];

  const recentPrescriptions = [
    {
      id: "RX001",
      patientName: "John Doe",
      doctor: "Dr. Smith",
      date: "2025-08-03",
      status: "Completed",
    },
    {
      id: "RX002",
      patientName: "Jane Smith",
      doctor: "Dr. Johnson",
      date: "2025-08-03",
      status: "Pending",
    },
    {
      id: "RX003",
      patientName: "Mike Brown",
      doctor: "Dr. Davis",
      date: "2025-08-02",
      status: "Completed",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Header listTitle="Pharmacy Dashboard" hideHeader />

      {/* Welcome Section */}
      <main className="w-full relative">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <div
              key={index}
              className="border bg-white flex items-center rounded-2xl gap-5 p-6 shadow-md">
              <div className={`${card.color} p-3 rounded-full`}>
                <Icon icon={card.icon} className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-lg text-gray-700">{card.title}</h1>
                <p className="text-2xl mt-1 font-semibold text-gray-800">
                  {card.value}
                </p>
                <p className="text-sm text-green-600">
                  {card.change} from last month
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Prescriptions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Prescriptions
            </h3>
            <button
              onClick={() => navigate(FrontendRoutes.PRESCRIPTIONS)}
              className="text-primary hover:text-primary/80 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPrescriptions.map((prescription, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{prescription.id}</p>
                  <p className="text-sm text-gray-600">
                    {prescription.patientName}
                  </p>
                  <p className="text-xs text-gray-500">{prescription.doctor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{prescription.date}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      prescription.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {prescription.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate(FrontendRoutes.ADD_PRESCRIPTIONS)}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-[#28ABE8] p-2 rounded-lg">
                <Icon icon="gridicons:add" className="text-white text-lg" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Add Prescription
              </span>
            </button>
            <button
              onClick={() => navigate(FrontendRoutes.INVENTORY)}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-[#4AD991] p-2 rounded-lg">
                <Icon
                  icon="material-symbols:inventory-2-outline"
                  className="text-white text-lg"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Manage Inventory
              </span>
            </button>
            <button
              onClick={() => navigate(FrontendRoutes.PHARMACY_INVOICE)}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-[#6A49E6] p-2 rounded-lg">
                <Icon
                  icon="material-symbols:receipt-long-outline"
                  className="text-white text-lg"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Create Invoice
              </span>
            </button>
            <button
              onClick={() => navigate(FrontendRoutes.SALES_REPORT)}
              className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="bg-[#ED4242] p-2 rounded-lg">
                <Icon
                  icon="material-symbols:analytics-outline"
                  className="text-white text-lg"
                />
              </div>
              <span className="text-sm font-medium text-gray-700">
                View Reports
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
