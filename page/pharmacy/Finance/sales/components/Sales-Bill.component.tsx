import React from 'react';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';

export const PharmacyInvoicePrintable = React.forwardRef<
  HTMLDivElement,
  { invoice: IMainInvoiceController }
>(({ invoice }, ref) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NRS',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        '0'
      )}-${String(date.getDate()).padStart(2, '0')}`;
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div ref={ref} className="bg-white p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-teal-700">
              Pharmacy Invoice
            </h1>
            <p className="text-gray-500">{invoice?.inventoryFor} Department</p>
          </div>
          <div className="text-right">
            <h1 className="text-lg font-bold">
              Aarogya Niketan Hospital Pvt. Ltd.
            </h1>
            <p className="text-xs">Janakpurdham-08, Dhanusha, Nepal</p>
            <p className="text-xs">
              hospitalaarogyaniketan@gmail.com | 9815366625
            </p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
          <div>
            <div className="grid grid-cols-1 gap-1">
              {invoice?.invoiceNo && (
                <div className="flex place-items-center gap-1">
                  <span className="font-semibold">Invoice No:</span>
                  <span>{invoice?.invoiceNo}</span>
                </div>
              )}

              <div className="flex place-items-center gap-1">
                <span className="font-semibold">Bill No:</span>
                <span>{invoice?.predefinedBillNo}</span>
              </div>

              <div className="flex place-items-center gap-1">
                <span className="font-semibold">Date:</span>
                <span>{formatDate(invoice?.date)}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-[120px_1fr] gap-1">
              <span className="font-semibold">User:</span>
              <span>
                {invoice?.walkInCustomer?.name ??
                  invoice?.billingAgainst?.commonInfo?.personalInfo?.fullName}
              </span>

              <span className="font-semibold">Email:</span>
              <span>{invoice?.billingAgainst?.email ?? 'N/A'}</span>

              <span className="font-semibold">Phone:</span>
              <span>
                {invoice?.walkInCustomer?.contact ??
                  invoice?.billingAgainst?.commonInfo?.contactInfo?.phone
                    ?.primaryPhone}
              </span>
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Batch No.</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">QTY</th>
                <th className="text-right p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {invoice?.productList?.map((product) => (
                <tr key={product?._id} className="border-b">
                  <td className="p-2">{product?.pProduct?.name}</td>
                  <td className="p-2">{product?.pBatch?.batchNo}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(product?.pBatch?.mrpRate ?? 1)}
                  </td>
                  <td className="p-2 text-right">{product?.quantity}</td>
                  <td className="p-2 text-right">
                    {formatCurrency(
                      (product?.pBatch?.mrpRate ?? 1) * (product?.quantity ?? 1)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Payment Information</h3>
              <div className="grid grid-cols-[120px_1fr] gap-1">
                {invoice?.transactionNo && (
                  <span className="font-semibold">Transaction:</span>
                )}
                {invoice?.transactionNo && (
                  <span>{invoice?.transactionNo}</span>
                )}

                <span className="font-semibold">Payment Status:</span>
                <span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      invoice?.paymentStatus === 'Paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {invoice?.paymentStatus}
                  </span>
                </span>

                <span className="font-semibold">Payment Method:</span>
                <span>{invoice?.paymentMethod}</span>

                {invoice?.bank?.bankName && (
                  <>
                    <span className="font-semibold">Bank:</span>
                    <span>{invoice?.bank?.bankName}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Amount Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(invoice?.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>{formatCurrency(invoice?.discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>{formatCurrency(invoice?.tax)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>{formatCurrency(invoice?.payableAmount)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Paid Amount:</span>
                  <span>{formatCurrency(invoice?.paidAmount)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Due Amount:</span>
                  <span>{formatCurrency(invoice?.dueAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="font-semibold">Purchased By:</p>
              <p>
                {invoice?.walkInCustomer?.name ??
                  invoice?.purchasedBy?.commonInfo?.personalInfo?.fullName}
              </p>
              <p className="text-sm text-gray-500">
                {invoice?.purchasedBy?.email}
              </p>
            </div>

            {invoice?.supervisor && (
              <div>
                <p className="font-semibold">Supervised By:</p>
                <p>{invoice?.supervisor?.commonInfo?.personalInfo?.fullName}</p>
                <p className="text-sm text-gray-500">
                  {invoice?.supervisor?.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
