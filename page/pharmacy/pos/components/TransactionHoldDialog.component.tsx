import { Icon } from '@iconify/react/dist/iconify.js';
import { toast } from 'react-toastify';
import TextareaField from '../../../../global/inputs/TextArea.component';

interface propTypes {
  onClose: () => void;
  formik: any;
}

export const TransactionHoldDialog = ({ onClose, formik }: propTypes) => {
  const { values } = formik;

  const holdTransaction = () => {
    try {
      // Validate if there are medicines selected
      if (!values.selectedMedicine || values.selectedMedicine.length === 0) {
        toast.error('No medicines selected to hold transaction');
        return;
      }

      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();

      // Create transaction data with timestamp and unique ID
      const transactionData = {
        id: Date.now().toString(), // Simple unique ID based on timestamp
        timestamp: new Date().toISOString(),
        customerType: values.customerType,
        patientId: values.patientId,
        patientName: values.patientName || values.patient,
        tel: values.tel,
        address: values.address,
        selectedMedicine: values.selectedMedicine,
        totalAmount: values.totalAmount,
        subTotal: values.subTotal,
        tax: values.tax,
        discount: values.discount,
        notes: values.notes,
        time: `${hours}:${minutes}`,
        // Include other relevant form data
        reseller: values.reseller,
        patientAge: values.patientAge,
        patientGender: values.patientGender,
      };

      // Get existing held transactions from localStorage
      const existingTransactions = localStorage.getItem('heldTransactions');
      let heldTransactions = [];

      if (existingTransactions) {
        try {
          heldTransactions = JSON.parse(existingTransactions);
          // Ensure it's an array
          if (!Array.isArray(heldTransactions)) {
            heldTransactions = [];
          }
        } catch (error) {
          console.error('Error parsing existing transactions:', error);
          heldTransactions = [];
        }
      }

      // Add new transaction to the array
      heldTransactions.push(transactionData);

      // Save back to localStorage
      localStorage.setItem(
        'heldTransactions',
        JSON.stringify(heldTransactions)
      );

      // Reset form and close dialog
      formik.resetForm();
      toast.success('Transaction held successfully');
      onClose();
    } catch (error) {
      console.error('Error holding transaction:', error);
      toast.error('Failed to hold transaction');
    }
  };
  return (
    <div className="flex flex-col gap-3 ">
      <section className="flex place-items-center justify-between">
        <p className="text-base font-medium">Hold Transaction</p>
        <Icon icon={'material-symbols:close-rounded'} onClick={onClose} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[#47515C] text-sm">
            Customer: {formik.values.customerType}
          </p>
          <p className="text-[#47515C] text-sm">
            Item: {formik.values.selectedMedicine.length} | Total: Rs.{' '}
            {formik.values.totalAmount}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-gray-800 text-sm">Notes: (Optional)</label>

          <TextareaField
            label=""
            name="notes"
            className="border border-gray-300 rounded-md p-3 outline-none transition-all duration-200 resize-none focus:border-blue-500"
          />
        </div>
      </section>

      <section className="flex justify-between place-items-center gap-3">
        <button
          className="border border-[#47515C] border-opacity-[.4] text-black p-2 rounded w-full"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="w-full bg-[#FF2323] text-white p-2 rounded"
          onClick={holdTransaction}
        >
          Hold Transactions
        </button>
      </section>
    </div>
  );
};
