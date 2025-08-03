import { MedicineCartTypes } from './MedcineCart.types';

export interface InitialTypes {
  id: string;
  customerType: string;
  productCategory: string;
  paymentMethod: string;
  timestamp: string;
  time: string;

  search: string;
  tel: string;
  address: string;

  //for outside patient
  patient: string;
  reseller: string;

  //for registeredPatient
  patientId: string;
  patientName: string;
  patientRegisteredId: string;
  patientAge: string;
  patientGender: string;
  supervisor: string;
  selectedMedicine: MedicineCartTypes[];
  totalAmount: string | number;
  subTotal: string | number;
  paidAmount: string | number;
  remarks: string;
  taxValue: string | number;
  invoiceNo: string;
  bank: string;
  pan: string;
  accountNo: string;
  currentInvoiceId: string;

  notes: string;

  tax: string | number;
  discount: string | number;
  total: string | number;
  due: string | number;
  cashRecieved: string | number;
}
