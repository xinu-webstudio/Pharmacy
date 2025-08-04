import { ITableRows } from "../../Interface/global.interface";
import DataTableWithShimmer from "./ShimmerLoader";

const TableBody = ({ columns, rows, loading }: ITableRows) => {
  return (
    <tbody>
      {!loading ? (
        <>
          {rows?.length ? (
            rows?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={` "bg-slate-100" text-center  border-[#D1D1D1]`}
                >
                  {columns?.map((column) => {
                    return (
                      <td
                        key={column.key}
                        className={`text-formText border-y border-b-[#D1D1D1]  text-[14px]  py-4 px-4  `}
                      >
                        {column.render
                          ? column.render({
                              row: item,
                              index: index + 1 || 1,
                            })
                          : item[column.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                className="bg-white"
                colSpan={columns?.length}
                style={{
                  fontSize: 24,
                  textAlign: "center",
                  color: "#ddd",
                  padding: 50,
                }}
              >
                <div className="flex flex-col items-center">
                  <p className="text-primary text-[12px] mt-4 font-semi-bold">
                    No Items Found
                  </p>
                  <p className="text-[12px] mt-4">
                    You do not have any items yet.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </>
      ) : (
        <div className="w-full">
          <DataTableWithShimmer />
        </div>
      )}
    </tbody>
  );
};

export default TableBody;
