import { Form, FormikProvider } from 'formik';
import { GlobalForm } from '../../../global/GlobalForm.component';
import { DropdownField } from '../../../global/inputs/DropdownField.component';
import { InputField } from '../../../global/inputs/InputField.component';
import {
  INVENTROYENUM,
  paymentMethod,
  SALEPURCHASEENUM,
} from '../../../constants/constants';
import { ActionButton } from '../../../global/ActionButton.component';
// import {
//   useCreateInvoice,
//   useUpdateInvoice,
// } from '../../../../server-action/api/masterinvoice.api';
// import {
//   useGetPatientHistory,
//   useUpdatePatientHistory,
// } from '../../../../server-action/api/patienthistory.api';
import { buildQueryParams } from '../../../hooks/useBuildQuery.hooks';
// import { useGetAllBank } from '../../../server-action/api/bank.api';
// import { TFinanceBank } from '../../../../server-action/api/financeBankApi';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IMainInvoiceController } from '../../../server-action/types/master-invoice.types';
import { v4 } from 'uuid';
import { calculateItemSubTotal } from './TableData';
import { PrintableInvoice } from '../../Medicine-Request/[id]/components/NewPharmacyBill';

interface propTypes {
  form: any;
  onClose: () => void;
}

export const Payment = ({ form, onClose }: propTypes) => {
  const generateInvoiceNo = () => `Bill-${v4().slice(0, 8)}`;

  const formField = [
    {
      type: 'text',
      field: 'totalAmount',
      label: 'Total Amount',
      required: true,
    },
    {
      type: 'text',
      field: 'paidAmount',
      label: 'Paid Amount',
      required: true,
    },
    {
      type: 'text',
      field: 'remarks',
      label: 'Remarks',
    },
  ];

  const paymentMethodOptions = [
    {
      label: 'Cash',
      value: paymentMethod.cash,
    },
    {
      label: 'Bank',
      value: paymentMethod.bank,
    },
    {
      label: 'cheque',
      value: paymentMethod.cheque,
    },
  ];

  // const { mutateAsync: createInvoice } = useCreateInvoice();
  // const { mutateAsync: updateInvoice } = useUpdateInvoice();

  const [invoiceData, setInvoiceData] = useState<
    IMainInvoiceController | any
  >();

  const queryParams = buildQueryParams({
    user: form.values.patientId,
    isActive: '1',
  });

  // const { data } = useGetPatientHistory(queryParams);

  // const { mutateAsync: updatePatientHistory } = useUpdatePatientHistory();

  const paymentStatus =
    form.values.paidAmount == 0
      ? 'PENDING'
      : form.values.paidAmount == form.values.totalAmount
      ? 'PAID'
      : 'PARTIALLY-PAID';

  // const { data: bankData } = useGetAllBank();

  // const banks: TFinanceBank[] = (bankData as any)?.data?.banks;

  // const bankOptions = banks?.map((item: TFinanceBank) => ({
  //   value: item._id ?? '',
  //   label: item.bankName,
  //   extra: item.accountNumber,
  // }));

  const bankOptions = [
    {
      lable: 'Nabil Bank',
      value: 'Nabil',
      extra: '1234567890',
    },
    {
      lable: 'HDFC Bank',
      value: 'Hdfc',
      extra: '123456785',
    },
  ];

  const contentRef = useRef<HTMLDivElement | any>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    // documentTitle: `Invoice-${invoice?.invoiceNo ?? ''}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  useEffect(() => {
    const selectedMedicine = form.values.selectedMedicine?.map((item: any) => {
      const totalAmount = item?.item?.mrpRate * item?.quantity;
      const initDiscount = item?.item?.discount;
      const discount = (initDiscount / totalAmount) * 100;
      return {
        pProduct: {
          name: item?.item?.product,
          productCategory: item?.item?.productCategory,
          strength: item?.item?.strength,
          form: item?.item?.medicineForm,
        },
        pBatch: item?.item?.pBatch,
        quantity: item?.quantity,
        discount: discount,
        tax: item?.item?.vat,
        totalAmount: calculateItemSubTotal(item),
        doses: item?.item?.doses,
        frequency: item?.item?.frequency,
        duration: item?.item?.duration,
      };
    });

    const formData: any = {
      date: new Date().toISOString().split('T')[0],
      inventoryFor: INVENTROYENUM.PHARMACY,
      category: SALEPURCHASEENUM.SALE,
      discount: Number(form.values.discount),
      paidAmount: Number(form.values.paidAmount),
      totalAmount: Number(form.values.totalAmount),
      subTotal: Number(form.values.subTotal),
      remarks: form.values.remarks,
      paymentStatus: paymentStatus,
      age: form.values.patientAge,
      paymentMethod: form.values.paymentMethod,
      dueAmount: Number(form.values.totalAmount - form.values.paidAmount),
      supervisor: form.values.supervisor,
      productList: selectedMedicine,
      tax: Number(form.values.taxValue),
      isActive: form.values.patientId
        ? true
        : paymentStatus === 'PAID'
        ? false
        : true,
    };
    if (form.values.patientType === 'new') {
      const billingAgainst = {
        patientInfo: {
          patientId: form.values.patientRegisteredId,
        },
        commonInfo: {
          personalInfo: {
            fullName: form.values.patient,
            gender: 'N/A',
          },
          contactInfo: {
            phone: {
              primaryPhone: form.values.phoneNo,
            },
          },
        },
      };
      formData['billingAgainst'] = billingAgainst;
    }
    if (form.values.patientType !== 'new') {
      const billingAgainst = {
        commonInfo: {
          personalInfo: {
            fullName: form.values.patientName,
            gender: form.values.patientGender,
          },
          contactInfo: {
            phone: {
              primaryPhone: form.values.phoneNo,
            },
          },
        },
      };
      formData['billingAgainst'] = billingAgainst;
    }
    if (form.values.paymentMethod === 'BANK') {
      formData['bank'] = form.values.bank;
    }

    setInvoiceData(formData);
  }, [
    form.values.paymentMethod,
    form.values.paidAmount,
    form.values.totalAmount,
  ]);

  const handleSubmit = async (providedInvoiceNo?: string) => {
    const selectedMedicine = form.values.selectedMedicine?.map((item: any) => {
      const totalAmount = item?.item?.mrpRate * item?.quantity;
      const initDiscount = item?.item?.discount;
      const discount = (initDiscount / totalAmount) * 100;
      return {
        pProduct: item?.item?.productId,
        pBatch: item?.item?.batchId,
        quantity: item?.quantity ?? 1,
        doses: item?.item?.doses,
        frequency: item?.item?.frequency,
        duration: item?.item?.duration,
        discount:
          item?.item?.discountType === 'flat'
            ? discount
            : item?.item?.discount ?? 0,
        tax: item?.item?.vat ?? 0,
        totalAmount: totalAmount,
      };
    });

    const originalTotal = selectedMedicine.reduce(
      (total: number, item: any) => total + item?.totalAmount,
      0
    );

    const formData: any = {
      date: new Date().toISOString().split('T')[0],
      inventoryFor: INVENTROYENUM.PHARMACY,
      category: SALEPURCHASEENUM.SALE,
      discount: Number(form.values.discount),
      paidAmount: Number(form.values.paidAmount),

      totalAmount: Number(originalTotal),
      remarks: form.values.remarks,
      paymentStatus: paymentStatus,
      subTotal: Number(form.values.subTotal),
      paymentMethod: form.values.paymentMethod,
      dueAmount: Number(form.values.totalAmount - form.values.paidAmount),
      productList: selectedMedicine,
      // tax: 13,
      invoiceNo: providedInvoiceNo || generateInvoiceNo(),
      isActive: form.values.patientId
        ? true
        : paymentStatus === 'PAID'
        ? false
        : true,
    };

    if (form.values.supervisor) {
      formData['supervisor'] = form.values.supervisor;
    }

    if (form.values.patientType !== 'new') {
      formData['billingAgainst'] = form.values.patientId;
    }

    if (form.values.patientType === 'new') {
      const walkInCustomer = {
        name: form.values.patient,
        contact: form.values.phoneNo,
      };
      formData['walkInCustomer'] = walkInCustomer;
      if (form.values.reseller) {
        formData['reseller'] = form.values.reseller;
      }
    }
    if (form.values.paymentMethod === 'BANK') {
      formData['bank'] = form.values.bank;
    }

    // if (form.values.currentInvoiceId) {
    //   await updateInvoice({
    //     _id: form.values.currentInvoiceId,
    //     entityData: formData,
    //   });
    //   form.resetForm();
    //   onClose();
    // } else {
    //   await createInvoice(formData);
    //   form.resetForm();

    //   onClose();
    // }
    const selectedMedicines = form.values.selectedMedicine;

    // const prescriptionDetails = (data as any)?.data?.patientHistory[0]
    //   ?.prescriptionDetails[0];

    // if (prescriptionDetails && prescriptionDetails?.prescriptionList) {
    //   // Flag to track if any medicines match
    //   let anyMedicineMatched = false;

    //   // For each selected medicine, find matching item in prescription list
    //   selectedMedicines.forEach((medicine: any) => {
    //     const productId = medicine.item?._id || medicine.item?.productId;

    //     const matchingPrescription = prescriptionDetails.prescriptionList.find(
    //       (prescItem: any) => prescItem?.prescribedMedicine?._id === productId
    //     );

    //     // If found, mark that we've found a match
    //     if (matchingPrescription) {
    //       anyMedicineMatched = true;
    //     }
    //   });

    //   // If any medicine matched, update the top-level status
    //   if (anyMedicineMatched) {
    //     prescriptionDetails.status = 'COMPLETED';
    //   }
    // }
    if (form.values.patientType !== 'new' && form.values.patientId) {
      // await updatePatientHistory({
      //   _id: (data as any)?.data?.patientHistory[0]?._id,
      //   entityData: {
      //     prescriptionDetails: [prescriptionDetails],
      //   },
      // });
    }
    form.resetForm();

    onClose();
  };

  return (
    <div className="flex flex-col p-2 gap-6">
      <p className="text-darkishGreen text-center text-[21px] font-bold">
        Payment
      </p>
      <FormikProvider value={form}>
        <Form className="flex flex-col ">
          <DropdownField
            options={paymentMethodOptions}
            label="payment method"
            value={form.values.paymentMethod}
            onChange={(e) =>
              form.setFieldValue('paymentMethod', e.target.value)
            }
          />
          {form.errors.paymentMethod && (
            <div className="text-red text-[10px] mt-2">
              {form.errors.paymentMethod}
            </div>
          )}
        </Form>

        {form.values.paymentMethod === 'BANK' && (
          <Form className="grid grid-cols-2 border border-whites-200 rounded-lg gap-4 p-6">
            <DropdownField
              label="Bank Name"
              options={bankOptions}
              firstInput="select bank"
              onChange={(e) => {
                form.setFieldValue('bank', e.target.value);
                const selectedBank = bankOptions?.find(
                  (item: any) => item.value === e.target.value
                );
                form.setFieldValue('accountNo', selectedBank?.extra);
              }}
            />
            <InputField
              label="Account Number"
              value={form.values.accountNo}
              onChange={(e) => form.setFieldValue('accountNo', e.target.value)}
            />
          </Form>
        )}
      </FormikProvider>
      <FormikProvider value={form}>
        <Form className="grid grid-cols-2 border border-whites-200 rounded-lg gap-4 p-6">
          <GlobalForm
            formDatails={formField}
            getFieldProps={form.getFieldProps}
            errors={form.errors}
            touched={form.touched}
          />
        </Form>
        <div className="col-span-3">
          <ActionButton
            onCancel={() => {
              onClose?.();
            }}
            submitLabel="Save"
            submitlabelButton
            onSubmit={handleSubmit}
            thirdButton={true}
            thirdButtonLabel="Print & Submit"
            thirdButtonAction={async () => {
              console.log(form.values);
              const currentInvoiceNo = generateInvoiceNo();

              // Update invoice data with the current invoice number for printing
              setInvoiceData((prev: any) => ({
                ...prev,
                invoiceNo: currentInvoiceNo,
              }));

              // Wait a moment for state to update before printing
              setTimeout(() => {
                handlePrint();
              }, 100);

              await handleSubmit(currentInvoiceNo);
            }}
          />
        </div>

        <section className="hidden">
          <PrintableInvoice ref={contentRef} invoiceData={invoiceData} />
        </section>
      </FormikProvider>
    </div>
  );
};
