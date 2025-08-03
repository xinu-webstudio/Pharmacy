import { useRef, useState, useEffect } from 'react';
import { Status } from '../../../../../components/Status';
import { buildQueryParams } from '../../../../../hooks/useBuildQuery';
import MasterTable from '../../../../../layouts/Table/MasterTable';
import { TableAction } from '../../../../../layouts/Table/TableAction';
import { useGetAllInvoice } from '../../../../../server-action/api/financialOpsApi';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';
import { useOutsideClick } from '../../../../../hooks';
import { PopupModal, Text } from '../../../../../components';

import { SalesReturn } from './Sales-Return.component';
import { PharmacyInvoicePrintable } from './Sales-Bill.component';
import { useReactToPrint } from 'react-to-print';
import Details from '../../../../PurchaseManagement/PurchaseList/components/Details';

export const SalesTable = () => {
  const queryParams = buildQueryParams({
    category: 'SALE',
    inventoryFor: 'PHARMACY',
    paymentStatus: ['PAID', 'PARTIALLY-PAID'],
  });

  const [modalProps, setModalProps] = useState({
    viewModal: false,
    printModal: false,
    editModal: false,
  });

  const [selectedData, setSelectedData] = useState<any | undefined>(undefined);
  const [shouldPrint, setShouldPrint] = useState(false);

  const contentRef = useRef<any>(null);

  const { data: pharmacySales } = useGetAllInvoice(queryParams);

  const sales = (pharmacySales as any)?.data?.invoices;

  const ref = useOutsideClick(() =>
    setModalProps({
      viewModal: false,
      printModal: false,
      editModal: false,
    })
  );

  const print = useReactToPrint({
    contentRef,
  });

  // Effect to handle printing after state update
  useEffect(() => {
    if (shouldPrint && selectedData && modalProps.printModal) {
      // Small delay to ensure component has re-rendered with new data
      setTimeout(() => {
        print();
        setShouldPrint(false);
      }, 100);
    }
  }, [shouldPrint, selectedData, modalProps.printModal, print]);

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
        title: 'Amount Due',
        key: 'due',
      },
      {
        title: 'Total',
        key: 'total',
      },
      {
        title: 'Payment Status',
        key: 'status',
      },
      {
        title: 'Actions',
        key: 'action',
      },
    ],
    rows: sales?.map((item: IMainInvoiceController, index: number) => ({
      sn: index + 1,
      invoiceNo: item?.invoiceNo,
      date: item?.date,
      customer:
        item?.walkInCustomer?.name ??
        item?.billingAgainst?.commonInfo?.personalInfo?.fullName ??
        '-',
      due: item?.dueAmount?.toFixed(2),
      total: item?.payableAmount?.toFixed(2),
      status: <Status status={item?.paymentStatus} />,
      action: (
        <TableAction
          onPrint={() => {
            setSelectedData(item);
            setModalProps({
              printModal: true,
              viewModal: false,
              editModal: false,
            });
            setShouldPrint(true); // Trigger print after state update
          }}
          onReturn={() => {
            setSelectedData(item);
            setModalProps({
              printModal: false,
              viewModal: false,
              editModal: true,
            });
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

      {modalProps.editModal && (
        <PopupModal
          ref={ref}
          classname="p-8  overflow-scroll flex flex-col gap-2"
        >
          <Text
            as="h3"
            size="body-lg-lg"
            variant="primary-blue"
            className="mt-6 px-2 text-primary"
          >
            Sales Return
          </Text>

          <SalesReturn
            editData={selectedData}
            onClose={() =>
              setModalProps({
                printModal: false,
                viewModal: false,
                editModal: false,
              })
            }
          />
        </PopupModal>
      )}

      <div style={{ display: 'none' }}>
        <PharmacyInvoicePrintable ref={contentRef} invoice={selectedData} />
      </div>
    </div>
  );
};
