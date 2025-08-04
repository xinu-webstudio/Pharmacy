import { useOutsideClick } from '../../hooks/useOutsideClick.hook';
import { useState } from 'react';
import { PharmacyProductTableData } from '../types/PharmacyProductTableData';
import { ProductCategory } from '../../constants/constants';
import { AlternativeHeader } from '../../global/AlternativeHeader.component';
import { ExtraCustomTabs } from '../../global/CustomTabWithExtraField.component';
import MasterTable from '../../global/MasterTable.component';
import { PopupModal } from '../../global/PopupModal.component';
import { Text } from '../../global/Text.component';
import { AddPharmacyProduct } from './components/AddPharmacyProduct.component';
import { TabData } from '../types/TabData.types';

export const PharmacyProductListPage = () => {
  const [tabValue, setTabValue] = useState('DRUG');
  const [selectedData, setSelectedData] = useState<any>();

  const [queryProps, setQueryProps] = useState({
    selectedDepartment: '',
    selectedSpecialist: '',
    search: '',
  });

  const [viewModal, setViewModal] = useState(false);

  const modalRef = useOutsideClick(() => setViewModal(false));

  const {
    medicineTableData,
    pharmacyProduct,
    deviceTableData,
    skinTableData,
    otherTableData,
    medicalSuppliesTableData,
    labTestTableData,
    pagination,
    setPagination,
  } = PharmacyProductTableData({
    tabValue: tabValue,
    setSelectedData: setSelectedData,
    setViewModal: setViewModal,
    search: queryProps.search,
  });

  const column =
    tabValue === ProductCategory.DRUG
      ? medicineTableData.columns
      : tabValue === ProductCategory.DEVICES
      ? deviceTableData.columns
      : tabValue === ProductCategory.BEAUTIESSKINCARE
      ? skinTableData.columns
      : tabValue === ProductCategory.MEDICALSUPPLIES
      ? medicalSuppliesTableData.columns
      : tabValue === ProductCategory.LABTEST
      ? labTestTableData.columns
      : otherTableData.columns;

  const row =
    tabValue === 'DRUG'
      ? medicineTableData.rows
      : tabValue === 'DEVICES'
      ? deviceTableData.rows
      : tabValue === ProductCategory.BEAUTIESSKINCARE
      ? skinTableData.rows
      : tabValue === ProductCategory.MEDICALSUPPLIES
      ? medicalSuppliesTableData.rows
      : tabValue === ProductCategory.LABTEST
      ? labTestTableData.rows
      : otherTableData.rows;
  return (
    <div className="flex flex-col gap-2 pb-8">
      <AlternativeHeader
        headerTitle="Product List"
        onSearch={true}
        button={true}
        buttonText="Add Product"
        buttonAction={() => {
          setSelectedData(undefined);
          setViewModal(true);
        }}
        onSearchFunc={(e) => {
          setQueryProps({
            ...queryProps,
            search: e,
          });
        }}
      />
      <div className="bg-white rounded-md">
        <ExtraCustomTabs
          tabs={TabData}
          defaultTab={tabValue}
          onTabChange={(tab) => setTabValue(tab)}
        />

        <MasterTable
          columns={column}
          rows={row}
          loading={false}
          color="bg-white "
          textcolor="text-gray-400"
          pagination={{
            currentPage: pagination.page,
            totalPage: (pharmacyProduct as any)?.data?.pagination?.pages,
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

      {viewModal && (
        <PopupModal ref={modalRef} classname="p-4 max-w-[850px] w-full">
          <Text
            as="h3"
            size="body-md-default"
            // variant="primary-blue"
            className=" text-[#4188f2] mb-2"
          >
            {selectedData ? 'Edit Product' : 'Add Product'}
          </Text>

          <AddPharmacyProduct
            editData={selectedData}
            onClose={() => setViewModal(false)}
          />
        </PopupModal>
      )}
    </div>
  );
};
