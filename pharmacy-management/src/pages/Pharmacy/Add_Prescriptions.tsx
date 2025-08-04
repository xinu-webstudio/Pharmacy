import { Form, FormikProvider, useFormik } from "formik";
import Header from "../../components/Header";
import { Steper } from "../../components/Stepper";
import { DropdownField, InputField } from "../../components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const validationSchema = {};

const Add_Prescriptions = () => {
  const [addMedicine, setAddMedicine] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log("hello");
  };

  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const status = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
  ];
  const medicine = [
    {
      label: "Paracetamol",
      value: "paracetamol",
    },
    {
      label: "Cough Syrup",
      value: "coughSyrup",
    },
  ];
  const dosage = [
    {
      label: "2 Tabs",
      value: "2tabs",
    },
    {
      label: "3 Tabs",
      value: "3tabs",
    },
  ];
  const condition = [
    {
      label: "Paracetamol",
      value: "paracetamol",
    },
    {
      label: "Cough Syrup",
      value: "coughSyrup",
    },
  ];

  return (
    <div>
      <Header listTitle="Add Prescription" hideHeader />

      <div className="flex gap-5">
        <div className="h-auto w-[30%]">
          <div className="flex flex-col gap-4 bg-white px-4 py-5">
            <Steper step={1} title="General Information" isActive={true} />
            <div className="h-10 w-0.5 bg-dotted border-l border-dashed border-primary ml-5"></div>
            <Steper step={2} title="Medicine Name" isActive={false} />
          </div>
        </div>
        <div className="w-[70%] h-[85vh] overflow-y-auto">
          <FormikProvider value={formik}>
            <Form className="flex flex-col gap-5 ">
              <div className="grid grid-cols-3 lg:grid-cols-3 gap-5 bg-white py-8 px-5">
                <InputField
                  type="date"
                  label="Date"
                  placeholder="Auto Filled"
                  name="date"
                />
                <InputField
                  type="text"
                  label="Patient Id"
                  placeholder="Enter"
                  name="patientId"
                />
                <InputField
                  type="text"
                  label="Patient Name"
                  placeholder="Enter "
                  name="patientName"
                />
                <InputField
                  type="text"
                  label="Doctor Name"
                  placeholder="doctor"
                  name="doctorName"
                />
                <InputField
                  type="text"
                  label="Case"
                  placeholder="Enter the medical condition"
                  name="case "
                />
                <DropdownField
                  required
                  label="Status"
                  options={status}
                  name="status"
                />
              </div>
              <div className="bg-white px-5 gap-5 py-5 flex flex-col justify-center">
                <div className="bg-white px-5 grid grid-cols-3 gap-5 py-5">
                  <DropdownField
                    required
                    label="Medicine Name"
                    options={medicine}
                    name="medicine"
                  />
                  <DropdownField
                    required
                    label="Dose"
                    options={dosage}
                    name="dosage"
                  />
                  <InputField
                    type="text"
                    label="Frequence"
                    placeholder="3 times/day"
                    name="frequency"
                  />
                  <InputField
                    type="text"
                    label="Duration"
                    placeholder="Enter"
                    name="duration"
                  />
                  <DropdownField
                    required
                    label="Condition"
                    options={condition}
                    name="condition"
                  />
                  <InputField
                    type="text"
                    label="Prescription Note"
                    placeholder="additional instructions"
                    name="prescriptionNote"
                  />
                </div>
                <div className="flex justify-center">
                  {addMedicine ? (
                    <button
                      className="bg-[#146C71] rounded-md gap-2 py-2 px-3 flex items-center font-semibold text-white"
                      onClick={() => {
                        setAddMedicine(false);
                      }}
                    >
                      <Icon
                        icon="gridicons:add"
                        height={20}
                        width={20}
                        className="text-white"
                      />
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-[#146C71] rounded-md gap-2 py-2 px-3 flex items-center font-semibold text-white"
                      onClick={() => {
                        setAddMedicine(true);
                      }}
                    >
                      <Icon
                        icon="gridicons:add"
                        height={20}
                        width={20}
                        className="text-white"
                      />
                      Add Medicine
                    </button>
                  )}
                </div>

                {addMedicine && (
                  <div className="bg-white px-5 grid grid-cols-3 gap-5 py-5">
                    <DropdownField
                      required
                      label="Medicine Name"
                      options={medicine}
                      name="medicine"
                    />
                    <DropdownField
                      required
                      label="Dose"
                      options={dosage}
                      name="dosage"
                    />
                    <InputField
                      type="text"
                      label="Frequence"
                      placeholder="3 times/day"
                      name="frequency"
                    />
                    <InputField
                      type="text"
                      label="Duration"
                      placeholder="Enter"
                      name="duration"
                    />
                    <DropdownField
                      required
                      label="Condition"
                      options={condition}
                      name="condition"
                    />
                    <InputField
                      type="text"
                      label="Prescription Note"
                      placeholder="additional instructions"
                      name="prescriptionNote"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mb-5">
                <button
                  type="button"
                  className="font-medium text-white rounded-md px-5 py-1 bg-[#989898] "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-medium text-white rounded-md py-1 px-5 bg-[#146C71] "
                >
                  Submit
                </button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
};

export default Add_Prescriptions;
