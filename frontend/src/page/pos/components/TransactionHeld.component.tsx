import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { InitialTypes } from '../../types/PharmacyPOS.types';
import { formatDate } from '../../../utils/date-formatter';
import { customerOptions } from '../PharmacyPOS.page';

interface propTypes {
  onClose: () => void;
  formik: any;
}

export const TransactionHeld = ({ formik, onClose }: propTypes) => {
  const [heldTransactions, setHeldTransactions] = useState<InitialTypes[]>([]);

  // Fetch held transactions from localStorage
  useEffect(() => {
    const fetchHeldTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem('heldTransactions');
        if (storedTransactions) {
          const parsedTransactions = JSON.parse(storedTransactions);
          if (Array.isArray(parsedTransactions)) {
            setHeldTransactions(parsedTransactions);
          }
        }
      } catch (error) {
        console.error('Error fetching held transactions:', error);
        toast.error('Failed to load held transactions');
      }
    };

    fetchHeldTransactions();
  }, []);

  // Resume transaction - populate form with held transaction data
  const handleResumeTransaction = (transaction: InitialTypes) => {
    try {
      console.log(transaction, 'transaction');
      // Set all form values from the held transaction
      formik.setValues({
        ...formik.values,
        customerType: transaction.customerType,
        patientId: transaction.patientId || '',
        patientName: transaction.patientName || '',
        patient: transaction.patientName || '',
        tel: transaction.tel || '',
        address: transaction.address || '',
        selectedMedicine: transaction.selectedMedicine || [],
        totalAmount: transaction.totalAmount || '',
        subTotal: transaction.subTotal || '',
        tax: transaction.tax || '',
        discount: transaction.discount || '',
        reseller: transaction.reseller || '',
        patientAge: transaction.patientAge || '',
        patientGender: transaction.patientGender || '',
      });

      // Remove the resumed transaction from localStorage
      const updatedTransactions = heldTransactions.filter(
        (t) => t.id !== transaction.id
      );
      localStorage.setItem(
        'heldTransactions',
        JSON.stringify(updatedTransactions)
      );
      setHeldTransactions(updatedTransactions);

      toast.success('Transaction resumed successfully');
      onClose();
    } catch (error) {
      console.error('Error resuming transaction:', error);
      toast.error('Failed to resume transaction');
    }
  };

  // Delete held transaction
  const handleDeleteTransaction = (transactionId: string) => {
    try {
      const updatedTransactions = heldTransactions.filter(
        (t) => t.id !== transactionId
      );
      localStorage.setItem(
        'heldTransactions',
        JSON.stringify(updatedTransactions)
      );
      setHeldTransactions(updatedTransactions);
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    }
  };

  return (
    <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
      <section className="flex place-items-center justify-between">
        <p className="text-base font-medium">
          Held Transactions ({heldTransactions.length})
        </p>
        <Icon
          icon={'material-symbols:close-rounded'}
          onClick={onClose}
          className="cursor-pointer"
        />
      </section>

      {heldTransactions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No held transactions found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {heldTransactions.map((transaction) => (
            <section
              key={transaction.id}
              className="border border-[#47515C] border-opacity-[.4] flex flex-col gap-2 rounded p-2"
            >
              <div className="flex place-items-center justify-between">
                <section className="flex place-items-center gap-3">
                  <p className="font-medium capitalize">
                    {
                      customerOptions.find(
                        (option) => option.value === transaction.customerType
                      )?.label
                    }
                  </p>
                  <p className="text-sm">
                    {transaction.patientName || transaction.patient}
                  </p>
                  {transaction.tel && (
                    <p className="text-xs text-gray-600">({transaction.tel})</p>
                  )}
                </section>

                <section className="flex place-items-center gap-2">
                  <button
                    className="bg-[#319CFF] px-2 py-1 text-[12px] text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => handleResumeTransaction(transaction)}
                  >
                    Resume
                  </button>
                  <button
                    className="bg-[#FF0000] px-2 py-1 text-white text-[12px] rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </section>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-sm text-[#47515C]">
                  Items: {transaction.selectedMedicine?.length || 0} | Total:
                  Rs. {transaction.totalAmount || '0'}
                </p>
                <p className="text-sm text-[#47515C]">
                  Held: {formatDate(transaction.timestamp)} - {transaction.time}
                </p>
                {transaction.notes && (
                  <p className="text-xs text-gray-600 italic">
                    Note: {transaction.notes}
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};
