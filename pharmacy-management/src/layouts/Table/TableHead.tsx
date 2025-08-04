import { ITableHeader } from "../../Interface/global.interface";

const TableHead = ({ columns, loading, color, textcolor }: ITableHeader) => {
  return (
    <thead>
      {loading ? (
        <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse"></div>
      ) : (
        <tr className="rounded-sm ">
          {columns?.map((item) => (
            <th
              key={item?.key}
              className={`w-auto text-formText font-medium text-[12px] sm:text-[14px] ${
                color || "bg-primary"
              } ${
                textcolor || "text-white"
              } p-2 sm:p-4 text-center text-nowrap`}
            >
              {item.title === "Patient Type" ||
              item.title === "Status" ||
              item.title === "Department" ||
              item.title === "Specialist" ||
              item.title === "Available Status" ||
              item.title === "Blood Group" ||
              item.title === "Contact No" ||
              item.title === "Organ Donated" ? (
                <div className="flex text-sm sm:text-lg justify-center items-center cursor-pointer">
                  <span className=" font-medium">{item?.title}</span>
                  <div className="flex flex-col justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      className="ml-2 sm:ml-4"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m5 15l7-7l7 7"
                      />
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 20 20"
                      className="ml-2 sm:ml-4"
                    >
                      <path
                        fill="currentColor"
                        d="M10.103 12.778L16.81 6.08a.69.69 0 0 1 .99.012a.726.726 0 0 1-.012 1.012l-7.203 7.193a.69.69 0 0 1-.985-.006L2.205 6.72a.727.727 0 0 1 0-1.01a.69.69 0 0 1 .99 0z"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="flex text-sm sm:text-lg justify-center cursor-pointer">
                  <span className=" font-medium">{item?.title}</span>
                </div>
              )}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
};

export default TableHead;
