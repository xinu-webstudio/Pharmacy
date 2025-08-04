import { Icon } from '@iconify/react/dist/iconify.js';
import { IMedicalProductInventory } from '../../../../server-action/api/pharmacy-inventory.api';

interface propTypes {
  modalProps: {
    open: boolean;
    selectedData: IMedicalProductInventory;
  };
  setModalProps: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      selectedData: IMedicalProductInventory;
    }>
  >;
}

export const InventoryProductDetails = ({
  modalProps,
  setModalProps,
}: propTypes) => {
  const productDetails = [
    {
      title: 'Batch no.',
      value: modalProps?.selectedData?.batchNo,
    },
    {
      title: 'Current Stock',
      value: modalProps?.selectedData?.availableStock,
    },
    {
      title: 'Min. requirement stock',
      value: modalProps?.selectedData?.minimumTreshHold,
    },
    {
      title: 'Unit price',
      value: modalProps?.selectedData?.mrpRate,
    },
    {
      title: 'Total price',
      value: modalProps?.selectedData?.purchaseRate,
    },
    {
      title: 'Expiry date',
      value: modalProps?.selectedData?.expiryDate,
    },
    {
      title: 'Manufacture date',
      value: modalProps?.selectedData?.manufacturedDate,
    },
  ];

  const supplierDetails = [
    {
      title: 'Supplier name',
      value:
        modalProps?.selectedData?.vendor?.commonInfo?.personalInfo?.fullName,
    },
    {
      title: 'Email',
      value: modalProps?.selectedData?.vendor?.email,
    },
    {
      title: 'Phone',
      value:
        modalProps?.selectedData?.vendor?.commonInfo?.contactInfo?.phone
          ?.primaryPhone,
    },
  ];

  return (
    <div className="flex flex-col  px-2 gap-3">
      <section className="flex place-items-center justify-between border-b pb-[10px]  border-b-[#BDBDBD]">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl">
            #MED-{modalProps.selectedData?.batchNo?.split('BATCH')[1]}
          </p>
          <p className="text-sm">Medicine details</p>
        </div>
        <div onClick={() => setModalProps({ ...modalProps, open: false })}>
          <Icon icon="material-symbols:close-rounded" />
        </div>
      </section>

      <section className="flex flex-col gap-3 border-b border-b-[#BDBDBD] pb-[10px] py-2">
        <p className="font-semibold text-sm">Item</p>

        <div className="flex justify-between place-items-center">
          <section className="flex flex-col gap-1">
            <p className="text-sm font-semibold">
              {modalProps.selectedData?.product?.name}
            </p>
            <p className=" text-sm text-[#656565]">
              {modalProps.selectedData?.product?.drug?.form}
            </p>
          </section>

          <section className="flex place-items-center gap-1">
            <div
              className={`w-[8px] h-[8px] rounded-full ${
                modalProps.selectedData?.status === 'IN-STOCK'
                  ? 'bg-[#17878e]'
                  : modalProps.selectedData?.status === 'LOW-STOCK'
                  ? 'bg-[#ffcc00]'
                  : 'bg-[#ff3b2f]'
              }`}
            />
            <p className=" text-sm text-[#656565]">
              {modalProps.selectedData?.status}
            </p>
          </section>
        </div>
      </section>

      <section className="flex flex-col gap-5 border-b border-b-[#BDBDBD] pb-[10px]">
        {productDetails?.map((item) => (
          <div className="flex place-items-center justify-between">
            <p>{item.title}</p>
            <p className="text-[#6B7290]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-5 ">
        {supplierDetails?.map((item) => (
          <div className="flex place-items-center justify-between">
            <p>{item.title}</p>
            <p className="text-[#6B7290]">{item.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
