import { useState } from 'react';
import { buildQueryParams } from '../../../hooks/useBuildQuery';
import { TableAction } from '../../../layouts/Table/TableAction';
import {
  useDeletePharmacyProductByQuery,
  useGetPharmacyProduct,
} from '../../../server-action/api/pharmacy-product.api';
import { IMEDICALPRODUCTS } from '../../../server-action/types/medical-product.type';

interface propTypes {
  tabValue: string;
  setSelectedData?: React.Dispatch<
    React.SetStateAction<IMEDICALPRODUCTS | undefined>
  >;
  setViewModal?: React.Dispatch<React.SetStateAction<boolean>>;
  search?: string;
}

export const PharmacyProductTableData = ({
  tabValue,
  setSelectedData,
  setViewModal,
  search,
}: propTypes) => {
  const [pagination, setPagination] = useState({
    limit: 5,
    page: 1,
  });
  const queryParams = buildQueryParams({
    productCategory: tabValue,
    search: search,
    ...(search ? {} : { page: pagination.page, limit: pagination.limit }),
  });

  const { data: pharmacyProduct } = useGetPharmacyProduct(queryParams);

  const { mutateAsync: handleDelete } = useDeletePharmacyProductByQuery();

  const medicineTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Strength', key: 'strength' },
      { title: 'Dosage Form', key: 'dosageForm' },
      { title: 'Usages', key: 'usages' },
      { title: 'Action', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        strength: item?.drug?.strength ?? '-',
        dosageForm: item?.drug?.form ?? '-',
        usages: item?.drug?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  const deviceTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Usages', key: 'usages' },
      { title: 'Actions', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        usages: item?.device?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  const skinTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Category', key: 'category' },

      { title: 'Usages', key: 'usages' },
      { title: 'Actions', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        category: item?.beautySkinCare?.category ?? '-',
        usages: item?.beautySkinCare?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  const otherTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Model', key: 'model' },

      { title: 'Usages', key: 'usages' },
      { title: 'Actions', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        model: item?.other?.model ?? '-',
        usages: item?.other?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  const medicalSuppliesTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Brand Name', key: 'brand' },
      { title: 'Usages', key: 'usages' },
      { title: 'Actions', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        brand: item?.medicalSupplies?.brandName ?? '-',
        usages: item?.medicalSupplies?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  const labTestTableData = {
    columns: [
      { title: 'S.N.', key: 'sn' },
      { title: 'Product Name', key: 'product' },
      { title: 'Brand Name', key: 'brand' },
      { title: 'Usages', key: 'usages' },
      { title: 'Actions', key: 'action' },
    ],
    rows: (pharmacyProduct as any)?.data?.medicalProducts?.map(
      (item: IMEDICALPRODUCTS, index: number) => ({
        sn: index + 1,
        product: item?.name ?? '-',
        brand: item?.labTestEquipment?.brandName ?? '-',
        usages: item?.labTestEquipment?.useCase ?? '-',
        action: (
          <TableAction
            onEdit={() => {
              setSelectedData?.(item);
              setViewModal?.(true);
            }}
            onDelete={() => {
              handleDelete({
                id: JSON.stringify([item?._id]),
              });
            }}
          />
        ),
      })
    ),
  };

  return {
    medicineTableData,
    pharmacyProduct,
    deviceTableData,
    skinTableData,
    otherTableData,
    medicalSuppliesTableData,
    labTestTableData,
    pagination,
    setPagination,
  };
};
