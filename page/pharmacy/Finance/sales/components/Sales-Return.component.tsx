import { Icon } from '@iconify/react/dist/iconify.js';
import {
  IMainInvoiceController,
  IProductInventory,
} from '../../../../../server-action/types/master-invoice.types';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { GlobalForm } from '../../../../../components/GlobalForm';
import { useGetAllBank } from '../../../../../server-action/api/bank.api';
import { TFinanceBank } from '../../../../../server-action/api/financeBankApi';
import { ActionButton } from '../../../../../components/ActionButton';
import { useCreateInvoice } from '../../../../../server-action/api/masterinvoice.api';

interface propTypes {
  editData: IMainInvoiceController;
  onClose: () => void;
}

export const SalesReturn = ({ editData, onClose }: propTypes) => {
  console.log(editData);
  // State to track the total amount
  const [totalAmount, setTotalAmount] = useState(0);

  const { mutateAsync: handleCreate } = useCreateInvoice();

  const formik = useFormik({
    initialValues: {
      selectedMedicine: editData?.productList?.map(
        (item: IProductInventory) => ({
          quantity: item.quantity,
          item,
        })
      ),
      returnAmount: 0,
      paymentMethod: '',
      remarks: '',
      bank: '',
      accountNo: '',
    },
    onSubmit: async (values) => {
      console.log(values.selectedMedicine);
      const selectedMedicine = formik.values.selectedMedicine?.map(
        (item: any) => ({
          pProduct: item?.item?.pProduct?._id,
          pBatch: item?.item?.pBatch?._id,
          quantity: item?.quantity,
          totalAmount: Number(item?.quantity * item?.item?.pBatch?.mrpRate),
        })
      );
      const formData: any = {
        inventoryFor: 'PHARMACY',
        category: 'SALERETURN',
        date: new Date().toISOString().split('T')[0],
        remarks: values.remarks,
        paymentMethod: values.paymentMethod,
        returnAmount: values.returnAmount,
        predefinedBillNo: editData?.invoiceNo,
        supervisor: editData?.supervisor,
        totalAmount: formik.values.returnAmount,
        paymentStatus: 'PAID',
        invoiceNo: `SR-${editData?.invoiceNo}-${Math.random()
          .toString(36)
          .slice(2)}`,
        billingAgainst: editData?.billingAgainst?._id,
        walkInCustomer: editData?.walkInCustomer,
        productList: selectedMedicine,
      };
      if (formik.values.paymentMethod === 'BANK') {
        formData['bank'] = values.bank;
      }

      await handleCreate(formData);
    },
  });

  const { data: bankData } = useGetAllBank();

  const bankOptions = (bankData as any)?.data?.banks?.map(
    (item: TFinanceBank) => ({
      value: item._id,
      label: item.bankName,
      accountNumber: item.accountNumber,
    })
  );

  // Calculate total amount whenever selectedMedicine changes
  useEffect(() => {
    if (formik.values.selectedMedicine) {
      const calculatedTotal = formik.values.selectedMedicine.reduce(
        (acc, curr) =>
          acc + (curr.item.pBatch?.mrpRate || 0) * (curr.quantity ?? 1),
        0
      );

      setTotalAmount(calculatedTotal);
      formik.setFieldValue('returnAmount', calculatedTotal);
    }
  }, [formik.values.selectedMedicine]);

  const invoiceData = [
    {
      title: 'Invoice no. :',
      value: editData?.invoiceNo,
    },
    {
      title: 'Date. :',
      value: editData?.date,
    },
  ];

  const patientDetails = [
    {
      title: 'Patient name. :',
      value:
        editData?.walkInCustomer?.name ??
        editData?.billingAgainst?.commonInfo?.personalInfo?.fullName,
    },
    {
      title: 'Email :',
      value: editData?.billingAgainst?.email ?? 'N/A',
    },
    {
      title: 'Phone :',
      value:
        editData?.walkInCustomer?.contact ??
        editData?.billingAgainst?.commonInfo?.contactInfo?.phone?.primaryPhone,
    },
  ];

  const paymentMethodOptions = [
    { label: 'Cash', value: 'CASH' },
    { label: 'Bank', value: 'BANK' },
  ];

  useEffect(() => {
    if (formik.values.bank) {
      const selectedBank = bankOptions?.find(
        (item: any) => item.value === formik.values.bank
      );
      formik.setFieldValue('accountNo', selectedBank?.accountNumber);
    }
  }, [formik.values.bank]);

  const formData = [
    {
      type: 'select',
      field: 'paymentMethod',
      label: 'Payment Method',
      options: paymentMethodOptions,
    },

    {
      type: 'select',
      field: 'bank',
      label: 'Bank',
      options: bankOptions,
      isVisible: formik.values.paymentMethod === 'BANK',
    },

    {
      type: 'text',
      field: 'accountNo',
      label: 'Account Number',
      isVisible: formik.values.paymentMethod === 'BANK',
    },

    {
      type: 'text',
      field: 'remarks',
      label: 'Remarks',
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <section className="grid grid-cols-2 justify-between">
        <div className="flex flex-col gap-1">
          {invoiceData.map((item, index) => (
            <div key={index} className="flex gap-2">
              <span className="font-semibold">{item.title}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div>
          {patientDetails.map((item, index) => (
            <div key={index} className="flex gap-2">
              <span className="font-semibold">{item.title}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex border-b pb-2 text-sm text-gray-500">
          <div className="w-1/4">Product</div>
          <div className="w-1/6 text-center">Batch no.</div>
          <div className="w-1/6 text-center">Price</div>
          <div className="w-1/6 text-center">QTY</div>
          <div className="w-1/6 text-center">Sub Total</div>
          <div className="w-10"></div>
        </div>

        {formik.values?.selectedMedicine?.length > 0 ? (
          formik.values.selectedMedicine.map((medicine: any, index: number) => (
            <div
              key={medicine.item?._id}
              className="flex items-center py-4 border-b"
            >
              <div className="w-1/4 text-xs">
                {medicine.item?.pProduct?.name}
              </div>
              <div className="w-1/5 text-center">
                <div className="relative">
                  B-{medicine.item?.pBatch?.batchNo?.split('BATCH')[1]}
                </div>
              </div>
              <div className="w-1/5 text-center">
                {medicine.item?.pBatch?.mrpRate}
              </div>
              <div className="w-1/6 text-center">
                <input
                  type="number"
                  min="1"
                  value={medicine.quantity}
                  onChange={(e) => {
                    const newQuantity = Number.parseInt(e.target.value) || 0;
                    formik.setFieldValue(
                      `selectedMedicine.${index}.quantity`,
                      newQuantity
                    );
                  }}
                  className="w-16 p-1 text-center border rounded"
                />
              </div>
              <div className="w-1/6 text-center">
                {(medicine.item?.pBatch?.mrpRate || 0) * medicine.quantity}
              </div>
              <div className="w-10 flex justify-center">
                <button
                  onClick={() => {
                    const updatedMedicines = [
                      ...formik.values.selectedMedicine,
                    ];
                    updatedMedicines.splice(index, 1);
                    formik.setFieldValue('selectedMedicine', updatedMedicines);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <Icon icon="fluent:delete-24-regular" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-2">No Product</div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex justify-end gap-40">
          <p className="">Return Amount</p>
          <p className="">{totalAmount.toFixed(2)}</p>
        </div>
      </section>

      <section className="-mt-2">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-5"
          >
            <GlobalForm
              formDatails={formData}
              getFieldProps={formik.getFieldProps}
              touched={formik.touched as any}
              errors={formik.errors as any}
            />

            <div className="col-span-2 mt-4">
              <ActionButton
                onCancel={onClose}
                onSubmit={() => {
                  formik.submitForm();
                  onClose();
                }}
              />
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};
