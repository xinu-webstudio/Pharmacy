import MasterTable from '../../../../../layouts/Table/MasterTable';
import { useGetAllExpense } from '../../../../../server-action/api/expense.api';
import { IExpenses } from '../../../../../server-action/types/expense.types';

export const ExpenseTable = () => {
  const { data: expenseData } = useGetAllExpense();
  const expenses = (expenseData as any)?.data?.expenses;

  const tableData = {
    columns: [
      { title: 'Date', key: 'date' },
      { title: 'Expense ID', key: 'id' },
      { title: 'Expense Item', key: 'item' },
      { title: 'Category', key: 'category' },
      { title: 'Amount (NPR)', key: 'amount' },
      { title: 'Paid By', key: 'paidBy' },
      { title: 'Remarks', key: 'remarks' },
    ],
    rows: expenses?.map((item: IExpenses) => ({
      id: `E-${item?._id?.slice(-5)}`,
      date: item?.date,
      category: item?.expensesList[0]?.categoryName?.categoryName,
      item: item?.expensesList[0]?.details,
      amount: item?.totalAmount,
      remarks: item?.remark,
    })),
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
