import { useState } from 'react';
import { AlternativeHeader } from '../../../components/AlternativeHeader/AlternativeHeader';
import MasterTable from '../../../layouts/Table/MasterTable';
import { TableAction } from '../../../layouts/Table/TableAction';
import { Status } from '../../../components/Status';
import { useGetPharmacyInventory } from '../../../server-action/api/pharmacy-inventory.api';
import { useOutsideClick } from '../../../hooks';
import { buildQueryParams } from '../../../hooks/useBuildQuery';

import { useNavigate } from 'react-router-dom';
import { FrontendRoutes } from '../../../routes';
import {
  InventoryDetailsTypes,
  storeInventoryDetails,
} from '../../../store/pharmacyInventory.store';

export const PharmacyInventoryPage = () => {
  const [modalProps, setModalProps] = useState({
    open: false,
    selectedData: {} as InventoryDetailsTypes,
  });

  const nav = useNavigate();

  const [pagination, setPagination] = useState({
    limit: 50,
    page: 1,
  });

  const [queryProps, setQueryProps] = useState({
    selectedDepartment: '',
    selectedSpecialist: '',
    search: '',
  });

  const ref = useOutsideClick(() =>
    setModalProps({
      ...modalProps,
      open: false,
    })
  );
  const queryParams = buildQueryParams({
    search: queryProps.search,
    combinedData: 1,
    productCategory: queryProps.selectedSpecialist,
    ...(queryProps.search || queryProps.selectedSpecialist
      ? {}
      : {
          page: pagination.page,
          limit: pagination.limit,
        }),
  });

  const { data } = useGetPharmacyInventory(queryParams);

  console.log((data as any)?.data?.medicalProductsInventory);

  const tableData = {
    columns: [
      { title: 'Medicine Name', key: 'medicineName' },
      { title: 'Categories', key: 'categories' },
      { title: 'Total Stock ', key: 'stock' },
      { title: 'Available Stock', key: 'availableStock' },

      { title: 'Available Status', key: 'status' },
      { title: 'Action', key: 'action' },
    ],
    rows: (data as any)?.data?.medicalProductsInventory?.map(
      (item: InventoryDetailsTypes, index: number) => ({
        key: index,
        medicineName: item?.product?.name ?? '-',
        categories: item?.product?.productCategory ?? '-',
        stock: item?.totalStock ?? '-',
        availableStock: item?.availableStock ?? '-',

        // status:item?.
        status: (
          <Status
            status={
              item?.availableStock > 40
                ? 'IN-STOCK'
                : item?.availableStock === 0
                ? 'OUT-STOCK'
                : 'LOW-STOCK'
            }
          />
        ),
        action: (
          <TableAction
            onShow={() => {
              storeInventoryDetails(item);
              nav(`${FrontendRoutes.PHARMACYINVENTORYDetails}`);
            }}
          />
        ),
      })
    ),
  };
  return (
    <div className="flex flex-col gap-2 pb-8">
      <AlternativeHeader
        headerTitle="Inventory List"
        onSearch={true}
        onMedicineCategory={true}
        onFilter={true}
        onSearchFunc={(e) =>
          setQueryProps({
            ...queryProps,
            search: e,
          })
        }
        onMedicineCategorySelectFunc={(e) =>
          setQueryProps({
            ...queryProps,
            selectedSpecialist: e,
          })
        }
      />
      <div className="bg-white rounded-md">
        <MasterTable
          columns={tableData.columns}
          rows={tableData.rows}
          loading={false}
          color="bg-white "
          textcolor="text-gray-400"
          pagination={{
            currentPage: pagination.page,
            totalPage: (data as any)?.data?.pagination?.pages,
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
