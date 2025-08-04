import { useParams } from 'react-router-dom';
import { CustomerInformation } from './components/CustomerInformation';
import { AlternativeHeader } from '../../../global/AlternativeHeader.component';
import { IMainInvoiceController } from '../../../server-action/types/master-invoice.types';

export const MedicineRequestDetailsPage = () => {
  const { id } = useParams();

  // const { data: invoiceData } = useGetInvoiceById(id as string);

  const invoiceData: IMainInvoiceController = {
    inventoryFor: 'Medical Store',
    date: '2024-01-15',
    batchNo: 'BTH001',
    invoiceNo: 'INV-2024-001',
    predefinedBillNo: 'PB-001',

    walkInCustomer: {
      name: 'Jane Customer',
      contact: '+1-555-0125',
      address: '789 Customer Ave',
      // _id: 'customer_001',
    },
    category: 'Prescription Medicines',

    totalAmount: 40.0,
  };

  return (
    <div className="flex flex-col gap-2 ">
      <AlternativeHeader
        headerTitle="View Medicine Request"
        showBelow={false}
      />
      <CustomerInformation invoice={invoiceData} />
    </div>
  );
};
