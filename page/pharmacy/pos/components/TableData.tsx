import { Icon } from '@iconify/react/dist/iconify.js';
import { useCallback, useEffect, useState } from 'react';
import { useOutsideClick } from '../../../../hooks/useOutsideClick.hook';
import { DropdownField } from '../../../../global/inputs/DropdownField.component';
import { PopupModal } from '../../../../global/PopupModal.component';

import { Payment } from './Payment';
import { toast } from 'react-toastify';

interface propTypes {
  form?: any;
}

interface dataTypes {
  quantity: number;
  item: any;
}

export const calculateItemSubTotal = (item: any) => {
  const baseAmount = item?.item?.mrpRate * item?.quantity;

  const discount = item?.item?.discount || 0;

  const vat = item?.item?.vat || 0;

  let amountAfterDiscount;

  if (item?.item?.discountType === 'percentage') {
    const discountAmount = (baseAmount * discount) / 100;
    // Apply percentage discount
    amountAfterDiscount = baseAmount - discountAmount;
  } else if (item?.item?.discountType === 'flat') {
    // Apply flat discount (per unit, so multiply by quantity)
    amountAfterDiscount = baseAmount - discount;
  } else {
    // No discount
    amountAfterDiscount = baseAmount;
  }

  // Apply VAT to the amount after discount
  const finalAmount = amountAfterDiscount * (1 + vat / 100);

  return Math.max(0, finalAmount); // Ensure non-negative
};

