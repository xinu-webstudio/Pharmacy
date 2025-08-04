import { ProductCategory } from '../../../constants/constants';
import { buildQueryParams } from '../../../hooks/useBuildQuery.hooks';
import { useOutsideClick } from '../../../hooks/useOutsideClick.hook';
import { FormikProvider } from 'formik';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { PopupModal } from '../../../global/PopupModal.component';
import { Text } from '../../../global/Text.component';
import { AddPharmacyProduct } from '@/page/inventory/components/AddPharmacyProduct.component';

interface propTypes {
  formik: any;
}

export const MedicineList = ({ formik }: propTypes) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const medicineListRef = useRef<HTMLDivElement>(null);
  const [viewModal, setViewModal] = useState(false);

  const modalRef = useOutsideClick(() => setViewModal(false));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [medicineListHeight, setMedicineListHeight] = useState<number>(0);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);

  const [search, setSearch] = useState('');

  const queryParams = buildQueryParams({
    search: search,
    // combinedData: 1,
    limit: 1000000,
    productCategory: formik.values.productCategory,
  });
  // const { data: pharmacyInventory } = useGetPharmacyInventory(queryParams);

  // const medicalProducts: IMedicalProductInventory[] = (pharmacyInventory as any)
  //   ?.data?.medicalProductsInventory;

  const medicineCateogry = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Medicine',
      value: ProductCategory.DRUG,
    },
    {
      label: 'Medical Device',
      value: ProductCategory.DEVICES,
    },
    {
      label: 'Skin Product',
      value: ProductCategory.BEAUTIESSKINCARE,
    },
    {
      label: 'Medical Supplies',
      value: ProductCategory.MEDICALSUPPLIES,
    },
    {
      label: 'Lab Equipment',
      value: ProductCategory.LABTEST,
    },
    {
      label: 'Other',
      value: ProductCategory.OTHER,
    },
  ];

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Add tolerance for floating point precision issues
      const tolerance = 2;
      setShowRightArrow(scrollLeft + clientWidth + tolerance < scrollWidth);
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Calculate available width dynamically
  useEffect(() => {
    const calculateMaxWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const padding = 24; // 12px padding on each side (px-3)
        const availableWidth = containerWidth - padding;
        setMaxWidth(availableWidth);
      }
    };

    calculateMaxWidth();

    // Recalculate on window resize
    window.addEventListener('resize', calculateMaxWidth);
    return () => window.removeEventListener('resize', calculateMaxWidth);
  }, []);

  const handleSearch = debounce((query: string) => setSearch(query), 600);

  // Check scroll position on mount and scroll
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Initial check
      setTimeout(checkScrollPosition, 100);

      // Add scroll listener
      scrollContainer.addEventListener('scroll', checkScrollPosition);

      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  // Calculate medicine list height based on available space
  useEffect(() => {
    const calculateMedicineListHeight = () => {
      if (containerRef.current && medicineListRef.current) {
        const containerHeight = window.innerHeight;
        const medicineListTop = medicineListRef.current.offsetTop;
        const bottomPadding = 100; // Space for potential footer/padding
        const availableHeight =
          containerHeight - medicineListTop - bottomPadding;
        setMedicineListHeight(Math.max(300, availableHeight)); // Minimum 300px height
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(calculateMedicineListHeight, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateMedicineListHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateMedicineListHeight);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className="flex flex-col  bg-white px-3 py-2   gap-3 shadow rounded "
    >
      <section className="flex justify-between place-items-center gap-4 ">
        <div className="w-[80%] flex place-items-center gap-2  shadow-md  outline-none rounded">
          <Icon
            icon="ic:baseline-search"
            className="px-1 text-3xl text-[#47515C]"
          />
          <FormikProvider value={formik}>
            <input
              className=" outline-none p-2"
              placeholder="Search"
              value={formik.values.search}
              onChange={(e) => {
                formik.setFieldValue('search', e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </FormikProvider>
        </div>
        <button
          className="bg-[#319CFF]  flex gap-1 place-items-center text-white rounded p-2"
          onClick={() => setViewModal(true)}
        >
          <Icon icon="ic:round-add" className="text-white text-sm" />
          <p>Products</p>
        </button>
      </section>

      <section className="relative">
        <div
          ref={scrollContainerRef}
          className="flex shadow-md rounded place-items-center overflow-x-auto w-full gap-6 p-4 scrollbar-hide"
          style={{ maxWidth: maxWidth > 0 ? `${maxWidth}px` : '100%' }}
        >
          {medicineCateogry.map((item) => (
            <button
              key={item.value}
              className={`text-sm whitespace-nowrap flex-shrink-0 font-mediumtext-[#47515C] transition-colors ${
                item.value === formik.values.productCategory
                  ? 'border-b-2 border-[#1652B7]'
                  : ''
              }`}
              onClick={() =>
                formik.setFieldValue('productCategory', item.value)
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
          >
            <Icon icon="ic:round-chevron-left" className="text-lg" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors z-10"
          >
            <Icon icon="ic:round-chevron-right" className="text-lg" />
          </button>
        )}
      </section>

      <section
        ref={medicineListRef}
        className="grid grid-cols-3 gap-3 overflow-y-auto"
        id="medicineList"
        style={{
          maxHeight:
            medicineListHeight > 0 ? `${medicineListHeight}px` : '400px',
        }}
      >
        {/* {medicalProducts?.map((item) => (
          <MedicinCard
            item={item}
            key={item?._id}
            onClick={() => {
              const originalValue = formik?.values?.selectedMedicine;

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

              // const availableEntries = item?.entries?.filter(
              //   (sub: any) => sub?.availableStock > 0
              // );

              if (originalValue?.length > 0) {
                const alreadyExists = originalValue.some(
                  (med: any) => med.item?._id === item.product?._id
                );
                if (alreadyExists) {
                  return toast.info(
                    'Selected medicine already exists, try by removing it'
                  );
                } else {
                  formik.setFieldValue('selectedMedicine', [
                    ...originalValue,
                    {
                      quantity: 1,
                      item: {
                        batchId: item?.product?._id,
                        product: item?.product?.name,
                        productCategory: item?.product?.productCategory,
                        expiryDate: item?.expiryDate,
                        strength,
                        availableStock: item?.availableStock,
                        batch: item?.batchNo,
                        productId: item?.product?._id,
                        _id: item?.product?._id,
                        fromInvoice: false,
                        mrpRate: item?.mrpRate,
                        medicineForm,
                      },
                    },
                  ]);
                }
              }
              formik.setFieldValue('selectedMedicine', [
                ...originalValue,
                {
                  quantity: 1,
                  item: {
                    product: item?.product?.name,
                    batch: item?.batchNo,
                    productId: item?.product?._id,
                    expiryDate: item?.expiryDate,
                    availableStock: item?.availableStock,
                    productCategory: item?.product?.productCategory,
                    strength,
                    _id: item?.product?._id,
                    batchId: item?._id,
                    fromInvoice: false,
                    mrpRate: item?.mrpRate,

                    medicineForm,
                  },
                },
              ]);
            }}
          />
        ))} */}
      </section>

      {viewModal && (
        <PopupModal ref={modalRef} classname="p-4 max-w-[850px] w-full">
          <div>
            <div className="flex justify-center items-center">
              {' '}
              <Text
                as="h3"
                size="body-md-default"
                // variant="primary-blue"
                className=" text-[#4188f2] mb-2"
              >
                Add Product
              </Text>
            </div>
            <AddPharmacyProduct
              // editData={selectedData}
              onClose={() => setViewModal(false)}
              navigate={true}
            />
          </div>
        </PopupModal>
      )}
    </div>
  );
};
