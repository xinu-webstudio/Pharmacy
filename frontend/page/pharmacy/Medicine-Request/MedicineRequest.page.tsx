import { useState } from 'react';
import { AlternativeHeader } from '../../../components/AlternativeHeader/AlternativeHeader';
import MasterTable from '../../../layouts/Table/MasterTable';
import {
  useDeleteInvoice,
  useGetInvoice,
} from '../../../server-action/api/masterinvoice.api';
import { buildQueryParams } from '../../../hooks/useBuildQuery';
import { INVENTROYENUM, SALEPURCHASEENUM } from '../../../constant/constant';
import { IMainInvoiceController } from '../../../server-action/types/master-invoice.types';
import { Status } from '../../../components/Status';
import { TableAction } from '../../../layouts/Table/TableAction';
import { useNavigate } from 'react-router-dom';
import { FrontendRoutes } from '../../../routes';

export const MedicineRequestPage = () => {
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
  });

  const [queryProps, setQueryProps] = useState({
    selectedDepartment: '',
    selectedSpecialist: '',
    search: '',
  });

  const queryParams = buildQueryParams({
    category: SALEPURCHASEENUM.SALE,
    inventoryFor: INVENTROYENUM.PHARMACY,
    search: queryProps.search,
    ...(queryProps.search
      ? {}
      : {
          page: pagination.page,
          limit: pagination.limit,
        }),
  });

  const { data: invoiceData } = useGetInvoice(queryParams);

  const medicineRequests: IMainInvoiceController[] = (invoiceData as any)?.data
    ?.invoices;

  const nav = useNavigate();

  const { mutateAsync: handleDelete } = useDeleteInvoice();
  const tableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Date', key: 'date' },
      { title: 'Requested By', key: 'requestedBy' },
      { title: 'Patient', key: 'patient' },
      { title: 'Payment Status', key: 'paymentStatus' },
      { title: 'Status', key: 'status' },

      { title: 'Action', key: 'action' },
    ],
    rows: medicineRequests?.map((item, index) => ({
      sn: index + 1,
      date: item?.date,
      requestedBy:
        item?.supervisor?.commonInfo?.personalInfo?.fullName ?? 'N/A',
      patient:
        item?.walkInCustomer?.name ??
        item?.billingAgainst?.commonInfo?.personalInfo?.fullName ??
        'Outside Patient',
      paymentStatus: <Status status={item?.paymentStatus} />,
      status: <Status status={item?.isActive ? 'ACTIVE' : 'INVACTIVE'} />,
      action: (
        <TableAction
          onShow={() =>
            nav(`${FrontendRoutes.MEDICINERQUESTDETAILS}/${item?._id}`)
          }
          onDelete={async () => {
            await handleDelete({
              id: JSON.stringify([item?._id]),
            });
          }}
        />
      ),
    })),
  };

  return (
    <div className="flex flex-col gap-2 pb-8">
      <AlternativeHeader
        headerTitle="Medicine Request"
        onSearch={true}
        onSearchFunc={(e) => {
          setQueryProps({
            ...queryProps,
            search: e,
          });
        }}
      />
      <div className="bg-white rounded-md">
        <MasterTable
          columns={tableData.columns}
          rows={tableData.rows}
          loading={false}
          pagination={{
            currentPage: pagination.page,
            totalPage: (invoiceData as any)?.data?.pagination?.pages,
            limit: pagination.limit,
            onClick: (params: { page?: number; limit?: number }) => {
              if (params.page) {
                setPagination({
                  ...pagination,
                  page: params.page,
                });
              }
              if (params.limit) {
                setPagination({
                  ...pagination,
                  limit: params.limit,
                });
              }
            },
          }}
        />
      </div>
    </div>
  );
};
