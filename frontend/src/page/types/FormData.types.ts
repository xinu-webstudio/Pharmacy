import { PharmacyDropDownData } from './FormDropDownData.types';

interface propTypes {
  showRate: boolean;
}

export const PharmacyFormDataTypes = ({ showRate = false }: propTypes) => {
  const medicineFormData = [
    {
      type: 'text',
      field: 'medicineGenericName',
      label: 'Generic Name',
      required: true,
    },
    {
      type: 'text',
      field: 'medicineProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'medicineBrandName',
      label: 'Brand Name',
      required: true,
    },
    {
      type: 'select',
      field: 'medicineDosageForm',
      label: 'Dosage Form',
      options: PharmacyDropDownData().formCategory,
      required: true,
    },
    {
      type: 'text',
      field: 'medicineRxNormId',
      label: 'Rx Norm Id',
    },
    {
      type: 'text',
      field: 'medicineNdc',
      label: 'NDC',
    },
    {
      type: 'text',
      field: 'medicineAtcCode',
      label: 'Atc Code',
    },
    {
      type: 'text',
      field: 'medicineSnomedCT',
      label: 'Snomed CT',
    },
    {
      type: 'text',
      field: 'medicineStrength',
      label: 'Strength',
      required: true,
    },
    {
      type: 'text',
      field: 'medicineUsages',
      label: 'Usages',
      required: true,
    },
    {      // className: 'col-span-3',

      type: 'select',
      field: 'medicineRoute',
      label: 'Use Type',
      required: true,
      options: PharmacyDropDownData().routeCategory,
      className: 'col-span-3',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  const deviceFormData = [
    {
      type: 'text',
      field: 'deviceBrandName',
      label: 'Brand Name',
      required: true,
    },
    {
      type: 'text',
      field: 'deviceProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'deviceSize',
      label: 'Size',
    },
    {
      type: 'text',
      field: 'deviceColor',
      label: 'Color',
    },
    {
      type: 'select',
      field: 'devicePackaging',
      label: 'Packaging',
      options: PharmacyDropDownData().packagingCategory,
    },
    {
      type: 'text',
      field: 'deviceUseCase',
      label: 'Usages',
    },
    {
      type: 'text',
      field: 'deviceInstructions',
      label: 'Instructions',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  const otherFormData = [
    {
      type: 'text',
      field: 'otherProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'otherBrandName',
      label: 'Brand Name',
    },
    {
      type: 'text',
      field: 'otherModel',
      label: 'Model',
    },
    {
      type: 'text',
      field: 'otherSerialNumber',
      label: 'Serial Number',
    },
    {
      type: 'text',
      field: 'otherManufacturer',
      label: 'Manufacturer',
    },
    {
      type: 'select',
      field: 'otherPackaging',
      label: 'Packaging',
      options: PharmacyDropDownData().packagingCategory,
    },
    {
      type: 'text',
      field: 'otherInstructions',
      label: 'Instructions',
    },
    {
      type: 'text',
      field: 'otherUseCase',
      label: 'Use Case',
    },

    {
      type: 'text',
      field: 'otherRemarks',
      label: 'Remarks',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  const skinCareFormData = [
    {
      type: 'text',
      field: 'skinCareProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'skinCareBrandName',
      label: 'Brand Name',
      required: true,
    },
    {
      type: 'text',
      field: 'skinCareSkinType',
      label: 'Skin Type',
    },
    {
      type: 'text',
      field: 'skinCareVolume',
      label: 'Volume',
    },

    {
      type: 'select',
      field: 'skinCareCategory',
      label: 'Category',
      options: PharmacyDropDownData().skinCategory,
    },

    {
      type: 'select',
      field: 'skinCarePackaging',
      label: 'Packaging',
      options: PharmacyDropDownData().packagingCategory,
    },
    {
      type: 'text',
      field: 'skinCareInstructions',
      label: 'Instructions',
    },
    {
      type: 'text',
      field: 'skinCareUseCase',
      label: 'Use Case',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  const medicalSuppliesFormData = [
    {
      type: 'text',
      field: 'medicalSuppliesProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'medicalSuppliesBrandName',
      required: true,
      label: 'Brand Name',
    },
    {
      type: 'text',
      field: 'medicalSuppliesMaterial',
      label: 'Material',
    },
    {
      type: 'text',
      field: 'medicalSuppliesSize',
      label: 'Size',
    },
    {
      type: 'text',
      field: 'medicalSuppliesColor',
      label: 'Color',
    },
    {
      type: 'select',
      field: 'medicalSuppliesPackaging',
      label: 'Packaging',
      options: PharmacyDropDownData().packagingCategory,
    },

    {
      type: 'text',
      field: 'medicalSuppliesUseCase',
      label: 'Use Case',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  const labTestFormData = [
    {
      type: 'text',
      field: 'labTestProductName',
      label: 'Product Name',
      required: true,
    },
    {
      type: 'text',
      field: 'labTestBrandName',
      label: 'Brand Name',
      required: true,
    },
    {
      type: 'text',
      field: 'labTestModel',
      label: 'Model',
    },
    {
      type: 'text',
      field: 'labTestManufacturer',
      label: 'Manufacturer',
    },
    {
      type: 'text',
      field: 'labTestSerialNumber',
      label: 'Serial Number',
    },
    {
      type: 'select',
      field: 'labTestPackaging',
      label: 'Packaging',
      options: PharmacyDropDownData().packagingCategory,
    },
    {
      type: 'select',
      field: 'labTestCategory',
      label: 'Category',
      options: PharmacyDropDownData().labTestCategory,
    },

    {
      type: 'text',
      field: 'labTestUseCase',
      label: 'Use Case',
    },

    {
      type: 'text',
      field: 'labTestInstructions',
      label: 'Instructions',
    },

    {
      type: 'text',
      field: 'labTestRemarks',
      label: 'Remarks',
    },

    {
      type: 'radio',
      field: 'prescriptionRequired',
      label: 'Prescription Required',
      required: false,
      className: 'col-span-3',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' },
      ],
    },
    {
      type: 'text',
      field: 'rate',
      label: 'MRP Rate',
      isVisible: showRate,
    },
  ];

  return {
    medicineFormData,
    deviceFormData,
    otherFormData,
    skinCareFormData,
    medicalSuppliesFormData,
    labTestFormData,
  };
};
