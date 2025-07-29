import { ReportTable } from './components/ReportTable.component';
import { InputField } from '../../../../components';
import { Form, FormikProvider, useFormik } from 'formik';

export const PharmacyFinanceReportsPage = () => {
  const formik = useFormik({
    initialValues: {
      dateFrom: '',
      dateTo: '',
    },
    onSubmit: (values) => {},
  });
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full bg-white">
        <FormikProvider value={formik}>
          <Form className="flex items-center justify-between p-4 bg-white gap-8 w-[850px] ">
            <InputField
              label="Date From"
              placeholder="Select Date"
              type="date"
              name="dateFrom"
              value={formik.values.dateFrom}
              onChange={formik.handleChange}
            />

            <InputField
              label="Date To"
              placeholder="Select Date"
              type="date"
              name="dateTo"
              value={formik.values.dateTo}
              onChange={formik.handleChange}
            />
          </Form>
        </FormikProvider>
      </div>

      <ReportTable
        dateFrom={formik.values.dateFrom}
        dateTo={formik.values.dateTo}
      />
    </div>
  );
};
