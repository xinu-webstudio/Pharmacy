import { Form, FormikProvider, useFormik } from 'formik';
import { GlobalForm } from '../../../../global/GlobalForm.component';
import { ActionButton } from '../../../../global/ActionButton.component';
// import {
//   useCreateExpense,
//   useGetAllExpenseCategory,
// } from "../../../../../server-action/api/expense.api";
// import {
//   TFinanceBank,
//   useGetAllFinanceBanks,
// } from "../../../../../server-action/api/financeBankApi";
import { useEffect } from 'react';
import * as Yup from 'yup';

interface propTypes {
  editData?: any;
  onClose?: () => void;
}
const validationSchema = () =>
  Yup.object().shape({
    expenseCategory: Yup.string().required('Expense category is required'),
    expenseName: Yup.string().required('Expense name is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
    totalAmount: Yup.number().required('Total amount is required'),
  });

export const AddExpense = ({ editData, onClose }: propTypes) => {
  // const { data: expenseCategory } = useGetAllExpenseCategory();

  // const expenseCategories = (expenseCategory as any)?.data?.expensescategories;

  // const categoryOptions = expenseCategories?.map((item: any) => ({
  //   label: item?.categoryName,
  //   value: item?._id,
  // }));

  // const { data: bankData } = useGetAllFinanceBanks();

  // const banks = (bankData as any)?.data?.banks;

  // const bankOptions = banks?.map((item: TFinanceBank) => ({
  //   value: item?._id,
  //   label: item?.bankName,
  //   accountNumber: item?.accountNumber,
  // }));

  // const { mutateAsync: handleCreate } = useCreateExpense();

  const fomik = useFormik({
    initialValues: {
      expenseCategory: '',
      expenseName: '',
      paymentMethod: '',
      totalAmount: '',
      remarks: '',
      bankName: '',
      accountNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const formData: any = {
        date: new Date().toISOString().split('T')[0],
        expensesList: [
          {
            categoryName: values.expenseCategory,
            details: values.expenseName,
            amount: Number(values.totalAmount),
          },
        ],
        amount: Number(values.totalAmount),
        paymentMethod: values.paymentMethod,

        remark: values.remarks,
      };
      if (values.paymentMethod === 'BANK') {
        formData['bank'] = values.bankName;
      }
      if (editData) {
      } else {
        // handleCreate(formData);
      }

      onClose?.();
    },
  });

  // useEffect(() => {
  //   if (!editData && fomik.values.paymentMethod) {
  //     const selectedBank = bankOptions?.find(
  //       (item: any) => item.value === fomik.values.bankName
  //     );
  //     fomik.setFieldValue('accountNumber', selectedBank?.accountNumber);
  //   }
  // }, [fomik.values.bankName]);

  const paymentOptions = [
    {
      label: 'Cash',
      value: 'CASH',
    },
    {
      label: 'Bank',
      value: 'BANK',
    },
  ];

  const formData = [
    {
      type: 'select',
      field: 'expenseCategory',
      label: 'Expense Category',
      options: [
        { label: 'Category 1', value: 'category1' },
        { label: 'Category 2', value: 'category2' },
      ],
      required: true,
    },
    {
      type: 'text',
      field: 'expenseName',
      label: 'Expense Name',
      required: true,
    },
    {
      type: 'select',
      field: 'paymentMethod',
      label: 'Payment Method',
      options: paymentOptions,
      required: true,
    },

    {
      type: 'select',
      field: 'bankName',
      label: 'Bank Name',
      isVisible: fomik.values.paymentMethod === 'BANK' ? true : false,
      options: [
        { label: 'Bank 1', value: 'bank1' },
        { label: 'Bank 2', value: 'bank2' },
      ],
    },

    {
      type: 'text',
      field: 'accountNumber',
      label: 'Account Number',
      isVisible: fomik.values.paymentMethod === 'BANK' ? true : false,
    },

    {
      type: 'text',
      field: 'totalAmount',
      label: 'Total Amount',
      required: true,
    },
    {
      type: 'text',
      field: 'remarks',
      label: 'Remarks',
    },
  ];

  const { touched, errors } = fomik;
  return (
    <div>
      <FormikProvider value={fomik}>
        <Form
          onSubmit={fomik.handleSubmit}
          className="grid grid-cols-2 gap-x-5 gap-y-0.5"
        >
          <GlobalForm
            getFieldProps={fomik.getFieldProps}
            formDatails={formData}
            errors={errors}
            touched={touched}
          />
          <div className="mt-2 col-span-2">
            <ActionButton
              onCancel={() => {
                fomik.resetForm();
                onClose?.();
              }}
              onSubmit={fomik.handleSubmit}
            />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};
