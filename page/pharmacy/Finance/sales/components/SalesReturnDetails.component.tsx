import { Icon } from '@iconify/react/dist/iconify.js';
import type React from 'react';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';

// Sample data for demonstration
// const sampleReturnData: IMainInvoiceController = {
//   inventoryFor: 'Medical Store',
//   date: '2024-01-15',
//   batchNo: 'BTH001',
//   invoiceNo: 'INV-2024-001',
//   predefinedBillNo: 'PB-001',
//   vendor: {
//     name: 'MedSupply Corp',
//     email: 'vendor@medsupply.com',
//     contact: '+1-555-0123',
//     address: '123 Medical District, Healthcare City',
//     _id: 'vendor_001',
//   },
//   purchasedBy: {
//     name: 'John Pharmacist',
//     email: 'john@pharmacy.com',
//     contact: '+1-555-0124',
//     address: '456 Pharmacy St',
//     _id: 'user_001',
//   },
//   billingAgainst: {
//     name: 'Jane Customer',
//     email: 'jane@email.com',
//     contact: '+1-555-0125',
//     address: '789 Customer Ave',
//     _id: 'customer_001',
//   },
//   walkInCustomer: {
//     name: 'Walk-in Customer',
//     contact: '+1-555-0126',
//     address: 'Unknown Address',
//   },
//   category: 'Prescription Medicines',
//   productList: [
//     {
//       hProduct: {
//         name: 'Paracetamol 500mg',
//         category: 'Pain Relief',
//         manufacturer: 'PharmaCorp',
//         _id: 'prod_001',
//       },
//       pProduct: {
//         name: 'Paracetamol 500mg',
//         category: 'Pain Relief',
//         manufacturer: 'PharmaCorp',
//         _id: 'prod_001',
//       },
//       hBatch: {
//         batchNumber: 'BTH001',
//         quantity: 100,
//         expiryDate: '2025-12-31',
//         _id: 'batch_001',
//       },
//       manufacturedDate: '2024-01-01',
//       expiryDate: '2025-12-31',
//       purchaseRate: 5.0,
//       mrpRate: 8.0,
//       totalAmount: 40.0,
//       quantity: 5,
//       _id: 'inv_001',
//     },
//     {
//       hProduct: {
//         name: 'Amoxicillin 250mg',
//         category: 'Antibiotic',
//         manufacturer: 'MediLab',
//         _id: 'prod_002',
//       },
//       pProduct: {
//         name: 'Amoxicillin 250mg',
//         category: 'Antibiotic',
//         manufacturer: 'MediLab',
//         _id: 'prod_002',
//       },
//       hBatch: {
//         batchNumber: 'BTH002',
//         quantity: 50,
//         expiryDate: '2025-06-30',
//         _id: 'batch_002',
//       },
//       manufacturedDate: '2024-01-15',
//       expiryDate: '2025-06-30',
//       purchaseRate: 12.0,
//       mrpRate: 18.0,
//       totalAmount: 54.0,
//       quantity: 3,
//       _id: 'inv_002',
//     },
//   ],
//   totalAmount: 94.0,
//   discount: 4.0,
//   tax: 9.4,
//   payableAmount: 99.4,
//   subTotal: 94.0,
//   paidAmount: 99.4,
//   dueAmount: 0.0,
//   transactionNo: 'TXN-2024-001',
//   paymentMethod: 'Credit Card',
//   paymentStatus: 'Completed',
//   bank: {
//     bankName: 'Healthcare Bank',
//     accountNumber: '1234567890',
//     ifscCode: 'HCBK0001234',
//   },
//   supervisor: {
//     name: 'Dr. Smith',
//     email: 'dr.smith@pharmacy.com',
//     contact: '+1-555-0127',
//     address: 'Pharmacy Headquarters',
//     _id: 'supervisor_001',
//   },
//   isActive: true,
//   _id: 'invoice_001',
// };

const SalesReturnDetails: React.FC<{
  returnData?: IMainInvoiceController;
}> = ({ returnData }) => {
  console.log(returnData);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sales Return
            </h1>
            <p className="text-gray-600">
              Return processed for invoice #{returnData?.invoiceNo}
            </p>
          </div>
          <div className="text-right">
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
              RETURN
            </div>
            <p className="text-sm text-gray-600">
              Date: {new Date(returnData?.date ?? '').toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Icon
              icon="mdi:user-outline"
              className="h-5 w-5 text-gray-600 mr-2"
            />
            <h3 className="font-semibold text-gray-900">Customer Details</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">
                {returnData?.walkInCustomer?.name ??
                  returnData?.billingAgainst?.commonInfo?.personalInfo
                    ?.fullName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Contact:</span>
              <span className="font-medium">
                {returnData?.walkInCustomer?.contact ??
                  returnData?.billingAgainst?.commonInfo?.contactInfo?.phone
                    ?.primaryPhone}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium text-right max-w-32 truncate">
                {returnData?.walkInCustomer?.address ??
                  returnData?.billingAgainst?.commonInfo?.contactInfo?.address
                    ?.currentAddress}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Icon
              icon="mdi:file-outline"
              className="h-5 w-5 text-gray-600 mr-2"
            />
            <h3 className="font-semibold text-gray-900">Invoice Details</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Invoice No:</span>
              <span className="font-medium">{returnData?.invoiceNo}</span>
            </div>

            {returnData?.transactionNo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction No:</span>
                <span className="font-medium">{returnData?.transactionNo}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products Returned */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Products Returned
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Product Name
                </th>

                <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900">
                  Batch No
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-900">
                  Quantity Returned
                </th>
                <th className="border border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-900">
                  Unit Price (RS.)
                </th>
                <th className="border border-gray-200 px-4 py-3 text-right text-sm font-semibold text-gray-900">
                  Total Amount (RS.)
                </th>
              </tr>
            </thead>
            <tbody>
              {returnData?.productList?.map((product, index) => (
                <tr key={product._id || index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {product?.pProduct?.name}
                      </div>
                    </div>
                  </td>

                  <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                    B-{product?.pBatch?.batchNo?.split('BATCH')[1]}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      {product?.quantity}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-right text-sm text-gray-900">
                    {product?.pBatch?.mrpRate?.toFixed(0)}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-right font-medium text-gray-900">
                    {product?.totalAmount?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Return Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">
                {returnData?.subTotal?.toFixed(0) ||
                  returnData?.totalAmount.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount:</span>
              <span className="font-medium text-green-600">
                -RS. {returnData?.discount.toFixed(0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax:</span>
              <span className="font-medium">
                RS. {returnData?.tax?.toFixed(2)}
              </span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">
                  Total Return Amount:
                </span>
                <span className="font-bold text-lg text-red-600">
                  RS. {returnData?.payableAmount?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReturnDetails;