export default function TableData({ form }: propTypes) {
  const [paymentModal, setPaymentModal] = useState(false);

  const ref = useOutsideClick(() => setPaymentModal(false));

  const calculateSingleItemSubTotal = useCallback((item: any) => {
    const baseAmount = (item?.item?.mrpRate || 0) * (item?.quantity || 0);
    const discount = item?.item?.discount || 0;
    const vat = item?.item?.vat || 0;

    let amountAfterDiscount: number;

    switch (item?.item?.discountType) {
      case 'percentage':
        const discountAmount = (baseAmount * discount) / 100;
        amountAfterDiscount = baseAmount - discountAmount;
        break;
      case 'flat':
        amountAfterDiscount = baseAmount - discount;
        break;
      default:
        amountAfterDiscount = baseAmount;
    }

    const finalAmount = amountAfterDiscount * (1 + vat / 100);
    return Math.max(0, finalAmount);
  }, []);

  const calculateSubTotal = () => {
    return (
      form.values.selectedMedicine?.reduce(
        (total: number, item: any) => total + calculateSingleItemSubTotal(item),
        0
      ) || 0
    );
  };

  // Function to get available stock for a specific item
  const getAvailableStock = (item: any) => {
    if (!item?.item?.batchId || !item?.item?.options) return 0;

    const selectedBatch = item.item.options.find(
      (option: any) => option.value === item.item.batchId
    );

    return selectedBatch?.stock || selectedBatch?.availableStock || 0;
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

  // Calculate values whenever needed
  const rawSubTotal = calculateSubTotal();
  const discount =
    form.values.discountType === 'percentage'
      ? (rawSubTotal * form.values.discount) / 100
      : form.values.discount || 0;
  const subTotal = rawSubTotal - discount;

  // Keep form values in sync whenever relevant data changes
  useEffect(() => {
    // form.setFieldValue('taxValue', tax);
    form.setFieldValue('totalAmount', subTotal);
    form.setFieldValue('subTotal', subTotal);
  }, [form.values.selectedMedicine, form.values.discount]);

  return (
    <div className=" mx-auto p-4 bg-white">
      <div className="mb-6">
        <div className="flex border-b pb-2 text-sm text-gray-500">
          <div className="w-1/4">Product</div>
          <div className="w-1/6 text-center">Batch no.</div>
          <div className="w-1/6 text-center">Price</div>
          <div className="w-1/6 text-center">QTY</div>
          <div className="w-1/6 text-center">Discount Type</div>
          <div className="w-1/6 text-center">Discount </div>
          <div className="w-1/6 text-center">VAT %</div>

          <div className="w-1/6 text-center">Sub Total</div>
          <div className="w-10"></div>
        </div>

        {form?.values?.selectedMedicine?.map(
          (item: dataTypes, index: number) => (
            <div
              key={item.item?._id}
              className="flex items-center py-4 border-b"
            >
              {/* //product */}
              <div className="w-1/4 text-xs">{item?.item?.product}</div>

              {/* //batch */}
              <div className="w-1/5 text-center">
                {item?.item?.fromInvoice ? (
                  <DropdownField
                    options={item?.item?.options}
                    firstInput="Select Batch"
                    onChange={(e: any) => {
                      form.setFieldValue(
                        `selectedMedicine.${index}.item.batchId`,
                        e.target.value
                      );
                      const selectedBatch = item?.item?.options.find(
                        (option: any) =>
                          option.value === e.target.value && option
                      );

                      console.log(selectedBatch, 'selected batch');

                      form.setFieldValue(
                        `selectedMedicine.${index}.item.pBatch`,
                        selectedBatch
                      );
                      form.setFieldValue(
                        `selectedMedicine.${index}.item.mrpRate`,
                        selectedBatch?.mrpRate
                      );
                    }}
                  />
                ) : (
                  <DropdownField
                    options={item?.item?.options}
                    firstInput="Select Batch"
                    onChange={(e: any) => {
                      form.setFieldValue(
                        `selectedMedicine.${index}.item.batchId`,
                        e.target.value
                      );

                      const selectedBatch = item?.item?.options.find(
                        (option: any) => option.value === e.target.value
                      );

                      console.log(selectedBatch, 'selected batch');

                      form.setFieldValue(
                        `selectedMedicine.${index}.item.mrpRate`,
                        selectedBatch?.mrpRate
                      );
                      form.setFieldValue(
                        `selectedMedicine.${index}.item.pBatch`,
                        selectedBatch
                      );

                      // Reset quantity to 1 when batch changes to avoid stock issues
                      form.setFieldValue(
                        `selectedMedicine.${index}.quantity`,
                        1
                      );
                    }}
                    // value={item?.item?.batchId}
                  />
                )}
              </div>

              {/* price */}
              <div className="w-1/5 text-center">
                <input
                  type="number"
                  min={1}
                  value={item?.item?.mrpRate ?? 1}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or convert to number
                    form.setFieldValue(
                      `selectedMedicine.${index}.item.mrpRate`,
                      value === '' ? '' : Number(value)
                    );
                  }}
                  className="w-16 p-1 text-center border rounded"
                />
              </div>

              {/* quantity */}
              <div className="w-1/6 text-center">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    min="1"
                    max={getAvailableStock(item)}
                    value={item?.quantity === 0 ? '' : item.quantity}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      // Allow empty input
                      if (inputValue === '') {
                        form.setFieldValue(
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
                        form.setFieldValue(
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
                        form.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          1
                        );
                        return;
                      }

                      const newQuantity = Number.parseInt(inputValue);

                      // Additional validation on blur
                      if (isNaN(newQuantity) || newQuantity <= 0) {
                        form.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          1
                        );
                      } else if (!validateQuantity(item, newQuantity, index)) {
                        form.setFieldValue(
                          `selectedMedicine.${index}.quantity`,
                          Math.min(item.quantity, getAvailableStock(item))
                        );
                      }
                    }}
                    className="w-16 p-1 text-center border rounded"
                  />
                </div>
              </div>

              {/* discount type */}
              <div className="w-1/6 text-center">
                <select
                  value={item?.item?.discountType}
                  onChange={(e) => {
                    form.setFieldValue(
                      `selectedMedicine.${index}.item.discountType`,
                      e.target.value
                    );
                  }}
                  className="w-16 p-1  border rounded"
                >
                  <option disabled>Select</option>
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat</option>
                </select>
              </div>

              {/* discount */}
              <div className="w-1/6 text-center">
                <input
                  type="number"
                  min={0}
                  value={item?.item?.discount ?? 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or convert to number
                    form.setFieldValue(
                      `selectedMedicine.${index}.item.discount`,
                      value === '' ? '' : Number(value)
                    );
                  }}
                  className="w-16 p-1 text-center border rounded"
                />
              </div>

              {/* vat */}
              <div className="w-1/6 text-center">
                <input
                  type="number"
                  min={0}
                  value={item?.item?.vat ?? 0}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or convert to number
                    form.setFieldValue(
                      `selectedMedicine.${index}.item.vat`,
                      value === '' ? '' : Number(value)
                    );
                  }}
                  className="w-16 p-1 text-center border rounded"
                />
              </div>

              {/* subTotal */}
              <div className="w-1/6 text-center">
                {calculateItemSubTotal(item).toFixed(2)}
              </div>

              <div className="w-10 flex justify-center">
                <button
                  onClick={() => {
                    const originalValue = form.values.selectedMedicine;
                    form.setFieldValue(
                      'selectedMedicine',
                      originalValue.filter(
                        (med: dataTypes) => med.item?._id !== item?.item?._id
                      )
                    );
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  <Icon icon="fluent:delete-24-regular" />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-sm">Discount Type</div>
          <div className="flex items-center border border-textCounter rounded">
            <select
              className=" p-1  outline-none mr-1"
              value={form.values.discountType}
              onChange={(e) => {
                form.setFieldValue('discountType', e.target.value);
              }}
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Discount</div>
          <div className="flex items-center border border-textCounter rounded">
            {form.values.discountType === 'percentage' ? (
              <div className="flex items-center px-2 py-1 text-sm text-DashboardTitle">
                %
              </div>
            ) : (
              <div className="flex items-center px-2 py-1 text-sm text-DashboardTitle">
                RS
              </div>
            )}
            <input
              type="text"
              value={form.values.discount || ''}
              onChange={(e) => {
                const value =
                  e.target.value === '' ? 0 : Number(e.target.value);
                form.setFieldValue('discount', value);
              }}
              placeholder="Enter discount"
              className="w-24 p-1  outline-none mr-1"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Sub Total without discount </div>
          <div>RS. {rawSubTotal.toLocaleString()}</div>
        </div>
        {form.values.discount && (
          <div className="flex justify-between items-center">
            <div className="text-sm">Sub Total After Discount </div>
            <div>RS. {subTotal.toLocaleString()}</div>
          </div>
        )}
        <div className="flex justify-between items-center font-medium">
          <div>Total</div>
          <div>RS.{subTotal.toLocaleString()}</div>
        </div>
        <div className="flex justify-end ">
          <button
            className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded"
            onClick={() => {
              if (form.values.selectedMedicine.length === 0) {
                return toast.info('Please select medicine');
              } else {
                setPaymentModal(true);
              }
            }}
          >
            <Icon icon={'akar-icons:credit-card'} />
            <span>Payment</span>
          </button>
        </div>
        {paymentModal && (
          <PopupModal ref={ref} classname="p-5 ">
            <Payment form={form} onClose={() => setPaymentModal(false)} />
          </PopupModal>
        )}{' '}
      </div>
    </div>
  );
}
