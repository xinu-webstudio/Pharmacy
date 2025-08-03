import { IMEDICALPRODUCTS } from '../../../../server-action/types/medical-product.type';

interface propTypes {
  inventoryData: {
    product: IMEDICALPRODUCTS;
  };
}

export const BeautyInformation = ({ inventoryData }: propTypes) => {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 mb-3">
        Product Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Common Name</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.beautySkinCare?.commonName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Brand Name</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.beautySkinCare?.brandName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Packaging</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.beautySkinCare?.packaging}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Volume</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.beautySkinCare?.volume}
          </p>
        </div>
      </div>
    </div>
  );
};
