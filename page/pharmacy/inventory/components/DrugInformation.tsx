interface propTypes {
  inventoryData: any;
}

export const DrugInformation = ({ inventoryData }: propTypes) => {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-900 mb-3">
        Drug Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Generic Name</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.genericName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Brand Name</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.brandName}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Strength</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.strength}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Form</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.form}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Route</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.route}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Use Case</p>
          <p className="text-sm font-medium text-gray-900">
            {inventoryData?.product?.drug?.useCase}
          </p>
        </div>
      </div>
    </div>
  );
};
