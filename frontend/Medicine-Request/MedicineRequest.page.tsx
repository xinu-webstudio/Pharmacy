import { useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import { Status } from "../src/components/Status";
import MasterTable from "../src/layouts/Table/MasterTable";
import { FrontendRoutes } from "../src/routes/FrontendRoutes";
import { Icon } from "@iconify/react";

const SampleTableData = [
  {
    tokenId: "MR1",
    patientName: "John Doe",
    date: "2025-02-14",
    treatment: "Paracetamol 500mg",
    doctorName: "Dr. Smith",
    status: "PENDING",
  },
  {
    tokenId: "MR2",
    patientName: "Jane Smith",
    date: "2025-02-14",
    treatment: "Ibuprofen 400mg",
    doctorName: "Dr. Johnson",
    status: "COMPLETED",
  },
];

export const MedicineRequestPage = () => {
  const navigate = useNavigate();

  const tableData = {
    columns: [
      { title: "S.N.", key: "serialNumber" },
      { title: "Date ", key: "date" },
      { title: "Patient ", key: "patientName" },
      { title: "Doctor", key: "doctorName" },
      { title: "Case", key: "caseType" },
      { title: "Status", key: "status" },
      { title: "Action", key: "action" },
    ],
    rows: SampleTableData.map(
      (
        {
          tokenId,
          patientName,
          date,
          caseType,
          doctorName,
          status,
          treatment,
          serialNumber,
        },
        index
      ) => ({
        key: index,
        tokenid: tokenId,
        patientName,
        serialNumber,
        caseType,
        date,
        doctorName,
        status: <Status status={status} />,
        treatment,
        action: (
          <button
            className=" py-2 px-4 rounded flex items-center justify-self-center gap-2 text-[#0D0D0D] "
            onClick={() => navigate(FrontendRoutes.ENT)}>
            <span>
              <Icon icon="simple-line-icons:note" width={20} height={20} />
            </span>
            <span className="text-[#D6DCE1] ">| |</span>
            <span>
              <Icon icon="ph:trash-light" width={20} height={20} />
            </span>
          </button>
        ),
      })
    ),
  };

  return (
    <div>
      <Header listTitle="Prescription List" hideHeader />

      <div className="my-5 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Medicine Requests</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("../add-prescription")}>
          Add Prescription
        </button>
      </div>

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
  );
};

export default MedicineRequestPage;
