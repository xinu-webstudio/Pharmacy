import { useState } from 'react';
import { buildQueryParams } from '../../../../../hooks/useBuildQuery';
import MasterTable from '../../../../../layouts/Table/MasterTable';
import { TableAction } from '../../../../../layouts/Table/TableAction';
import { useGetAllInvoice } from '../../../../../server-action/api/financialOpsApi';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';
import { useOutsideClick } from '../../../../../hooks';
import { PopupModal } from '../../../../../components';
import SalesReturnDetails from './SalesReturnDetails.component';
import {
  INVENTROYENUM,
  SALEPURCHASEENUM,
} from '../../../../../constant/constant';

export const SaleReturnTable = () => {
  const queryParams = buildQueryParams({
    category: SALEPURCHASEENUM.SALERETURN,
    inventoryFor: INVENTROYENUM.PHARMACY,
  });

  const { data: pharmacySales } = useGetAllInvoice(queryParams);

  const sales = (pharmacySales as any)?.data?.invoices;

  const [showDetails, setShowDetails] = useState(false);

  const ref = useOutsideClick(() => setShowDetails(false));

  const [selectedData, setSelectedData] = useState<
    IMainInvoiceController | undefined
  >();

  const tableData = {
    columns: [
      {
        title: 'S.N',
        key: 'sn',
      },
      {
        title: 'Invoice no',
        key: 'invoiceNo',
      },
      {
        title: 'Date',
        key: 'date',
      },
      {
        title: 'Customer',
        key: 'customer',
      },
      {
        title: 'Transaction ID',
        key: 'transactionID',
      },
      {
        title: 'Payment Method',
        key: 'paymentMethod',
      },

      {
        title: 'Total Amount (RS.)',
        key: 'total',
      },
      {
        title: 'Action',
        key: 'action',
      },
    ],
    rows: sales?.map((item: IMainInvoiceController, index: number) => ({
      sn: index + 1,
      invoiceNo: item?.invoiceNo,
      date: item?.date,
      customer:
        item?.walkInCustomer?.name ??
        item?.billingAgainst?.commonInfo?.personalInfo?.fullName,
      due: item?.dueAmount,
      transactionID: item?.transactionNo ?? '-',
      total: item?.payableAmount,

      paymentMethod: item?.paymentMethod,
      action: (
        <TableAction
          onShow={() => {
            setSelectedData(item);
            setShowDetails(true);
          }}
        />
      ),
    })),
  };
  return (
    <div>
      <MasterTable
        columns={tableData.columns}
        rows={tableData.rows}
        loading={false}
      />

      {showDetails && (
        <PopupModal ref={ref} classname="h-[550px] overflow-scroll p-4">
          <SalesReturnDetails returnData={selectedData} />
        </PopupModal>
      )}
    </div>
  );
};
