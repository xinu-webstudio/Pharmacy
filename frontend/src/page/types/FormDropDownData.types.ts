import {
  FORMENUM,
  LABTESTCATEGORYENUM,
  PACKAGINGENUM,
  ProductCategory,
  ROUTEENUM,
  SKINCARECATEGORYENUM,
} from '../../constants/constants';

export const PharmacyDropDownData = () => {
  const productCategory = [
    {
      label: 'Medicine',
      value: ProductCategory.DRUG,
    },
    {
      label: 'Devices',
      value: ProductCategory.DEVICES,
    },
    {
      label: 'Skin Care',
      value: ProductCategory.BEAUTIESSKINCARE,
    },
    {
      label: 'Medical Supplies',
      value: ProductCategory.MEDICALSUPPLIES,
    },
    {
      label: 'Lab Test Equipment',
      value: ProductCategory.LABTEST,
    },

    {
      label: 'Other',
      value: ProductCategory.OTHER,
    },
  ];

  const formCategory = [
    {
      label: 'Tablet',
      value: FORMENUM.TABLET,
    },
    {
      label: 'Injection',
      value: FORMENUM.INJECTION,
    },
    {
      label: 'Liquid',
      value: FORMENUM.LIQUID,
    },
    {
      label: 'Cream',
      value: FORMENUM.CREAM,
    },
    {
      label: 'Gel',
      value: FORMENUM.GEL,
    },
    {
      label: 'Powder',
      value: FORMENUM.POWDER,
    },
    {
      label: 'Other',
      value: FORMENUM.OTHER,
    },
  ];

  const routeCategory = [
    {
      label: 'Inhalation',
      value: ROUTEENUM.INHALATION,
    },
    {
      label: 'Injection',
      value: ROUTEENUM.INJECTION,
    },
    {
      label: 'Oral',
      value: ROUTEENUM.ORAL,
    },
    {
      label: 'Topical',
      value: ROUTEENUM.TOPICAL,
    },
    {
      label: 'Other',
      value: ROUTEENUM.OTHER,
    },
  ];

  const packagingCategory = [
    {
      label: 'Box',
      value: PACKAGINGENUM.BOX,
    },
    {
      label: 'Bottle',
      value: PACKAGINGENUM.BOTTLE,
    },
    {
      label: 'Strip',
      value: PACKAGINGENUM.STRIP,
    },
    {
      label: 'Vial',
      value: PACKAGINGENUM.VIAL,
    },
    {
      label: 'Other',
      value: PACKAGINGENUM.OTHER,
    },
  ];

  const skinCategory = [
    {
      label: 'Body Lotion',
      value: SKINCARECATEGORYENUM.BODYLOTION,
    },
    {
      label: 'Cleanser',
      value: SKINCARECATEGORYENUM.CLEANSER,
    },
    {
      label: 'Exfoliator',
      value: SKINCARECATEGORYENUM.EXFOLIATOR,
    },
    {
      label: 'Eye Cream',
      value: SKINCARECATEGORYENUM.EYECREAM,
    },
    {
      label: 'Lip Care',
      value: SKINCARECATEGORYENUM.LIPCARE,
    },
    {
      label: 'Mask',
      value: SKINCARECATEGORYENUM.MASK,
    },
    {
      label: 'Moisturizer',
      value: SKINCARECATEGORYENUM.MOISTURIZER,
    },
    {
      label: 'Serum',
      value: SKINCARECATEGORYENUM.SERUM,
    },
    {
      label: 'Sun Screen',
      value: SKINCARECATEGORYENUM.SUNSCREEN,
    },
    {
      label: 'Toner',
      value: SKINCARECATEGORYENUM.TONER,
    },
    {
      label: 'Other',
      value: SKINCARECATEGORYENUM.OTHER,
    },
  ];

  const labTestCategory = [
    {
      label: 'Analyser',
      value: LABTESTCATEGORYENUM.ANALYSER,
    },
    {
      label: 'Microscope',
      value: LABTESTCATEGORYENUM.MICROSCOPE,
    },
    {
      label: 'Centrifuge',
      value: LABTESTCATEGORYENUM.CENTRIFUSE,
    },
    {
      label: 'Incubator',
      value: LABTESTCATEGORYENUM.INCUBATOR,
    },
    {
      label: 'Spectrophotometer',
      value: LABTESTCATEGORYENUM.SPECTROPHOTOMETER,
    },
    {
      label: 'Other',
      value: LABTESTCATEGORYENUM.OTHER,
    },
  ];

  return {
    productCategory,
    packagingCategory,
    formCategory,
    routeCategory,
    skinCategory,
    labTestCategory,
  };
};
