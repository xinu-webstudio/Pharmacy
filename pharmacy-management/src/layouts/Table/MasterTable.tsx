import React from "react";
import { IMasterTable } from "../../Interface/global.interface";
import Pagination from "./Pagination";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const MasterTable: React.FC<IMasterTable> = ({
  columns,
  loading,
  pagination,
  rows,
  color,
  textcolor,
}) => {
  return (
    <div className="w-full h-full py-2 mb-6 bg-white">
      <div className="w-full overflow-scroll rounded-md">
        <table className="w-full  bg-white ">
          <TableHead
            columns={columns}
            loading={loading}
            color={color}
            textcolor={textcolor}
          />
          <TableBody columns={columns} rows={rows} loading={loading} />
        </table>
      </div>

      {!!pagination && <Pagination {...pagination} />}
    </div>
  );
};

export default MasterTable;
