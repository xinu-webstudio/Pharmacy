import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header"
import MasterTable from "../../../layouts/Table/MasterTable";
import { FrontendRoutes } from "../../../routes/FrontendRoutes";
import { Status } from "../../../components/Status";
import { TableAction } from "../../../layouts/Table/TableAction";

export const SampleTableData = [
  {
      tokenId: 'Tk1',
      patientName: 'John Doe',
      date: '2025-02-14',
      treatment: 'General Checkup',
      doctorName: 'John Smith',
      status: 'PENDING'
  },
  {
      tokenId: 'Tk2',
      patientName: 'Jane Smith',
      date: '2025-02-15',
      treatment: 'Dental Cleaning',
      doctorName: 'Sarah Johnson',
      status: 'COMPLETED'
  },
  {
      tokenId: 'Tk3',
      patientName: 'Michael Brown',
      date: '2025-02-16',
      treatment: 'Eye Examination',
      doctorName: 'Emily Davis',
      status: 'CANCELLED'
  },
  {
      tokenId: 'Tk4',
      patientName: 'Alice Williams',
      date: '2025-02-17',
      treatment: 'Blood Test',
      doctorName: 'David Clark',
      status: 'COMPLETED'
  },
  {
      tokenId: 'Tk5',
      patientName: 'Robert White',
      date: '2025-02-18',
      treatment: 'X-Ray',
      doctorName: 'Lisa Adams',
      status: 'PENDING'
  },
  {
      tokenId: 'Tk6',
      patientName: 'Emily Green',
      date: '2025-02-19',
      treatment: 'MRI Scan',
      doctorName: 'James Hall',
      status: 'COMPLETED'
  }
];

const purchaseData = [
  {
    itemName: "Paracetamol",
    categories: "Medications",
    subcategories: "Medications",
    status:"ACTIVE"
  },
  {
    itemName: "Paracetamol",
    categories: "Medications",
    subcategories: "Medications",
    status:"INACTIVE"
  },

];
  
const CategoryListPage = () => {

  const navigate = useNavigate();
  const tableData = {
    columns: [
      { title: "S.N", key: "sn" },
      { title: "Categories", key: "categories" },
      { title: "Sub Categories", key: "subcategories" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ],
    rows: purchaseData.map((item, index) => ({
      sn: index,
      categories: item.categories,
      subcategories: item.subcategories,
      status: <Status status={item.status} />,
      action: (
        <TableAction
        onDelete={() => { }}
        onEdit={() => {}}
        onSwitch={() => {}}
        />
      )

    })),
  };

  return (
    <div>
      <Header
        title="Product Category"
        onSearch={() => { }}
        onAddClick={() => {navigate(FrontendRoutes.ADDCATEGORY) }}
        listTitle="Category List"
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
                    onClick: () => {
                    },
                }}
            />
      </div>
    </div>
  )
}

export default CategoryListPage