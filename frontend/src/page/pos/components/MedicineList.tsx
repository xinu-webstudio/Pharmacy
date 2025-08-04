import { toast } from 'react-toastify';
import { buildQueryParams } from '../../../../hooks/useBuildQuery.hooks';
import { useGetPharmacyInventory } from '../../../../server-action/api/pharmacy-inventory.api';
import { CombinedInventoryDetailsTypes } from '../../../../server-action/types/medical-inventory.types';
import { IMEDICALPRODUCTS } from '../../../../server-action/types/medical-product.type';
import { ProductCategory } from '../../../../constants/constants';

interface propTypes {
  form?: any;
}

const getProductForm = (product: IMEDICALPRODUCTS) => {
  let form: any = '-';

  switch (product?.productCategory) {
    case ProductCategory.DRUG:
      form = product?.drug?.strength;
      break;
    case ProductCategory.BEAUTIESSKINCARE:
      form = product?.beautySkinCare?.volume;
      break;
    case ProductCategory.MEDICALSUPPLIES:
      form = product?.medicalSupplies?.size;
      break;
    case ProductCategory.DEVICES:
      form = product?.device?.size;
      break;
    case ProductCategory.OTHER:
      form = product?.other?.model;
      break;
    default:
      form = '-';
      break;
  }

  return form;
};

export const MedicineList = ({ form }: propTypes) => {
  const queryParams = buildQueryParams({
    search: form.values.search,
    combinedData: 1,
    limit: 1000000,
    productCategory: form.values.productCategory,
  });
  const { data: medicalProducts } = useGetPharmacyInventory(queryParams);

  return (
    <div className="grid grid-cols-4 gap-4">
      {(medicalProducts as any)?.data?.medicalProductsInventory?.map(
        (item: CombinedInventoryDetailsTypes, index: number) => (
          <div
            key={index}
            className="flex flex-col bg-[#F2F3F5] px-1 py-2 rounded-md items-center  gap-7 cursor-pointer"
            onClick={() => {
              const originalValue = form?.values?.selectedMedicine;

              const medicineForm =
                item?.product?.productCategory === ProductCategory.DRUG &&
                item?.product?.drug?.form;

              const strength =
                item?.product?.productCategory === ProductCategory.DRUG
                  ? item?.product?.drug?.strength
                  : item?.product?.productCategory ===
                    ProductCategory.BEAUTIESSKINCARE
                  ? item?.product?.beautySkinCare?.volume
                  : '-';

              if (item?.availableStock <= 0) {
                return toast.info('No stock available');
              }

              const availableEntries = item?.entries?.filter(
                (sub: any) => sub?.availableStock > 0
              );

              if (originalValue?.length > 0) {
                const alreadyExists = originalValue.some(
                  (med: any) => med.item?._id === item.product?._id
                );
                if (alreadyExists) {
                  return toast.info(
                    'Selected medicine already exists, try by removing it'
                  );
                } else {
                  form.setFieldValue('selectedMedicine', [
                    ...originalValue,
                    {
                      quantity: 0,
                      item: {
                        // batchNo: item?.batchNo,
                        options: availableEntries?.map((item) => ({
                          label: item?.batchNo?.includes('BATCH')
                            ? `B-${item?.batchNo?.split('BATCH')[1]}`
                            : item?.batchNo,
                          value: item?._id,
                          mrpRate: item?.mrpRate,
                          availableStock: item?.availableStock,
                          expiryDate: item?.expiryDate,
                          batchNo: item?.batchNo,
                        })),
                        batchId: item?.product?._id,
                        product: item?.product?.name,
                        productCategory: item?.product?.productCategory,
                        strength,
                        productId: item?.product?._id,
                        _id: item?.product?._id,
                        fromInvoice: false,
                        medicineForm,
                      },
                    },
                  ]);
                }
              }
              form.setFieldValue('selectedMedicine', [
                ...originalValue,
                {
                  quantity: 0,
                  item: {
                    options: availableEntries?.map((item) => ({
                      label: item?.batchNo?.includes('BATCH')
                        ? `B-${item?.batchNo?.split('BATCH')[1]}`
                        : item?.batchNo,
                      value: item?._id,
                      mrpRate: item?.mrpRate,
                      availableStock: item?.availableStock,
                      expiryDate: item?.expiryDate,
                      batchNo: item?.batchNo,
                    })),
                    product: item?.product?.name,
                    productId: item?.product?._id,
                    productCategory: item?.product?.productCategory,
                    strength,
                    _id: item?.product?._id,
                    batchId: item?._id,
                    fromInvoice: false,
                    medicineForm,
                  },
                },
              ]);
            }}
          >
            <section className="flex flex-col text-center gap-1 ">
              <div className="flex flex-col   gap-[4px] ">
                <p className="text-base">{item?.product?.name ?? '-'}</p>
                {/* <p>paracetamol</p> */}
                <p className="text-[12px] place-self-center">
                  {getProductForm(item?.product)}
                </p>
              </div>
            </section>

            <section>
              <p
                className={`text-xs font-semibold px-4 py-1 text-center rounded-full  ${
                  item?.availableStock > 15
                    ? 'bg-green text-white'
                    : item?.availableStock === 0
                    ? 'bg-red text-white'
                    : 'bg-yellow'
                }`}
              >
                {item?.availableStock}
              </p>
            </section>
          </div>
        )
      )}
    </div>
  );
};
