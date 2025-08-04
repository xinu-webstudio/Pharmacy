import MasterTable from '../../../../global/MasterTable.component';
import { TableAction } from '../../../../global/table/TableAction.component';
// import {
//   useDeleteExpenseCategory,
//   useGetAllExpenseCategory,
// } from '../../../../../server-action/api/expense.api';
// import { IExpensesCategory } from '../../../../../server-action/types/expense.types';

interface propTypes {
  setSelectedData: React.Dispatch<any>;
  setViewModal: React.Dispatch<boolean>;
}

export const ExpenseCategoryTable = ({
  setSelectedData,
  setViewModal,
}: propTypes) => {
  // const { data: expenseCategory } = useGetAllExpenseCategory();

  // const { mutateAsync: handleDelete } = useDeleteExpenseCategory();

  const tableData = {
    columns: [
      { title: 'S.N', key: 'sn' },
      { title: 'Category', key: 'category' },
      { title: 'Description', key: 'desc' },
      { title: 'Actions', key: 'action' },
    ],
    // rows: (expenseCategory as any)?.data?.expensescategories?.map(
    //   (item: IExpensesCategory, index: number) => ({
    //     sn: index + 1,
    //     category: item?.categoryName,
    //     desc: item?.details,
    //     action: (
    //       <TableAction
    //         onEdit={() => {
    //           setSelectedData(item);
    //           setViewModal(true);
    //         }}
    //         onDelete={async () => {
    //           await handleDelete({
    //             id: JSON.stringify([item?._id]),
    //           });
    //         }}
    //       />
    //     ),
    //   })
    // ),
    rows: [],
  };
  return (
    <div>
      <MasterTable
        columns={tableData.columns}
        rows={tableData.rows}
        loading={false}
      />
    </div>
  );
};
