import { forwardRef } from 'react';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';
import { useAuth } from '../../../../../hooks';
import { numberToWordsEnhanced } from '../../../../../utils/NumberToWord';

interface InvoiceProps {
  invoiceData?: IMainInvoiceController;
  // Optional override props for custom display
  companyName?: string;
  companyPAN?: string;
  companyAddress?: string;
  companyPhone?: string;
}

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ne-NP').replace(/\//g, '/');
};

// Helper function to format time
const formatTime = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('ne-NP', {
    timeZone: 'Asia/Kathmandu',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

// Printable Invoice Component (without print button)
export const PrintableInvoice = forwardRef<HTMLDivElement, InvoiceProps>(
  (
    {
      invoiceData,
      companyName = 'Aarogya Niketan Hospital Pvt. Ltd.',
      companyPAN = '601247377',
      companyAddress = 'Janakpurdham-08, Dhanusha, Nepal',
      companyPhone = '01-5091609',
    },
    ref
  ) => {
    const { data: userData } = useAuth();
    const printerName = userData?.user?.fullName;
    // Extract data from invoiceData or use defaults
    const invoiceNo = invoiceData?.invoiceNo || 'LASRD25814';
    const transactionDate = invoiceData?.date
      ? formatDate(invoiceData.date)
      : '2023/02/20';
    const time = invoiceData?.date
      ? formatTime(invoiceData.date)
      : formatTime(new Date().toString());
    const invoiceDate = invoiceData?.date
      ? formatDate(invoiceData.date)
      : '2023/02/20';
    const billNo = invoiceData?.predefinedBillNo || '2025/066/13';

    // Customer details
    const customerName =
      invoiceData?.walkInCustomer?.name ||
      invoiceData?.billingAgainst?.commonInfo?.personalInfo?.fullName ||
      'N/A';
    const customerAddress =
      invoiceData?.walkInCustomer?.address ||
      invoiceData?.billingAgainst?.commonInfo?.contactInfo?.address
        ?.currentAddress ||
      'N/A';
    const customerContact =
      invoiceData?.walkInCustomer?.contact ||
      invoiceData?.billingAgainst?.commonInfo?.contactInfo?.phone
        ?.primaryPhone ||
      'N/A';

    // Prescriber
    const prescribedBy =
      invoiceData?.supervisor?.commonInfo?.personalInfo?.fullName || 'N/A';

    // Financial details
    const total = invoiceData?.totalAmount || 415.5;
    const discount = invoiceData?.discount || 0.0;
    const netAmount = invoiceData?.payableAmount || 415.0;

    // Staff details
    const dispensedBy =
      invoiceData?.walkInCustomer?.name ||
      invoiceData?.billingAgainst?.commonInfo?.personalInfo?.fullName ||
      'N/A';
    const supervisor =
      invoiceData?.supervisor?.commonInfo?.personalInfo?.fullName || 'N/A';
    const printTime = time;

    // Payment details
    const paymentMethod = invoiceData?.paymentMethod || 'Credit';
    const paymentStatus = invoiceData?.paymentStatus || 'Paid';

    // Convert products to medication format
    const medications = invoiceData?.productList?.map((product, index) => ({
      sn: `${index + 1}.`,
      particular:
        product?.hProduct?.name ||
        product?.pProduct?.name ||
        // product.hProduct?. ||
        // product.pProduct?.brandName ||
        'MEDICATION',
      batch:
        product?.pBatch?.batchNo || product?.batches?.[0]?.batchNo || 'N/A',
      expiry: product?.pBatch ? formatDate(product?.pBatch?.expiryDate) : '',
      // tax: product?.tax?.toFixed(2) || 0,
      // discount: product?.discount?.toFixed(2) || 0,
      qty: product?.quantity,
      rate: product?.totalAmount,
      amount: product?.payableAmount || product?.totalAmount,
    }));

    const amountInWords = numberToWordsEnhanced(netAmount, {
      locale: 'IN',
      currency: 'RS',
      subCurrency: 'PAISA',
    });

    return (
      <div
        ref={ref}
        className="bg-white border border-gray-300 p-6 shadow-sm print:shadow-none print:border-none print:p-0 relative"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold uppercase">{companyName}</h1>
          <p className="text-sm">PAN: {companyPAN}</p>
          <p className="text-sm">{companyAddress}</p>
          <p className="text-sm">Ph: {companyPhone}</p>
        </div>

        {/* Invoice Details */}
        <div className="flex flex-wrap justify-between text-sm mb-4">
          <div className="flex-1">
            <p>
              <span className="font-semibold">Invoice No.: </span>
              {invoiceNo}
            </p>
            <p>
              <span className="font-semibold">Time: </span>
              {time}
            </p>
          </div>
          <div className="flex-1 text-right">
            <p>
              <span className="font-semibold">Transaction Date: </span>
              {transactionDate}
            </p>
            <p>
              <span className="font-semibold">Invoice Date: </span>
              {invoiceDate}
            </p>
            <p>
              <span className="font-semibold">Bill No.: </span>
              {billNo}
            </p>
          </div>
        </div>

        {/* Customer Details */}
        <div className="text-sm mb-4">
          <h2 className="text-center font-bold text-lg mb-1">INVOICE</h2>
          <div className="flex flex-wrap justify-between">
            <div className="flex-1">
              <p>
                <span className="font-semibold">Name: </span>
                {customerName}
              </p>
              <p>
                <span className="font-semibold">Address: </span>
                {customerAddress}
              </p>
              <p>
                <span className="font-semibold">Contact: </span>
                {customerContact}
              </p>
            </div>
            <div className="flex-1 text-right">
              <p>
                <span className="font-semibold">Billing Mode: </span>
                {invoiceData?.billingAgainst?.commonInfo?.ipdOpd || 'OPD'}
              </p>
              <p>
                <span className="font-semibold">Payment Method: </span>
                {paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment Status: </span>
                {paymentStatus}
              </p>
            </div>
          </div>
          {prescribedBy !== 'N/A' && (
            <p className="mt-1">
              <span className="font-semibold">Prescribed By: </span>
              {prescribedBy}
            </p>
          )}
        </div>

        <div className="border-black border-2 border-dashed " />
        <div className="border-black border-2 border-dashed mt-[.5px] mb-2" />

        {/* Medication Table */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className=" border-b border-gray-300">
                <th className="py-1 text-left w-8">Sn.</th>
                <th className="py-1 text-left">Particular</th>
                <th className="py-1 text-left">Batch</th>
                <th className="py-1 text-left">Expiry</th>
                <th className="py-1 text-right">Qty</th>
                {/* <th className="py-1 text-right">TAX (%)</th> */}
                {/* <th className="py-1 text-right">Discount (%)</th> */}

                <th className="py-1 text-right">Rate</th>
                <th className="py-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {medications?.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-1">{item?.sn}</td>
                  <td className="py-1">{item?.particular}</td>
                  <td className="py-1">{item?.batch}</td>
                  <td className="py-1">{item?.expiry}</td>
                  <td className="py-1 text-right">{item?.qty}</td>
                  {/* <td className="py-1 text-right">{item?.tax}</td> */}
                  {/* <td className="py-1 text-right">{item?.discount}</td> */}

                  <td className="py-1 text-right">{item?.rate?.toFixed(2)}</td>
                  <td className="py-1 text-right">
                    {item?.amount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end text-sm mb-4">
          <div className="w-48">
            <div className="flex justify-between border-t border-gray-300 pt-1">
              <span className="font-semibold">TOTAL:</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">DISCOUNT:</span>
              <span>{discount.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span className="font-semibold">TAX:</span>
              <span>{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">ROUNDING:</span>
              <span>{rounding.toFixed(2)}</span>
            </div> */}
            <div className="flex justify-between border-t border-b border-gray-300 py-1 font-semibold">
              <span>NET AMOUNT:</span>
              <span>{netAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Customer Copy */}
        <div className="text-center text-sm mb-2">
          <p className="font-semibold">CUSTOMER COPY</p>
          <p className="font-semibold">In Words: {amountInWords}</p>
        </div>

        {/* Footer Notes */}
        <div className="text-xs italic mb-4">
          <p className="mb-1">
            Don&apos;t accept substitute, ask your DOCTOR first. E. & O. E.
          </p>
          <p>Medicines sold would not be taken back after seven days.</p>
          <p className="mt-1">Note:</p>
        </div>

        {/* Counter Info */}
        <div className="text-xs border-t border-gray-300 pt-2">
          <div className="flex justify-between">
            <div>
              <p>
                <span className="font-semibold">Transaction No: </span>
                {invoiceData?.transactionNo || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p>
                <span className="font-semibold">Purchased By: </span>
                {dispensedBy}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <div>
              <p>
                <span className="font-semibold">Supervisor: </span>
                {supervisor}
              </p>
            </div>
            {/* <div className="text-center">
              <p>
                <span className="font-semibold">DISPENSED BY: </span>
                {dispensedBy}
              </p>
            </div> */}
            <div className="text-right">
              <p>
                <span className="font-semibold">Printed By: </span>
                {printerName} {printTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PrintableInvoice.displayName = 'PrintableInvoice';
