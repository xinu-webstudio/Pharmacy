import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header"
import MasterTable from "../../../layouts/Table/MasterTable";
import { FrontendRoutes } from "../../../routes/FrontendRoutes";
import { Status } from "../../../components/Status";
import { TableAction } from "../../../layouts/Table/TableAction";

const purchaseData = [
  {
    itemName: "Paracetamol",
    subcategories: "Medications",
    description: "Medications",
    status:"ACTIVE"
  },


];
  
const SubCategoryPage = () => {

  const navigate = useNavigate();
  const tableData = {
    columns: [
      { title: "S.N", key: "sn" },
      { title: "Sub Categories", key: "subcategories" },
      { title: "Description", key: "description" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ],
    rows: purchaseData.map((item, index) => ({
      sn: index,
      description: item.description,
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
        onAddClick={() => {navigate(FrontendRoutes.ADDSUBCATEGORY) }}
        listTitle="Sub-Category List"
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

export default SubCategoryPage