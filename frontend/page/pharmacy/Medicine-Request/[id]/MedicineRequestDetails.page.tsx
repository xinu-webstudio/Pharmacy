import { useParams } from 'react-router-dom';
import { AlternativeHeader } from '../../../../components/AlternativeHeader/AlternativeHeader';
import { CustomerInformation } from './components/CustomerInformation';
import { useGetInvoiceById } from '../../../../server-action/api/masterinvoice.api';

export const MedicineRequestDetailsPage = () => {
  const { id } = useParams();

  const { data: invoiceData } = useGetInvoiceById(id as string);

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
