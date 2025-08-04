import { useNavigate } from "react-router-dom";
import { DropdownField } from "../src/components";
import Header from "../src/components/Header";
import MasterTable from "../src/layouts/Table/MasterTable";
import { FrontendRoutes } from "../src/routes/FrontendRoutes";
import { Status } from "../src/components/Status";
import { TableAction } from "../src/layouts/Table/TableAction";

export const SampleTableData = [
  {
    tokenId: "Tk1",
    patientName: "John Doe",
    date: "2025-02-14",
    treatment: "General Checkup",
    doctorName: "John Smith",
    status: "PENDING",
  },
  {
    tokenId: "Tk2",
    patientName: "Jane Smith",
    date: "2025-02-15",
    treatment: "Dental Cleaning",
    doctorName: "Sarah Johnson",
    status: "COMPLETED",
  },
  {
    tokenId: "Tk3",
    patientName: "Michael Brown",
    date: "2025-02-16",
    treatment: "Eye Examination",
    doctorName: "Emily Davis",
    status: "CANCELLED",
  },
  {
    tokenId: "Tk4",
    patientName: "Alice Williams",
    date: "2025-02-17",
    treatment: "Blood Test",
    doctorName: "David Clark",
    status: "COMPLETED",
  },
  {
    tokenId: "Tk5",
    patientName: "Robert White",
    date: "2025-02-18",
    treatment: "X-Ray",
    doctorName: "Lisa Adams",
    status: "PENDING",
  },
  {
    tokenId: "Tk6",
    patientName: "Emily Green",
    date: "2025-02-19",
    treatment: "MRI Scan",
    doctorName: "James Hall",
    status: "COMPLETED",
  },
];

const purchaseData = [
  {
    itemName: "Paracetamol",
    categories: "Medications",
    currentStock: 4,
    minReqStock: 2,
    lastRestocked: "2024-11-20",
    expiryDate: "2026-10-26",
    supplierName: "Freddie",
    status: "ONSTOCK",
  },
  {
    itemName: "Paracetamol",
    categories: "Medications",
    currentStock: 4,
    minReqStock: 2,
    lastRestocked: "2024-11-20",
    expiryDate: "2026-10-26",
    supplierName: "Freddie",
    status: "OUTOFSTOCK",
  },
];

export const PharmacyInventoryPage = () => {
  const navigate = useNavigate();
  const tableData = {
    columns: [
      { title: "Item Name", key: "itemName" },
      { title: "Categories", key: "categories" },
      { title: "Current Stock", key: "currentStock" },
      { title: "Min. req stock", key: "minReqStock" },
      { title: "Last Restocked", key: "lastRestocked" },
      { title: "Expiry date", key: "expiryDate" },
      { title: "Supplier Name", key: "supplierName" },
      { title: "Available Status", key: "status" },
      { title: "Action", key: "action" },
    ],
    rows: purchaseData.map((item, index) => ({
      key: index,
      itemName: item.itemName,
      categories: item.categories,
      currentStock: item.currentStock,
      minReqStock: item.minReqStock,
      lastRestocked: item.lastRestocked,
      expiryDate: item.expiryDate,
      supplierName: item.supplierName,
      status: <Status status={item.status} />,
      action: <TableAction onDelete={() => {}} onEdit={() => {}} />,
    })),
  };

  return (
    <div>
      <Header
        onSearch={() => {}}
        onAddClick={() => {
          navigate(FrontendRoutes.ADDPURCHASE);
        }}
        listTitle="Inventory"
        FilterSection={() => {
          return (
            <div className="flex gap-5">
              <DropdownField
                label=""
                options={[
                  {
                    value: "All",
                    label: "Categories",
                  },
                ]}
              />
              <DropdownField
                label=""
                options={[
                  {
                    value: "All",
                    label: "Status",
                  },
                ]}
              />

              <DropdownField
                label=""
                options={[
                  {
                    value: "All",
                    label: "Expired Date",
                  },
                ]}
              />
            </div>
          );
        }}
      />
      <div className="py-4">
        <MasterTable
          columns={tableData.columns}
          rows={tableData.rows}
          loading={false}
          pagination={{
            currentPage: 1,
            totalPage: 300,
            limit: 20,
            onClick: () => {},
          }}
        />
      </div>
    </div>
  );
};

export default PharmacyInventoryPage;
