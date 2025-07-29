import { Form, FormikProvider, useFormik } from "formik";
import { GlobalForm } from "../../../../../components/GlobalForm";
import { ActionButton } from "../../../../../components/ActionButton";
import { IExpensesCategory } from "../../../../../server-action/types/expense.types";
import {
  TDepartment,
  useGetAllDepartmentCategory,
} from "../../../../../server-action/api/department-category.api";
import {
  useCreateExpenseCategory,
  useUpdateExpenseCategory,
} from "../../../../../server-action/api/expense.api";

interface propTypes {
  onClose?: () => void;
  editData?: IExpensesCategory;
}

export const AddExpenseCategory = ({ editData, onClose }: propTypes) => {
  const { data: departmentData } = useGetAllDepartmentCategory();

  const departments = (departmentData as any)?.data?.departments;

  const departmentOptions = departments?.map((item: TDepartment) => ({
    label: item?.name,
    value: item?._id,
  }));

  const { mutateAsync: handleUpdate } = useUpdateExpenseCategory();

  const formField = [
    {
      type: "text",
      field: "categoryName",
      label: "Category Name",
    },
    {
      type: "text",
      field: "description",
      label: "Description",
    },
    {
      type: "select",
      field: "subDepartment",
      label: "Sub Department",
      options: departmentOptions,
    },
  ];

  const { mutateAsync: handleCreate } = useCreateExpenseCategory();

  const form = useFormik({
    initialValues: {
      categoryName: editData?.categoryName ?? "",
      description: editData?.details ?? "",
      subDepartment: editData?.department?._id ?? "",
    },
    onSubmit: async (values) => {
      const formData = {
        categoryName: values.categoryName,
        details: values.description,
        department: values.subDepartment,
      };
      if (editData) {
        await handleUpdate({
          _id: editData?._id ?? "",
          entityData: formData,
        });
      } else {
        await handleCreate(formData);
      }
      onClose?.();
    },
  });

  const { handleSubmit } = form;

  return (
    <div>
      <FormikProvider value={form}>
        <Form className="grid grid-cols-2 border border-whites-200 rounded-lg gap-x-4 gap-y-0.5 p-6">
          <GlobalForm
            formDatails={formField}
            getFieldProps={form.getFieldProps}
          />
          <div className="mt-2 col-span-2">
            <ActionButton
              onCancel={() => {
                form.resetForm();
                onClose?.();
              }}
              submitLabel="Save"
              submitlabelButton
              onSubmit={handleSubmit}
            />
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};
