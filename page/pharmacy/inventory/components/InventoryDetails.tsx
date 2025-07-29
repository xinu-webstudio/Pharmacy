import { useState } from 'react';
import { IMEDICALPRODUCTS } from '../../../../server-action/types/medical-product.type';
import { DrugInformation } from './DrugInformation';
import { BeautyInformation } from './BeautyInformation';
import { getInventoryData } from '../../../../store/pharmacyInventory.store';
import { IUser } from '../../../../server-action/types/user.types';
import { AlternativeHeader } from '../../../../components/AlternativeHeader/AlternativeHeader';

export interface InventoryEntry {
  _id: string;
  date: string;
  batchNo: string;
  invoiceNo: string;
  vendor: IUser;
  purchasedBy: IUser;
  product: IMEDICALPRODUCTS;
  manufacturedDate: string;
  expiryDate: string;
  purchaseRate: number;
  mrpRate: number;
  stockInUse?: number;
  totalAmount: number;
  totalStock: number;
  availableStock: number;
  minimumTreshHold: number;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function InventoryDetails() {
  const inventoryData = getInventoryData();

  // console.log(inventory, 'in');

  // console.log(inventoryData, 'inve');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'batches' | 'history'
  >('overview');

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (error) {
      return dateString;
    }
  };

  // Calculate days until expiry
  const calculateDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color based on inventory status
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'IN-STOCK':
        return 'bg-green text-darkishGreen';
      case 'LOW-STOCK':
        return 'bg-yellow text-white';
      case 'OUT-OF-STOCK':
        return 'bg-red text-white';
      default:
        return 'bg-border text-darkish-black';
    }
  };

  // Get expiry status color
  const getExpiryStatusColor = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return 'text-red';
    if (daysUntilExpiry < 30) return 'text-amber-600';
    if (daysUntilExpiry < 90) return 'text-blue-600';
    return 'text-green-600';
  };

  // Calculate stock percentage
  const stockPercentage = Math.round(
    (inventoryData?.availableStock / inventoryData?.totalStock) * 100
  );

  return (
    <div className="">
      <AlternativeHeader headerTitle="Inventory Details" showBelow={false} />
      <div className=" pl-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {inventoryData?.product?.name?.toUpperCase()}
            </h1>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 mr-3">
                Product Code: {inventoryData?.product?.productCode}
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                {inventoryData?.product?.productCategory}
              </span>
            </div>
          </div>
        </div>

        {/* Stock Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Stock Status
              </h2>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      stockPercentage > 50
                        ? 'bg-green'
                        : stockPercentage > 20
                        ? 'bg-yellow'
                        : 'bg-red'
                    }`}
                    style={{ width: `${stockPercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {stockPercentage}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Available</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {inventoryData?.availableStock}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {inventoryData?.totalStock}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Latest Batch
              </h2>
              {inventoryData?.entries?.length > 0 && (
                <div>
                  <div className="flex items-center mb-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        inventoryData?.availableStock > 40
                          ? 'IN-STOCK'
                          : inventoryData?.availableStock === 0
                          ? 'OUT-OF-STOCK'
                          : 'LOW-STOCK'
                      )}`}
                    >
                      {inventoryData?.availableStock > 40
                        ? 'IN-STOCK'
                        : inventoryData?.availableStock === 0
                        ? 'OUT-OF-STOCK'
                        : 'LOW-STOCK'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Batch No</p>
                      <p className="text-sm font-medium text-gray-900">
                        {
                          inventoryData?.entries[
                            inventoryData?.entries?.length - 1
                          ]?.batchNo
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Expiry</p>
                      <p
                        className={`text-sm font-medium ${getExpiryStatusColor(
                          calculateDaysUntilExpiry(
                            inventoryData?.entries?.[
                              inventoryData?.entries?.length - 1
                            ]?.expiryDate
                          )
                        )}`}
                      >
                        {formatDate(
                          inventoryData?.entries?.[
                            inventoryData?.entries?.length - 1
                          ]?.expiryDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Pricing
              </h2>
              {inventoryData?.entries?.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Purchase Rate</p>
                    <p className="text-xl font-semibold text-gray-900">
                      RS.{' '}
                      {inventoryData?.entries?.[0]?.purchaseRate?.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MRP Rate</p>
                    <p className="text-xl font-semibold text-gray-900">
                      RS.{inventoryData?.entries?.[0]?.mrpRate?.toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-primary '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('batches')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'batches'
                    ? 'border-primary '
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Batches
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Product Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Product Name</p>
                      <p className="text-sm font-medium text-gray-900">
                        {inventoryData?.product?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Product Code</p>
                      <p className="text-sm font-medium text-gray-900">
                        {inventoryData?.product?.productCode}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="text-sm font-medium text-gray-900">
                        {inventoryData?.product?.productCategory}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created On</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(inventoryData?.product?.createdAt ?? '')}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  {inventoryData?.product?.productCategory ===
                    'BEAUTIES-SKIN-CARE' && (
                    <BeautyInformation inventoryData={inventoryData} />
                  )}

                  {inventoryData?.product?.productCategory === 'DRUG' && (
                    <DrugInformation inventoryData={inventoryData} />
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'batches' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Batch Information
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Batch No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Invoice
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Manufactured
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Expiry
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryData?.entries?.map((entry) => (
                      <tr key={entry?._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry?.batchNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry?.invoiceNo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(entry?.manufacturedDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`${getExpiryStatusColor(
                              calculateDaysUntilExpiry(entry?.expiryDate)
                            )}`}
                          >
                            {formatDate(entry?.expiryDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry?.availableStock} / {entry?.totalStock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              entry?.availableStock > entry?.minimumTreshHold
                                ? 'IN-STOCK'
                                : entry?.availableStock === 0
                                ? 'OUT-OF-STOCK'
                                : 'LOW-STOCK'
                            )}`}
                          >
                            {entry?.availableStock > entry?.minimumTreshHold
                              ? 'IN-STOCK'
                              : entry?.availableStock === 0
                              ? 'OUT-OF-STOCK'
                              : 'LOW-STOCK'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
