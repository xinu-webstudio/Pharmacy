import { Form, useFormik } from "formik";
import { FormikProvider } from "formik";
import { InputField } from "../../src/components/Input-Field";
import { toast } from "react-toastify";
import { DropdownField } from "../../src/components";
import MasterTable from "../../src/layouts/Table/MasterTable";
import { TableAction } from "../../src/layouts/Table/TableAction";

const category = [
  {
    label: "medicine",
    value: "Electronics",
  },
  {
    label: "Clothing",
    value: "Clothing",
  },
  {
    label: "Furniture",
    value: "Furniture",
  },
];

const discount = [
  {
    label: "1500",
    value: "1500",
  },
];

const doctor = [
  {
    label: "Dr. John Doe",
    value: "Dr. John Doe",
  },
];

const purchaseData = [
  {
    itemName: "Paracetamol",
    unitprice: "11,220",
    amount: "22,400",
    status: "ACTIVE",
  },
];

export const SalesPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-6">
        <BasicInformation />
      </div>
    </div>
  );
};

export default SalesPage;

export const BasicInformation = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      paitentId: "",
      department: "",
      date: "",
      doctor: "",
      items: purchaseData.map((item) => ({ quantity: 0, item })),
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      toast.success("Form submitted successfully!");
      history.back();
      console.log(values);
    },
  });

  const { handleSubmit } = formik;

  const tableData = {
    columns: [
      { title: "S.N", key: "sn" },
      { title: "Service / Item name", key: "serviceItem" },
      { title: "", key: "space" },
      { title: "Quantity", key: "quantity" },
      { title: "Unit Price", key: "unitprice" },
      { title: "Amount", key: "amount" },
      { title: "", key: "action" },
    ],
    rows: purchaseData.map((item, index) => ({
      sn: index,
      serviceItem: item.itemName,
      quantity: (
        <InputField
          label=""
          type="number"
          name={`items.${index}.quantity`}
          value={formik.values.items[index].quantity}
          onChange={formik.handleChange}
          placeholder="0"
        />
      ),
      space: <div className="w-[36rem] bg-black"></div>,
      amount: item.unitprice,
      unitprice: item.amount,
      action: <TableAction onDelete={() => {}} />,
    })),
  };

  return (
    <>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 py-8 px-5 w-full bg-white">
              <InputField
                type="text"
                label="Receipt Number"
                placeholder="Auto"
                name="receiptno"
              />
              <InputField
                type="date"
                label="Receipt Date"
                placeholder="Auto"
                name="receiptdate"
              />
              <InputField
                type="text"
                label="Patient ID"
                placeholder="Enter ID, Name"
                name="patientid"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 py-8 px-5 w-full bg-white">
              <DropdownField
                label="Product Name"
                name="productname"
                options={category}
              />
              <DropdownField
                label="Refered By"
                name="referedby"
                options={doctor}
              />
              <DropdownField
                label="Paitent Type"
                name="paitenttype"
                options={doctor}
              />
            </div>

            <div className="p-6 bg-white">
              <MasterTable
                columns={tableData.columns}
                rows={tableData.rows}
                loading={false}
                color="bg-[#f2f2f2] text-black"
                textcolor="text-black"
              />
              <div className="flex justify-end w-full h-full">
                <div className="flex flex-col gap-2 w-1/5 h-full ">
                  <div className="flex justify-between">
                    <h1>Sub Total with Vat (13%)</h1>
                    <h1 className="font-semibold">51,000</h1>
                  </div>
                  <div className="flex justify-between items-center ">
                    <h1>Discount</h1>
                    <div className="">
                      <DropdownField
                        label=""
                        name="discount"
                        options={discount}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <h1>Total</h1>
                    <h1 className="font-semibold">51,000</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end items-center">
              <button className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>

              <button className="bg-primary text-white font-bold py-2 px-4 rounded">
                Save & Print
              </button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  );
};
