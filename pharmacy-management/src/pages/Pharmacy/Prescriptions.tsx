import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { SampleTableData } from "../../components/SampleData";
import { Status } from "../../components/Status";
import MasterTable from "../../layouts/Table/MasterTable";
import HeaderBar from "../Events/components/HeaderBar";
import { FrontendRoutes } from "../../routes";
import { Icon } from "@iconify/react";

const Prescriptions = () => {
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
            onClick={() => navigate(FrontendRoutes.PRESCRIPTIONS)}>
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

      <div className="my-5">
        <HeaderBar
          button="Add Prescription"
          date
          navigateTo="../add-prescription"
        />
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

export default Prescriptions;
