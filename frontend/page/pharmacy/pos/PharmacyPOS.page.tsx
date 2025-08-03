import { buildQueryParams } from '../../../hooks/useBuildQuery.hooks';
import { MedicineCartTypes } from '../types/MedcineCart.types';
import { findNearestExpiryBatch } from './utils/FindNearestBatch.utils';
import { userRole } from '././../../../constants/constants';
import { calculateAge } from '../../../utils/calculate-age';
import { MedicineCart } from './components/Cart.component';
import { MedicineList } from './components/MedicineList.component';
import { GlobalForm } from '../../../global/GlobalForm.component';
import { DropdownField } from '../../../global/inputs/DropdownField.component';

export const customerOptions = [
  {
    value: 'new',
    label: 'Walk in Customer',
  },
  {
    value: 'IPD',
    label: 'In-patients',
  },
  {
    value: 'OPD',
    label: 'Out-patients',
  },
  {
    value: 'EMERGENCY',
    label: 'Emergency',
  },
];

export const PharmacyPosPage = () => {
  // optional for closing sidebar automatically when navigation hits this page
  // const { toggleSidebar, miniSidebar } = useSidebar();
  // useEffect(() => {
  //   if (miniSidebar) {
  //     toggleSidebar();
  //   }
  // }, []);

  const formik = useFormik({
    initialValues: {
      customerType: 'new',
      productCategory: 'all',
      paymentMethod: 'CASH',

      search: '',
      tel: '',
      address: '',

      //for outside patient
      patient: '',
      reseller: '',

      //for registeredPatient
      patientId: '',
      patientName: '',
      patientRegisteredId: '',
      patientAge: '',
      patientGender: '',
      supervisor: '',
      selectedMedicine: [] as MedicineCartTypes[],
      totalAmount: '',
      subTotal: '',
      paidAmount: '',
      remarks: '',
      taxValue: '',
      invoiceNo: '',
      bank: '',
      pan: '',
      accountNo: '',
      currentInvoiceId: '',

      notes: '',

      tax: '',
      discount: '',
      total: '',
      due: '',
      cashRecieved: '',
    },
    onSubmit: (values) => {},
  });

  const isNew = formik.values.customerType === 'new';

  const userqueryParams = buildQueryParams({
    role: isNew ? userRole.RESELLER : userRole.PATIENT,
    ...(isNew
      ? {}
      : {
          'commonInfo.ipdOpd': formik.values.customerType,
        }),
  });

  const { data: userData } = useGetUser(userqueryParams);

  const userOptions = (userData as any)?.data?.users?.map((item: IUser) => ({
    value: item._id,
    label: `${item?.patientInfo?.patientId} - ${item?.commonInfo?.personalInfo?.fullName} `,
    name: item?.commonInfo?.personalInfo?.fullName,
    contact: item?.commonInfo?.contactInfo?.phone,
    address:
      item?.commonInfo?.contactInfo?.address?.currentAddress ||
      item?.commonInfo?.contactInfo?.address?.permanentAddress,
    gender: item?.commonInfo?.personalInfo?.gender,
    phone: item?.commonInfo?.contactInfo?.phone?.primaryPhone,
    age: calculateAge(item?.commonInfo?.personalInfo?.dob ?? ''),
  }));

  const resellerOptions = (userData as any)?.data?.users?.map(
    (item: IUser) => ({
      value: item._id,
      label: `${item?.commonInfo?.personalInfo?.fullName}`,
    })
  );

  const isPatient = formik.values.patientId;

  const invoiceQueryParams = buildQueryParams({
    ...(isPatient
      ? {
          billingAgainst: formik.values.patientId,
          inventoryFor: 'PHARMACY',
          category: 'SALE',
          paymentStatus: 'PENDING',
        }
      : {}),
  });

  const { data: patientHistoryData } = useGetInvoice(invoiceQueryParams);

  const customerFormData = [
    {
      type: 'multi-search',
      field: 'patientId',
      label: 'Patient ID',
      required: true,
      isVisible: formik.values.customerType === 'new' ? false : true,
      options: userOptions,
    },

    {
      type: 'text',
      field: 'patientName',
      label: 'Patient Name',
      required: true,
      isVisible: formik.values.customerType !== 'new' ? true : false,
    },

    {
      type: 'text',
      field: 'patient',
      label: 'Patient Name',
      required: true,
      isVisible: formik.values.customerType === 'new' ? true : false,
    },

    {
      type: 'text',
      field: 'doctor',
      label: 'Prescribed By',
      isVisible: formik.values.customerType === 'new' ? false : true,
    },

    {
      type: 'text',
      field: 'nmc',
      label: 'NMC',
      isVisible: formik.values.customerType === 'new' ? false : true,
    },
    {
      type: 'text',
      field: 'tel',
      label: 'Telephone',
      required: true,
      //   isVisible: formik.values.customerType === 'new' ? false : true,
    },

    {
      type: 'text',
      field: 'pan',
      label: 'PAN',
      //   isVisible: formik.values.customerType === 'new' ? false : true,
    },

    {
      type: 'text',
      field: 'address',
      label: 'Address',
      required: true,
      //   isVisible: formik.values.customerType === 'new' ? false : true,
    },
    {
      type: 'multi-search',
      field: 'reseller',
      label: 'Referral',
      isVisible: formik.values.customerType === 'new' ? true : false,
      options: resellerOptions,
    },
  ];

  // useEffect(() => {
  //   if (formik.values.customerType !== 'new' && formik.values.patientId) {
  //     formik.setFieldValue('selectedMedicine', []);
  //   }
  // }, [formik.values.patientId, formik.values.customerType]);

  useEffect(() => {
    // Only update when a patient is explicitly selected AND patient history data is available

    if (
      formik.values.patientId &&
      patientHistoryData &&
      (patientHistoryData as any)?.data?.invoices?.length > 0
    ) {
      const selectedPatient = (patientHistoryData as any)?.data?.invoices?.[0];

      formik.setFieldValue('currentInvoiceId', selectedPatient?._id);
      if (selectedPatient?.supervisor) {
        formik.setFieldValue('supervisor', selectedPatient?.supervisor);
      }

      if (selectedPatient?.productList?.length > 0) {
        // const batches

        const toTable = selectedPatient?.productList?.map(
          (item: IProductInventory) => {
            const nearestBatch = findNearestExpiryBatch(item?.batches ?? []);

            return {
              quantity: item?.quantity ?? 1,
              item: {
                // productCategory: item?.product?.productCategory,
                expiryDate: nearestBatch?.expiryDate,
                // strength,
                availableStock: nearestBatch?.availableStock,
                fromInvoice: true,
                mrpRate: nearestBatch?.mrpRate,
                // medicineForm,
                batchId: nearestBatch?._id,
                batch: nearestBatch?.batchNo,
                product: item?.pProduct?.name ?? '',
                productId: item?.pProduct?._id ?? '',
                _id: item?.pProduct?._id,
                doses: item?.doses,
                frequency: item?.frequency,
                duration: item?.duration,
              },
            };
          }
        );

        formik.setFieldValue('selectedMedicine', toTable);
      }
    }
  }, [patientHistoryData, formik.values.patientId]);

  return (
    <div className="flex flex-col ">
      <FormikProvider value={formik}>
        <Form className="grid grid-cols-2 gap-2">
          <section className="col-span-2 shadow rounded flex bg-white px-2 pt-1 pb-1">
            <DropdownField
              options={customerOptions}
              value={formik.values.customerType}
              firstInput="Select customer"
              onChange={(e) =>
                formik.setFieldValue('customerType', e.target.value)
              }
            />
          </section>

          <section className="col-span-2 bg-white px-3 py-2 grid grid-cols-4 gap-x-4 gap-y-0.5 shadow rounded">
            <GlobalForm
              formDatails={customerFormData}
              getFieldProps={formik.getFieldProps}
              errors={formik.errors}
              touched={formik.touched}
              onValueChange={(field, value) => {
                if (field === 'patientId') {
                  const selectedUser = userOptions.find(
                    (option: UserOption) => option.value === value
                  );

                  formik.setFieldValue('patientId', value);
                  if (selectedUser) {
                    formik.setFieldValue('patientName', selectedUser.name);
                    formik.setFieldValue('tel', selectedUser.phone);
                    formik.setFieldValue('address', selectedUser.address);
                  }
                }

                if (field === 'reseller') {
                  formik.setFieldValue('reseller', value);
                }
              }}
            />
          </section>

          <section className="grid grid-cols-2 gap-3 col-span-2">
            <MedicineCart formik={formik} />

            <MedicineList formik={formik} />
          </section>
        </Form>
      </FormikProvider>
    </div>
  );
};
