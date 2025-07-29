import { IMedicalProductInventory } from '../../../../server-action/api/pharmacy-inventory.api';

interface propTypes {
  item: IMedicalProductInventory;
  onClick?: (item: IMedicalProductInventory) => void;
}

export const MedicinCard = ({ item, onClick }: propTypes) => {
  return (
    <div
      className="flex flex-col shadow-md p-3 rounded-md   gap-3 cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <section className="flex w-full justify-between">
        <div>
          <p className="text-sm font-semibold">{item?.product?.name}</p>
          <p>{item?.product?.drug?.strength}</p>
        </div>

        {item?.product?.prescriptionRequired && (
          <p className="bg-[#FFF1F1] rounded text-red px-2 h-fit">Rx</p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <p>{item?.product?.name}</p>

        <div className="flex flex-col">
          <p className="text-[#47515C] text-[12px] font-medium">
            Batch No: {item?.batchNo}
          </p>
          <p className="text-[#47515C] text-[12px] font-medium">
            Exp. Date: {item?.expiryDate}
          </p>
        </div>
      </section>

      <section className="flex justify-between place-items-center">
        <p className="text-primaryBlue">Rs. {item?.mrpRate}</p>
        <p className="text-[#47515C]">Stock: {item?.availableStock}</p>
      </section>
    </div>
  );
};
