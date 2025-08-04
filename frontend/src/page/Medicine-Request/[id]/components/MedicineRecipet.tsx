import { forwardRef } from 'react';
import { IMainInvoiceController } from '../../../../../server-action/types/master-invoice.types';
import { ProductCategory } from '../../../../../constant/constant';
import { calculateAge } from '../../../pos/Pos.page';

interface PrescriptionPrintProps {
  prescriptionData: IMainInvoiceController;
}

// Print styles as a string for injection
export const printStyles = `
  @media print {
    body { margin: 0; padding: 0; }
    .print-container { 
      padding: 20px; 
      font-family: Arial, sans-serif;
      color: black;
      background: white;
    }
    .no-print { display: none !important; }
    .print-page-break { page-break-before: always; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background-color: #f5f5f5; }
  }
`;

// Printable Prescription Component
export const PrescriptionPrint = forwardRef<
  HTMLDivElement,
  PrescriptionPrintProps
>(({ prescriptionData }, ref) => {
  //   const prescriptionData = samplePrescription;
  console.log(prescriptionData, 'pres');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPatientName = () => {
    return (
      prescriptionData?.walkInCustomer?.name ??
      (prescriptionData?.billingAgainst?.commonInfo?.personalInfo?.fullName ||
        'N/A')
    );
  };

  const getPatientPhone = () => {
    return (
      prescriptionData?.walkInCustomer?.contact ??
      (prescriptionData?.billingAgainst?.commonInfo?.contactInfo?.phone
        ?.primaryPhone ||
        'N/A')
    );
  };

  const getPatientGender = () => {
    return (
      prescriptionData?.billingAgainst?.commonInfo?.personalInfo?.gender ||
      'N/A'
    );
  };

  const getDoctorName = () => {
    return (
      prescriptionData?.supervisor?.commonInfo?.personalInfo?.fullName || 'N/A'
    );
  };

  const getDoctorEmail = () => {
    return prescriptionData?.supervisor?.email || 'N/A';
  };

  const getDoctorPhone = () => {
    return (
      prescriptionData?.supervisor?.commonInfo?.contactInfo?.phone
        ?.primaryPhone || 'N/A'
    );
  };

  const getMedicationName = (product: any) => {
    return product?.pProduct?.name || product?.hProduct?.name || 'N/A';
  };

  const getMedicationStrength = (product: any) => {
    let strength = '';

    if (product?.pProduct?.strength) {
      strength = product?.pProduct?.strength;
    } else {
      strength =
        (product?.pProduct?.productCategory === 'DRUG' &&
          product?.pProduct?.drug?.strength) ||
        (product?.pProduct?.productCategory ===
          ProductCategory.BEAUTIESSKINCARE &&
          product?.pProduct?.beautySkinCare?.volume) ||
        product?.hProduct?.strength ||
        'N/A';
    }
    return strength;
  };

  const getMedicationForm = (product: any) => {
    let form = '';

    if (product?.pProduct?.form) {
      form = product?.pProduct?.form;
    } else {
      form =
        (product?.pProduct?.productCategory === 'DRUG' &&
          product?.pProduct?.drug?.form) ||
        product?.pProduct?.form ||
        product?.hProduct?.form ||
        'N/A';
    }
    return form;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <style>{printStyles}</style>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <div className="bg-white shadow-lg rounded-sm print:shadow-none">
          {/* Hospital Header */}
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue w-[80px]">
                  <img src={'/medicinelogo.png'} alt="" />
                </div>
                <div className="border border-gray-800 rounded-md p-2">
                  <h1 className="text-lg font-bold">
                    Aarogya Niketan Hospital Pvt. Ltd.
                  </h1>
                  <p className="text-xs">Janakpurdham-08, Dhanusha, Nepal</p>
                  <p className="text-xs">
                    hospitalaarogyaniketan@gmail.com | 9815366625
                  </p>
                </div>
              </div>
              <div className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                <span>{formatDate(prescriptionData?.date)}</span>
              </div>
            </div>

            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">
              Medical Prescription
            </h2>
          </div>

          {/* Patient and Doctor Information */}
          <div className="px-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="font-bold mb-2">Patient Information</h3>
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="py-1 text-sm font-semibold w-1/3">
                        Name:
                      </td>
                      <td className="py-1 text-sm">{getPatientName()}</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-sm font-semibold">Gender:</td>
                      <td className="py-1 text-sm">{getPatientGender()}</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-sm font-semibold">Phone:</td>
                      <td className="py-1 text-sm">{getPatientPhone()}</td>
                    </tr>

                    {prescriptionData?.billingAgainst && (
                      <tr>
                        <td className="py-1 text-sm font-semibold">Age:</td>
                        <td className="py-1 text-sm">
                          {prescriptionData?.age
                            ? prescriptionData?.age
                            : calculateAge(
                                prescriptionData?.billingAgainst?.commonInfo
                                  ?.personalInfo?.dob ?? ''
                              )}
                        </td>
                      </tr>
                    )}

                    {prescriptionData?.billingAgainst && (
                      <tr>
                        <td className="py-1 text-sm font-semibold">PID:</td>
                        <td className="py-1 text-sm">
                          {
                            prescriptionData?.billingAgainst?.patientInfo
                              ?.patientId
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {prescriptionData?.supervisor && (
                <div>
                  <h3 className="font-bold mb-2">Doctor Information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-1 text-sm font-semibold w-1/3">
                          Name:
                        </td>
                        <td className="py-1 text-sm">{getDoctorName()}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-sm font-semibold">Email:</td>
                        <td className="py-1 text-sm">{getDoctorEmail()}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-sm font-semibold">Contact:</td>
                        <td className="py-1 text-sm">{getDoctorPhone()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Prescription Details */}
          <div className="px-6">
            <h3 className="font-bold border-b-2 border-gray-300 pb-2 mb-4">
              Prescribed Medications
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2 text-sm font-bold">
                      Medication
                    </th>
                    <th className="text-left p-2 text-sm font-bold">
                      Strength
                    </th>
                    <th className="text-left p-2 text-sm font-bold">Dose</th>
                    <th className="text-left p-2 text-sm font-bold">
                      Frequency
                    </th>
                    <th className="text-left p-2 text-sm font-bold">
                      Duration
                    </th>

                    <th className="text-left p-2 text-sm font-bold">Form</th>
                    <th className="text-left p-2 text-sm font-bold">
                      Quantity
                    </th>

                    <th className="text-left p-2 text-sm font-bold">
                      Discount %
                    </th>

                    <th className="text-left p-2 text-sm font-bold">TAX %</th>

                    <th className="text-left p-2 text-sm font-bold">
                      Total Amount (RS.)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData?.productList?.map((product, index) => (
                    <tr key={product?._id} className="border-b border-gray-200">
                      <td className="p-2 text-sm">
                        {getMedicationName(product)}
                      </td>
                      <td className="p-2 text-sm">
                        {getMedicationStrength(product)}
                      </td>
                      <td className="p-2 text-sm">{product?.doses ?? '-'}</td>
                      <td className="p-2 text-sm">
                        {product?.frequency ?? '-'}
                      </td>
                      <td className="p-2 text-sm">
                        {product?.duration ?? '-'}
                      </td>

                      <td className="p-2 text-sm">
                        {getMedicationForm(product)}
                      </td>
                      <td className="p-2 text-sm">{product.quantity}</td>
                      <td className="p-2 text-sm">
                        {product.discount?.toFixed(2) ?? 0}
                      </td>
                      <td className="p-2 text-sm">
                        {product.tax?.toFixed(2) ?? 0}
                      </td>

                      <td className="p-2 text-sm">
                        {product?.payableAmount
                          ? product?.payableAmount?.toFixed(2)
                          : product.totalAmount?.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <section className="flex flex-col gap-2 mt-4 justify-end place-items-end px-6">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">Total Amount:</p>
                <p className="text-sm font-bold">Discount:</p>
                {/* <p className="text-sm font-bold">Tax (13%):</p> */}
                <p className="text-sm font-bold">Paid Amount:</p>
                <p className="text-sm font-bold">Due Amount:</p>
                {/* <p className="text-sm font-bold">Total Amount (After Tax): </p> */}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold">
                  {prescriptionData?.subTotal?.toFixed(2) ??
                    prescriptionData?.totalAmount?.toFixed(2)}
                </p>
                <p className="text-sm font-bold">
                  {prescriptionData?.discount?.toFixed(2)}
                </p>
                {/* <p className="text-sm font-bold">
                  {prescriptionData?.tax} {prescriptionData?.tax === 13 && '%'}
                </p> */}
                <p className="text-sm font-bold">
                  {prescriptionData?.paidAmount?.toFixed(2)}
                </p>
                <p className="text-sm font-bold">
                  {prescriptionData?.dueAmount?.toFixed(2)}
                </p>
                {/* <p className="text-sm font-bold">
                  {prescriptionData?.payableAmount?.toFixed(2) ??
                    prescriptionData?.totalAmount?.toFixed(2)}
                </p> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});
