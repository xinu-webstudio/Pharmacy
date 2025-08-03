import { Form, FormikProvider, useFormik } from "formik";
import { GlobalForm } from "../../../../components/GlobalForm";
import { ActionButton } from "../../../../components/ActionButton";
import { PharmacyDropDownData } from "../../types/FormDropDownData.types";
import { PharmacyFormDataTypes } from "../../types/FormData.types";
import { ProductCategory } from "../../../../constant/constant";
import {
  useCreatePharmacyProduct,
  useUpdatePharmacyProduct,
} from "../../../../server-action/api/pharmacy-product.api";
import { FormLoader } from "../../../../components/Loader";
import { IMEDICALPRODUCTS } from "../../../../server-action/types/medical-product.type";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FrontendRoutes } from "../../../../routes";

interface propTypes {
  editData?: IMEDICALPRODUCTS;
  onClose?: () => void;
  navigate?: boolean;
  showRate?: boolean;
}

const validationSchema = Yup.object().shape({
  productCategory: Yup.string().required("Product Category is required"),
  medicineGenericName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Medicine generic name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Medicine name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineBrandName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Brand name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineDosageForm: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Dosage is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineStrength: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Strength is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineUsages: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Medicine usage is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicineRoute: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DRUG",
    then: (schema) => schema.required("Medicine use type is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  deviceProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DEVICES",
    then: (schema) => schema.required("Device name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  deviceBrandName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "DEVICES",
    then: (schema) => schema.required("Device brand is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  skinCareBrandName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "BEAUTIES-SKIN-CARE",
    then: (schema) => schema.required("Product brand is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  skinCareProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "BEAUTIES-SKIN-CARE",
    then: (schema) => schema.required("Product name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicalSuppliesProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "MEDICAL-SUPPLIES",
    then: (schema) => schema.required("Product name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  medicalSuppliesBrandName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "MEDICAL-SUPPLIES",
    then: (schema) => schema.required("Brand name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  labTestProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "LAB-TEST",
    then: (schema) => schema.required("Product name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  labTestBrandName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "LAB-TEST",
    then: (schema) => schema.required("Brand name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  otherProductName: Yup.string().when("productCategory", {
    is: (productCategory: string) => productCategory === "OTHER",
    then: (schema) => schema.required("Product name is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const AddPharmacyProduct = ({
  editData,
  onClose,
  navigate,
  showRate = false,
}: propTypes) => {
  const topFormData = [
    {
      type: "select",
      field: "productCategory",
      label: "Product Category",
      options: PharmacyDropDownData().productCategory,
      required: true,
    },
  ];

  let product = "";

  const nav = useNavigate();

  const { mutateAsync: createPharmacyProduct, isPending: createPending } =
    useCreatePharmacyProduct();

  const { mutateAsync: updatePharmacyProduct, isPending: updatePending } =
    useUpdatePharmacyProduct();

  const formik = useFormik({
    initialValues: {
      productCategory: editData?.productCategory ?? ProductCategory.DRUG,
      rate: editData?.rate ?? "",
      medicineGenericName: editData?.drug?.genericName ?? "",
      medicineProductName: editData?.drug?.commonName ?? "",
      medicineDosageForm: editData?.drug?.form ?? "",
      medicineStrength: editData?.drug?.strength ?? "",
      medicineBrandName: editData?.drug?.brandName ?? "",
      medicineUsages: editData?.drug?.useCase ?? "",
      medicineRxNormId: editData?.drug?.rxNormId ?? "",
      medicineNdc: editData?.drug?.ndc ?? "",
      medicineAtcCode: editData?.drug?.atcCode ?? "",
      medicineSnomedCT: editData?.drug?.snomedCT ?? "",
      deviceBrandName: editData?.device?.brandName ?? "",
      medicineRoute: editData?.drug?.route ?? "",
      deviceProductName: editData?.device?.commonName ?? "",
      deviceSize: editData?.device?.size ?? "",
      deviceColor: editData?.device?.color ?? "",
      devicePackaging: editData?.device?.packaging ?? "",
      deviceInstructions: editData?.device?.instructions ?? "",
      deviceUseCase: editData?.device?.useCase ?? "",
      otherBrandName: editData?.other?.brandName ?? "",
      otherProductName: editData?.other?.equipmentName ?? "",
      otherModel: editData?.other?.model ?? "",
      otherSerialNumber: editData?.other?.serialNumber ?? "",
      otherManufacturer: editData?.other?.manufacturer ?? "",
      otherPackaging: editData?.other?.packaging ?? "",
      otherInstructions: editData?.other?.instructions ?? "",
      otherRemarks: editData?.other?.remarks ?? "",
      otherUseCase: editData?.other?.useCase ?? "",
      skinCareProductName: editData?.beautySkinCare?.commonName ?? "",
      skinCareBrandName: editData?.beautySkinCare?.brandName ?? "",
      skinCareSkinType: editData?.beautySkinCare?.skinType ?? "",
      skinCareVolume: editData?.beautySkinCare?.volume ?? "",
      skinCareCategory: editData?.beautySkinCare?.category ?? "",
      skinCareUseCase: editData?.beautySkinCare?.useCase ?? "",
      skinCarePackaging: editData?.beautySkinCare?.packaging ?? "",
      skinCareInstructions: editData?.beautySkinCare?.instructions ?? "",
      medicalSuppliesProductName: editData?.medicalSupplies?.commonName ?? "",
      medicalSuppliesBrandName: editData?.medicalSupplies?.brandName ?? "",
      medicalSuppliesMaterial: editData?.medicalSupplies?.material ?? "",
      medicalSuppliesUseCase: editData?.medicalSupplies?.useCase ?? "",
      medicalSuppliesSize: editData?.medicalSupplies?.size ?? "",
      medicalSuppliesColor: editData?.medicalSupplies?.color ?? "",
      medicalSuppliesPackaging: editData?.medicalSupplies?.packaging ?? "",
      labTestProductName: editData?.labTestEquipment?.equipmentName ?? "",
      labTestBrandName: editData?.labTestEquipment?.brandName ?? "",
      labTestUseCase: editData?.labTestEquipment?.useCase ?? "",
      labTestModel: editData?.labTestEquipment?.model ?? "",
      labTestSerialNumber: editData?.labTestEquipment?.serialNumber ?? "",
      labTestManufacturer: editData?.labTestEquipment?.manufacturer ?? "",
      labTestCategory: editData?.labTestEquipment?.category ?? "",
      labTestPackaging: editData?.labTestEquipment?.packaging ?? "",
      labTestInstructions: editData?.labTestEquipment?.instructions ?? "",
      labTestRemarks: editData?.labTestEquipment?.remarks ?? "",
      prescriptionRequired: editData?.prescriptionRequired ?? false,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      if (values.productCategory === ProductCategory.DRUG) {
        product = values.medicineProductName;
      }

      if (values.productCategory === ProductCategory.BEAUTIESSKINCARE)
        product = values.skinCareProductName;

      if (values.productCategory === ProductCategory.DEVICES)
        product = values.deviceProductName;

      if (values.productCategory === ProductCategory.LABTEST)
        product = values.labTestProductName;

      if (values.productCategory === ProductCategory.OTHER)
        product = values.otherProductName;

      if (values.productCategory === ProductCategory.MEDICALSUPPLIES)
        product = values.medicalSuppliesProductName;

      try {
        let formData: IMEDICALPRODUCTS = {
          productCategory: values.productCategory,
          name: product,
          prescriptionRequired: values.prescriptionRequired,
          rate: Number(values.rate),
        };
        if (values.productCategory === ProductCategory.DRUG) {
          formData["drug"] = {
            genericName: values.medicineGenericName,
            commonName: values.medicineProductName,
            brandName: values.medicineBrandName,
            strength: values.medicineStrength,
            form: values.medicineDosageForm,
            route: values.medicineRoute,
            useCase: values.medicineUsages,
            rxNormId: values.medicineRxNormId,
            ndc: values.medicineNdc,
            atcCode: values.medicineAtcCode,
            snomedCT: values.medicineSnomedCT,
          };
        }
        if (values.productCategory === ProductCategory.DEVICES) {
          formData["device"] = {
            brandName: values.deviceBrandName,
            commonName: values.deviceProductName,
            size: values.deviceSize,
            color: values.deviceColor,
            packaging: values.devicePackaging,
            useCase: values.deviceUseCase,
            instructions: values.deviceInstructions,
          };
        }
        if (values.productCategory === ProductCategory.BEAUTIESSKINCARE) {
          formData["beautySkinCare"] = {
            brandName: values.skinCareBrandName,
            commonName: values.skinCareProductName,
            category: values.skinCareCategory,
            packaging: values.skinCarePackaging,
            useCase: values.skinCareUseCase,
            instructions: values.skinCareInstructions,
            volume: values.skinCareVolume,
            skinType: values.skinCareSkinType,
          };
        }
        if (values.productCategory === ProductCategory.OTHER) {
          formData["other"] = {
            brandName: values.otherBrandName,
            equipmentName: values.otherProductName,
            model: values.otherModel,
            serialNumber: values.otherSerialNumber,
            manufacturer: values.otherManufacturer,
            packaging: values.otherPackaging,
            instructions: values.otherInstructions,
            useCase: values.otherUseCase,
            remarks: values.otherRemarks,
          };
        }

        if (values.productCategory === ProductCategory.MEDICALSUPPLIES) {
          formData["medicalSupplies"] = {
            brandName: values.medicalSuppliesBrandName,
            commonName: values.medicalSuppliesProductName,
            material: values.medicalSuppliesMaterial,
            packaging: values.medicalSuppliesPackaging,
            useCase: values.medicalSuppliesUseCase,
            color: values.medicalSuppliesColor,
            size: values.medicalSuppliesSize,
          };
        }

        if (values.productCategory === ProductCategory.LABTEST) {
          formData["labTestEquipment"] = {
            brandName: values.labTestBrandName,
            equipmentName: values.labTestProductName,
            model: values.labTestModel,
            category: values.labTestCategory,
            useCase: values.labTestUseCase,
            manufacturer: values.labTestManufacturer,
            serialNumber: values.labTestSerialNumber,
            instructions: values.labTestInstructions,
            packaging: values.labTestPackaging,
            remarks: values.labTestRemarks,
          };
        }

        if (editData) {
          await updatePharmacyProduct({
            _id: editData?._id ?? "",
            entityData: formData,
          });
          onClose?.();
        } else {
          await createPharmacyProduct(formData);
          if (navigate) {
            onClose?.();
            nav(FrontendRoutes.NEWPURCHASEORDER);
          } else {
            onClose?.();
          }
        }
      } catch (error) {}
    },
  });

  const { handleSubmit, errors, touched } = formik;
  return (
    <div className="w-full ">
      {(createPending || updatePending) && (
        <FormLoader isLoading={createPending || updatePending} />
      )}
      <FormikProvider value={formik}>
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col gap-x-5 gap-y-2 w-full "
        >
          <section className="grid grid-cols-2  place-items-center w-full   gap-x-5 gap-y-0.5 ">
            <GlobalForm
              formDatails={topFormData}
              getFieldProps={formik.getFieldProps}
              errors={errors as any}
              touched={touched as any}
            />
          </section>

          <section className="grid grid-cols-3  place-items-center w-full border rounded-lg p-3  gap-x-5 gap-y-0.5 ">
            {formik.values.productCategory === ProductCategory.DEVICES && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).deviceFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
            {formik.values.productCategory === ProductCategory.DRUG && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).medicineFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
            {formik.values.productCategory === ProductCategory.OTHER && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).otherFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
            {formik.values.productCategory ===
              ProductCategory.BEAUTIESSKINCARE && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).skinCareFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
            {formik.values.productCategory ===
              ProductCategory.MEDICALSUPPLIES && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).medicalSuppliesFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
            {formik.values.productCategory === ProductCategory.LABTEST && (
              <GlobalForm
                formDatails={
                  PharmacyFormDataTypes({
                    showRate,
                  }).labTestFormData
                }
                getFieldProps={formik.getFieldProps}
                errors={errors as any}
                touched={touched as any}
              />
            )}
          </section>

          <div className="col-span-3">
            <ActionButton
              onCancel={() => {
                formik.resetForm();
                onClose?.();
              }}
              submitLabel="Save"
              submitlabelButton
              onSubmit={handleSubmit}
            />
          </div>
        </Form>
      </FormikProvider>
      {/* 
          {createPending ||
            (updatePending && (
              <FormLoader isLoading={createPending || updatePending} />
            ))} */}
    </div>
  );
};
