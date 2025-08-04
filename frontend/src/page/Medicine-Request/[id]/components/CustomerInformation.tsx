import { Form, FormikProvider, useFormik } from 'formik';
import { GlobalForm } from '../../../../global/GlobalForm.component';
import MasterTable from '../../../../global/MasterTable.component';
import Button from '../../../../global/Button.component';
import { IMainInvoiceController } from '../../../../server-action/types/master-invoice.types';
import { get } from 'lodash';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { PrintableInvoice } from './NewPharmacyBill';

interface propTypes {
  invoice: IMainInvoiceController;
}
export const CustomerInformation = ({ invoice }: propTypes) => {
  console.log(invoice, 'invoice');
  const customerFormData = [
    {
      type: 'date',
      field: 'requestDate',
      label: 'Requested Date',
      disabled: true,
    },
    {
      type: 'text',
      field: 'patientName',
      label: 'Patient Name',
      disabled: true,
    },
    {
      type: 'text',
      field: 'doctorName',
      label: 'Doctor Name',
      isVisible: invoice?.supervisor ? true : false,
      disabled: true,
    },
    {
      type: 'text',
      field: 'department',
      label: 'Department',
      disabled: true,
      isVisible: invoice?.supervisor ? true : false,
    },
    {
      type: 'text',
      field: 'status',
      label: 'Status',
      disabled: true,
    },
    {
      type: 'text',
      field: 'note',
      label: 'Note',
    },
  ];

  const formik = useFormik({
    initialValues: {
      requestDate: get(invoice, 'date'),
      patientName:
        invoice?.walkInCustomer?.name ??
        invoice?.billingAgainst?.commonInfo?.personalInfo?.fullName ??
        '',
      doctorName:
        get(invoice, 'supervisor.commonInfo.personalInfo.fullName') ?? '',
      department: get(invoice, 'billingAgainst.commonInfo.ipdOpd') ?? '',
      status: invoice?.isActive ? 'Active' : 'InActive',
      note: '',
    },
    onSubmit: () => {},
  });

  const contentRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Invoice-${invoice?.invoiceNo ?? ''}`,
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
    if (invoice) {
      formik.setValues({
        requestDate: get(invoice, 'date') || '',
        patientName:
          invoice?.walkInCustomer?.name ??
          invoice?.billingAgainst?.commonInfo?.personalInfo?.fullName ??
          '',
        doctorName:
          get(invoice, 'supervisor.commonInfo.personalInfo.fullName') || '',
        department: get(invoice, 'billingAgainst.commonInfo.ipdOpd') || '',
        status: invoice?.isActive ? 'Active' : 'InActive',
        note: '',
      });
    }
  }, [invoice]);

  const tableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Dose', key: 'dose' },
      { title: 'Frequency', key: 'frequency' },
      { title: 'Duration', key: 'duration' },
      { title: 'Quantity', key: 'quantity' },
      { title: 'Unit Price', key: 'price' },
      { title: 'Tax (%)', key: 'tax' },
      { title: 'Discount', key: 'discount' },

      { title: 'Total Price', key: 'total' },
    ],
    rows: invoice?.productList?.map((item: any, index: number) => ({
      sn: index + 1,
      product: item?.pProduct?.name ?? '-',
      quantity: item?.quantity ?? '-',
      price: item?.totalAmount / item?.quantity,
      total: item?.payableAmount?.toFixed(2) ?? '-',
      dose: item?.doses ?? '-',
      tax: item?.tax?.toFixed(2) ?? '-',
      discount: item?.discount?.toFixed(2) ?? '-',
      frequency: item?.frequency ?? '-',
      duration: item?.duration ?? '-',
    })),
  };

  const { handleSubmit, errors, touched } = formik;

  return (
    <div className="flex flex-col gap-3 ">
      <section className="flex flex-col gap-3 bg-white p-6">
        <p className="text-darkish-black font-semibold text-base">
          Customer Information
        </p>

        <FormikProvider value={formik}>
          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 gap-5 w-full "
          >
            <GlobalForm
              formDatails={customerFormData}
              getFieldProps={formik.getFieldProps}
              errors={errors as any}
              touched={touched as any}
            />
          </Form>
        </FormikProvider>
      </section>
      <MasterTable
        rows={tableData.rows}
        columns={tableData.columns}
        loading={false}
        color="bg-whites-100"
        textcolor="#353537"
      />

      <section className="flex justify-end">
        <Button title="Print Request" onClick={handlePrint} />
      </section>
      <section className="hidden">
        <PrintableInvoice ref={contentRef} invoiceData={invoice} />
      </section>
    </div>
  );
};
