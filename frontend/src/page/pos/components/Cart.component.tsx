import { SALEPURCHASEENUM } from '../../../constants/constants';
import { INVENTROYENUM } from '../../../constants/constants';
import { buildQueryParams } from '../../../hooks/useBuildQuery.hooks';
import { useOutsideClick } from '../../../hooks/useOutsideClick.hook';
import { MedicineCartTypes } from '@/page/types/MedcineCart.types';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { calculateItemSubTotal } from './TableData';
import { GlobalForm } from '../../../global/GlobalForm.component';
import { PopupModal } from '../../../global/PopupModal.component';
import { TransactionHoldDialog } from './TransactionHoldDialog.component';
import { TransactionHeld } from './TransactionHeld.component';
import { PrintableInvoice } from '@/page/Medicine-Request/[id]/components/NewPharmacyBill';

interface propTypes {
  formik: any;
}

export const MedicineCart = ({ formik }: propTypes) => {
  const generateInvoiceNo = () => `Bill-${v4().slice(0, 8)}`;

  const [holdProps, setHoldProps] = useState({
    holdModal: false,
    heldModal: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const cartItemsRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const heldTransactions = JSON.parse(
    localStorage.getItem('heldTransactions') || '[]'
  );

  const holdModalRef = useOutsideClick(() =>
    setHoldProps({
      heldModal: false,
      holdModal: false,
    })
  );

  //   IMainInvoiceController | any
  const [invoiceData, setInvoiceData] = useState<any>();
  const contentRef = useRef<HTMLDivElement | any>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    // documentTitle: `Invoice-${invoice?.invoiceNo ?? ''}`,
    pageStyle: `
        @page {
          size: A4;
          margin: 0.5in;
        }
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `,
  });

  const calculateSingleItemSubTotal = useCallback((item: any) => {
    const baseAmount = (item?.item?.mrpRate || 0) * (item?.quantity || 0);
    const discount = item?.item?.discount || 0;
    const vat = item?.item?.vat || 0;

    let amountAfterDiscount: number;

    const discountAmount = (baseAmount * discount) / 100;
    amountAfterDiscount = baseAmount - discountAmount;

    const finalAmount = amountAfterDiscount * (1 + vat / 100);
    return Math.max(0, finalAmount);
  }, []);

  const calculateSubTotal = () => {
    return (
      formik.values.selectedMedicine?.reduce(
        (total: number, item: any) => total + calculateSingleItemSubTotal(item),
        0
      ) || 0
    );
  };

  const getAvailableStock = (item: MedicineCartTypes) => {
    if (!item?.item?.batchId) return 0;

    return item?.item?.availableStock;
  };

  // Function to validate quantity against stock
  const validateQuantity = (item: any, newQuantity: number, index: number) => {
    const availableStock = getAvailableStock(item);

    if (newQuantity > availableStock) {
      toast.error(`Only ${availableStock} units available in stock!`);
      return false;
    }

    return true;
  };

  const rawSubTotal = calculateSubTotal();
  const tax = (rawSubTotal * formik.values.tax) / 100;
  const discount = (rawSubTotal * formik.values.discount) / 100;

  const subTotal = rawSubTotal - discount + tax;
  const due = subTotal - formik.values.cashRecieved;

  // Keep form values in sync whenever relevant data changes
  useEffect(() => {
    // form.setFieldValue('taxValue', tax);
    formik.setFieldValue('totalAmount', subTotal);
    formik.setFieldValue('subTotal', subTotal);
  }, [formik.values.selectedMedicine, formik.values.discount]);

  // Calculate available height dynamically
  useEffect(() => {
    const calculateMaxHeight = () => {
      if (containerRef.current && cartItemsRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const cartItemsTop = cartItemsRef.current.offsetTop;
        const bottomElementsHeight = 400; // Approximate height of payment methods, forms, and buttons
        const padding = 24; // py-2 padding
        const availableHeight =
          containerHeight - cartItemsTop - bottomElementsHeight - padding;
        setMaxHeight(Math.max(200, availableHeight)); // Minimum 200px height
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    const timer = setTimeout(calculateMaxHeight, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateMaxHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, []);

  // const amount = [50, 100, 200, 500, 700];

  const formData = [
    {
      type: 'number',
      field: 'tax',
      minValidation: true,
      placeholder: 'tax (%)',
    },

    {
      type: 'number',
      field: 'discount',
      placeholder: 'Discount (%)',
      minValidation: true,
    },

    {
      type: 'number',
      field: 'cashRecieved',
      placeholder: '0.00',
      minValidation: true,
    },
  ];

  const handleIconChange = (
    type: string,
    item: MedicineCartTypes,
    index: number
  ) => {
    const inputValue = Number(item?.quantity);
    let newQuantity = 0;

    // Allow empty input
    if (inputValue === 0) {
      formik.setFieldValue(`selectedMedicine.${index}.quantity`, '');
      return;
    }

    if (type === 'plus') {
      newQuantity = inputValue + 1;
    } else {
      newQuantity = inputValue - 1;
    }

    // Check if it's a valid number and greater than 0
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return; // Don't update if invalid
    }

    // Validate against available stock
    if (validateQuantity(item, newQuantity, index)) {
      formik.setFieldValue(`selectedMedicine.${index}.quantity`, newQuantity);
    } else {
      // Keep the current valid quantity
      // item.quantity = item.quantity.toString();
    }
  };

  const queryParams = buildQueryParams({
    user: formik.values.patientId,
    isActive: '1',
  });

  // const { data } = useGetPatientHistory(queryParams);

  // const { mutateAsync: updatePatientHistory } = useUpdatePatientHistory();

  // const { mutateAsync: createInvoice } = useCreateInvoice();
  // const { mutateAsync: updateInvoice } = useUpdateInvoice();

  const handlePurchase = async () => {
    const currentInvoiceNo = generateInvoiceNo();

    // Update invoice data with the current invoice number for printing
    // setInvoiceData((prev: any) => ({
    //   ...prev,
    //   invoiceNo: currentInvoiceNo,
    // }));

    // Wait a moment for state to update before printing
    setTimeout(() => {
      handlePrint();
    }, 100);

    const paymentStatus =
      formik.values.cashRecieved == 0
        ? 'PENDING'
        : formik.values.cashRecieved == formik.values.totalAmount
        ? 'PAID'
        : 'PARTIALLY-PAID';

    const selectedMedicine = formik.values.selectedMedicine?.map(
      (item: any) => {
        const totalAmount = item?.item?.mrpRate * item?.quantity;
        const initDiscount = item?.item?.discount;
        // const discount = (initDiscount / totalAmount) * 100;
        return {
          pProduct: item?.item?.productId,
          pBatch: item?.item?.batchId,
          quantity: item?.quantity ?? 1,
          // doses: item?.item?.doses,
          // frequency: item?.item?.frequency,
          // duration: item?.item?.duration,
          discount: item?.item?.discount ?? 0,
          tax: item?.item?.vat ?? 0,
          totalAmount: totalAmount,
        };
      }
    );

    const originalTotal = selectedMedicine.reduce(
      (total: number, item: any) => total + item?.totalAmount,
      0
    );

    const formData: any = {
      date: new Date().toISOString().split('T')[0],
      inventoryFor: INVENTROYENUM.PHARMACY,
      category: SALEPURCHASEENUM.SALE,
      discount: Number(formik.values.discount),
      paidAmount: Number(formik.values.paidAmount),

      totalAmount: Number(originalTotal),
      remarks: formik.values.remarks,
      paymentStatus: paymentStatus,
      subTotal: Number(formik.values.subTotal),
      paymentMethod: formik.values.paymentMethod,
      dueAmount: Number(formik.values.totalAmount - formik.values.paidAmount),
      productList: selectedMedicine,
      // tax: 13,
      invoiceNo: currentInvoiceNo || generateInvoiceNo(),
      isActive: formik.values.patientId
        ? true
        : paymentStatus === 'PAID'
        ? false
        : true,
    };

    if (formik.values.supervisor) {
      formData['supervisor'] = formik.values.supervisor;
    }

    if (formik.values.customerType !== 'new') {
      formData['billingAgainst'] = formik.values.patientId;
    }

    if (formik.values.customerType === 'new') {
      const walkInCustomer = {
        name: formik.values.patient,
        contact: formik.values.phoneNo,
      };
      formData['walkInCustomer'] = walkInCustomer;
      if (formik.values.reseller) {
        formData['reseller'] = formik.values.reseller;
      }
    }
    if (formik.values.paymentMethod === 'BANK') {
      formData['bank'] = formik.values.bank;
    }

    // if (formik.values.currentInvoiceId) {
    //   await updateInvoice({
    //     _id: formik.values.currentInvoiceId,
    //     entityData: formData,
    //   });
    //   formik.resetForm();
    // } else {
    //   await createInvoice(formData);
    //   formik.resetForm();
    // }
    // const selectedMedicines = formik.values.selectedMedicine;

    // const prescriptionDetails = (data as any)?.data?.patientHistory[0]
    //   ?.prescriptionDetails[0];

    // if (prescriptionDetails && prescriptionDetails?.prescriptionList) {
    //   // Flag to track if any medicines match
    //   let anyMedicineMatched = false;

    //   // For each selected medicine, find matching item in prescription list
    //   selectedMedicines.forEach((medicine: any) => {
    //     const productId = medicine.item?._id || medicine.item?.productId;

    //     const matchingPrescription = prescriptionDetails.prescriptionList.find(
    //       (prescItem: any) => prescItem?.prescribedMedicine?._id === productId
    //     );

    //     // If found, mark that we've found a match
    //     if (matchingPrescription) {
    //       anyMedicineMatched = true;
    //     }
    //   });

    //   // If any medicine matched, update the top-level status
    //   if (anyMedicineMatched) {
    //     prescriptionDetails.status = 'COMPLETED';
    //   }
    // }
    // if (formik.values.customerType !== 'new' && formik.values.patientId) {
    //   await updatePatientHistory({
    //     _id: (data as any)?.data?.patientHistory[0]?._id,
    //     entityData: {
    //       prescriptionDetails: [prescriptionDetails],
    //     },
    //   });
    // }
    formik.resetForm();
  };

  useEffect(() => {
    const paymentStatus =
      formik.values.cashRecieved == 0
        ? 'PENDING'
        : formik.values.cashRecieved == formik.values.totalAmount
        ? 'PAID'
        : 'PARTIALLY-PAID';

    const selectedMedicine = formik.values.selectedMedicine?.map(
      (item: MedicineCartTypes) => {
        return {
          pProduct: {
            name: item?.item?.product,
            productCategory: item?.item?.productCategory,
            strength: item?.item?.strength,
            // form: item?.item?.medicineForm,
          },
          pBatch: {
            batchNo: item?.item?.batch,
            expiryDate: item?.item?.expiryDate,
          },
          quantity: item?.quantity,
          discount: discount,
          // tax: item?.item?.vat,
          totalAmount: calculateItemSubTotal(item),
          // doses: item?.item?.doses,
          // frequency: item?.item?.frequency,
          // duration: item?.item?.duration,
        };
      }
    );

    const formData: any = {
      date: new Date().toISOString().split('T')[0],
      inventoryFor: INVENTROYENUM.PHARMACY,
      category: SALEPURCHASEENUM.SALE,
      discount: Number(formik.values.discount),
      paidAmount: Number(formik.values.paidAmount),
      totalAmount: Number(formik.values.totalAmount),
      subTotal: Number(formik.values.subTotal),
      remarks: formik.values.remarks,
      paymentStatus: paymentStatus,
      age: formik.values.patientAge,
      paymentMethod: formik.values.paymentMethod,
      payableAmount: formik.values.totalAmount,
      dueAmount: Number(formik.values.totalAmount - formik.values.cashRecieved),
      supervisor: formik.values.supervisor,
      productList: selectedMedicine,
      tax: Number(formik.values.taxValue),
      isActive: formik.values.patientId
        ? true
        : paymentStatus === 'PAID'
        ? false
        : true,
    };
    if (formik.values.customerType === 'new') {
      const billingAgainst = {
        patientInfo: {
          patientId: formik.values.patientRegisteredId,
        },
        commonInfo: {
          personalInfo: {
            fullName: formik.values.patient,
            gender: 'N/A',
          },
          contactInfo: {
            phone: {
              primaryPhone: formik.values.tel,
            },
            address: {
              currentAddress: formik.values.address,
            },
          },
        },
      };
      formData['billingAgainst'] = billingAgainst;
    }
    if (formik.values.customerType !== 'new') {
      const billingAgainst = {
        commonInfo: {
          personalInfo: {
            fullName: formik.values.patientName,
            gender: formik.values.patientGender,
          },
          contactInfo: {
            phone: {
              primaryPhone: formik.values.tel,
            },
            address: {
              currentAddress: formik.values.address,
            },
          },
        },
      };
      formData['billingAgainst'] = billingAgainst;
    }
    if (formik.values.paymentMethod === 'BANK') {
      formData['bank'] = formik.values.bank;
    }
    console.log(formData, 'form');
    // setInvoiceData(formData);
  }, [
    formik.values.paymentMethod,
    formik.values.paidAmount,
    formik.values.totalAmount,
  ]);
  // const { data: bankData } = useGetAllBank();

  // const banks: TFinanceBank[] = (bankData as any)?.data?.banks;

  const bankOptions = [
    {
      lable: 'Nabil Bank',
      value: 'Nabil',
      extra: '1234567890',
    },
    {
      lable: 'HDFC Bank',
      value: 'Hdfc',
      extra: '123456785',
    },
  ];

  const bankFormData = [
    {
      type: 'multi-search',
      field: 'bank',
      label: 'Bank Name',
      required: true,
      options: bankOptions,
    },

    {
      type: 'text',
      field: 'accountNo',
      label: 'Account Number',
      required: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-white px-3 py-2 gap-3 shadow rounded"
    >
      <section className="flex justify-between place-items-center">
        <p className="text-base font-medium">Cart item</p>
        <div className="flex place-items-center gap-3">
          <section
            className="flex gap-1 place-items-center border border-[#EEF8FF] py-1 px-[6px] rounded cursor-pointer"
            onClick={() =>
              setHoldProps({
                ...holdProps,
                heldModal: true,
              })
            }
          >
            <Icon icon="clarity:clipboard-line" />
            <p>Held ({heldTransactions?.length})</p>
          </section>

          <section
            className="flex gap-1 place-items-center border border-[#FFECD5] py-1 px-[6px] rounded cursor-pointer"
            onClick={() => setHoldProps({ ...holdProps, holdModal: true })}
          >
            <Icon icon="bi:pause-btn-fill" className="text-primary" />
            <p>Hold</p>
          </section>

          <button onClick={() => formik.setFieldValue('selectedMedicine', [])}>
            Clear All
          </button>
        </div>
      </section>

      <section
        ref={cartItemsRef}
        className="flex flex-col overflow-y-auto gap-2"
        style={{ maxHeight: maxHeight > 0 ? `${maxHeight}px` : '250px' }}
      >
        {formik?.values?.selectedMedicine?.map(
          (item: MedicineCartTypes, index: number) => (
            <div
              key={index}
              className="flex justify-between place-items-center rounded border border-[#47515C] border-opacity-[.2] hover:border-opacity-[.5] cursor-pointer py-2 px-3"
            >
              <div className="flex flex-col ">
                <p className="font-semibold text-[12px] flex ">
                  {item.item?.product} {item.item?.strength}
                </p>

                <p className="text-[#47515C] text-[12px] font-medium">
                  Batch No: {item?.item?.batch}
                </p>
                <p className="text-[#47515C] text-[12px] font-medium">
                  Exp. Date: {item.item?.expiryDate}
                </p>
              </div>
              <div className="flex gap-6 place-items-center">
                <p className="text-sm">Rs. {item.item?.mrpRate}</p>
                <div className="flex place-items-center gap-1">
                  <Icon
                    icon="ic:baseline-remove"
                    onClick={() => handleIconChange('minus', item, index)}
                  />
                  <input
                    type="text"
                    className="border rounded-full w-[28px] text-center shadow-md "
                    min={1}
                    max={getAvailableStock(item)}
                    value={item?.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      // Allow empty input
                      if (inputValue === '') {
                        formik.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          ''
                        );
                        return;
                      }

                      const newQuantity = Number.parseInt(inputValue);

                      // Check if it's a valid number and greater than 0
                      if (isNaN(newQuantity) || newQuantity <= 0) {
                        return; // Don't update if invalid
                      }

                      // Validate against available stock
                      if (validateQuantity(item, newQuantity, index)) {
                        formik.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          newQuantity
                        );
                      } else {
                        // Keep the current valid quantity
                        e.target.value = item.quantity.toString();
                      }
                    }}
                    onBlur={(e) => {
                      const inputValue = e.target.value;

                      // If empty on blur, set to 1 as minimum
                      if (inputValue === '' || inputValue === '0') {
                        formik.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          1
                        );
                        return;
                      }

                      const newQuantity = Number.parseInt(inputValue);

                      // Additional validation on blur
                      if (isNaN(newQuantity) || newQuantity <= 0) {
                        formik.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          1
                        );
                      } else if (!validateQuantity(item, newQuantity, index)) {
                        formik.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          Math.min(item.quantity, getAvailableStock(item))
                        );
                      }
                    }}
                  />
                  <Icon
                    icon="ic:baseline-add"
                    onClick={() => handleIconChange('plus', item, index)}
                  />
                </div>
                <p className="text-sm">
                  Rs. {item.item?.mrpRate * item.quantity}
                </p>
                <Icon
                  icon={'ic:baseline-delete'}
                  className="text-red"
                  onClick={() => {
                    const originalValue = formik.values.selectedMedicine;
                    formik.setFieldValue(
                      'selectedMedicine',
                      originalValue.filter(
                        (med: any) => med.item?._id !== item?.item?._id
                      )
                    );
                  }}
                />
              </div>
            </div>
          )
        )}
      </section>

      <hr className="bg-red" />

      <section className="flex flex-col">
        <p className="text-base font-medium">Payment methods</p>
      </section>
      <section className="flex place-items-center justify-between gap-3">
        <button
          className={`rounded ${
            formik.values.paymentMethod === 'CASH'
              ? 'bg-primary text-white'
              : 'bg-[#F9FAFB] text-[#374151]'
          } w-full flex place-items-center gap-2  justify-center p-2`}
          onClick={() => formik.setFieldValue('paymentMethod', 'CASH')}
        >
          <Icon icon="mingcute:cash-line" className="text-green" />
          <p>Cash</p>
        </button>
        <button
          className={`rounded ${
            formik.values.paymentMethod === 'BANK'
              ? 'bg-primary text-white'
              : 'bg-[#F9FAFB] text-[#374151]'
          }  border border-[#47515C] border-opacity-[.2] flex w-full p-2 place-items-center gap-2  justify-center`}
          onClick={() => formik.setFieldValue('paymentMethod', 'BANK')}
        >
          <Icon icon="circum:bank" />
          <p>Bank</p>
        </button>
      </section>

      {formik.values.paymentMethod === 'BANK' && (
        <section
          className="grid grid-cols-2 mt-2 gap-4 transition-all duration-300 ease-in-out opacity-100 translate-y-0 animate-in slide-in-from-top-1 fade-in"
          id="bank-details"
        >
          <GlobalForm
            formDatails={bankFormData}
            getFieldProps={formik.getFieldProps}
            errors={formik.errors}
            touched={formik.touched}
            onValueChange={(field: any, value: any) => {
              if (field === 'bank') {
                const selectedbank = bankOptions.find(
                  (option) => option.value === value
                );
                formik.setFieldValue('bank', value);
                if (selectedbank) {
                  formik.setFieldValue('accountNo', selectedbank.extra);
                }
              }
            }}
          />
        </section>
      )}

      <section className="flex flex-col gap-4 bg-[#F9FAFB] p-3">
        <div className="grid grid-cols-4  ">
          <p className="text-base font-medium flex place-items-center ">
            Cash Received:
          </p>
          <section className="grid grid-cols-3 col-span-4  gap-x-8">
            <GlobalForm
              formDatails={formData}
              getFieldProps={formik.getFieldProps}
            />
          </section>
        </div>

        {/* <section className="grid grid-cols-7 gap-2">
          {amount.map((item, index) => (
            <button
              key={index}
              className="col-span-1 rounded bg-[#F9FAFB] border border-[#47515C] border-opacity-[.2] flex p-2  gap-2 text-[10px]  justify-center"
              onClick={() => {
                const newAmount = Number(formik.values.cashRecieved) + item;
                formik.setFieldValue('cashRecieved', newAmount);
              }}
            >
              {item}
            </button>
          ))}
        </section> */}
        <hr className="bg-red" />

        <section className="flex place-items-center justify-between">
          <p>Change:</p>
          <p>
            Rs. {Math.abs(Number(due.toFixed(2)))}{' '}
            {due && due < 0 ? 'To Return' : ''}
          </p>
        </section>
      </section>

      <section className="flex place-items-center justify-between bg-[#D9EFFF] p-3 rounded">
        <p>Total:</p>
        <p>Rs. {subTotal.toFixed(2)}</p>
      </section>

      <button
        className="bg-primary text-white p-3 rounded"
        onClick={handlePurchase}
      >
        Confirm Purchase
      </button>

      {holdProps.holdModal && (
        <PopupModal ref={holdModalRef} classname="p-6 w-[400px]">
          <TransactionHoldDialog
            onClose={() => setHoldProps({ ...holdProps, holdModal: false })}
            formik={formik}
          />
        </PopupModal>
      )}

      {holdProps.heldModal && (
        <PopupModal ref={holdModalRef} classname="p-6 w-[450px]">
          <TransactionHeld
            onClose={() => setHoldProps({ ...holdProps, heldModal: false })}
            formik={formik}
          />
        </PopupModal>
      )}

      <section className="hidden">
        <PrintableInvoice ref={contentRef} invoiceData={invoiceData} />
      </section>
    </div>
  );
};
