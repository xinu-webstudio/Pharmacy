import { INVENTROYENUM } from '../../constants/constants';
import { SALEPURCHASEENUM } from '../../constants/constants';
import { AlternativeHeader } from '../../global/AlternativeHeader.component';
import MasterTable from '../../global/MasterTable.component';
import { buildQueryParams } from '../../hooks/useBuildQuery.hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  // const { data: invoiceData } = useGetInvoice(queryParams);

  // const medicineRequests: IMainInvoiceController[] = (invoiceData as any)?.data
  // ?.invoices;

  const nav = useNavigate();

  // const { mutateAsync: handleDelete } = useDeleteInvoice();
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
    rows: [],
    // rows: medicineRequests?.map((item, index) => ({
    //   sn: index + 1,
    //   date: item?.date,
    //   requestedBy:
    //     item?.supervisor?.commonInfo?.personalInfo?.fullName ?? 'N/A',
    //   patient:
    //     item?.walkInCustomer?.name ??
    //     item?.billingAgainst?.commonInfo?.personalInfo?.fullName ??
    //     'Outside Patient',
    //   paymentStatus: <Status status={item?.paymentStatus} />,
    //   status: <Status status={item?.isActive ? 'ACTIVE' : 'INVACTIVE'} />,
    //   action: (
    //     <TableAction
    //       onShow={() =>
    //         nav(`${FrontendRoutes.MEDICINERQUESTDETAILS}/${item?._id}`)
    //       }
    //       onDelete={async () => {
    //         await handleDelete({
    //           id: JSON.stringify([item?._id]),
    //         });
    //       }}
    //     />
    //   ),
    // })),
  };

  return (
    <div className="flex flex-col gap-2 pb-8">
      <AlternativeHeader
        headerTitle="Medicine Request"
        onSearch={true}
        onSearchFunc={(e: any) => {
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
            // totalPage: (invoiceData as any)?.data?.pagination?.pages,
            totalPage: 10,
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
