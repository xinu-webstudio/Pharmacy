// import { TCategory } from '../api/canteen-product.api';
// import { IBankDetails } from './bank.types';
// import { IMainProduct } from './Hospital-Products.types';
// import { IEquipment } from './lab.types';
// import { IMedicalProductInventory } from './medical-inventory.types';
// import { IMEDICALPRODUCTS } from './medical-product.type';
import { IUser } from './user.types';

export interface IProductInventory {
  //   hProduct?: Partial<IMainProduct>;
  //   lProduct?: Partial<IEquipment>;
  //   pProduct?: Partial<IMEDICALPRODUCTS>;
  //   hBatch?: IMedicalProductInventory;
  //   pBatch?: IMedicalProductInventory;
  //   batches?: IMedicalProductInventory[];
  manufacturedDate: string;
  expiryDate: string;
  purchaseRate: number;
  mrpRate: number;
  doses?: string;
  frequency?: string;
  duration?: string;
  totalAmount: number;
  quantity?: number;
  payableAmount: number;
  discount?: number;
  tax?: number;
  _id?: string;
  isVatApplied?: boolean;
  discountType?: string;
}

export interface IWalkInCustomer {
  name?: string;
  contact?: string;
  address?: string;
}

export interface IMainInvoiceController {
  inventoryFor: string;
  date: string;
  batchNo: string;
  invoiceNo: string;
  predefinedBillNo: string;
  vendor?: IUser;
  purchasedBy?: IUser;
  billingAgainst?: IUser;
  walkInCustomer?: IWalkInCustomer;
  age?: string;
  category: string;
  productList: IProductInventory[];
  totalAmount: number;
  discount: number;
  tax: number;
  payableAmount: number;
  subTotal?: number;
  paidAmount: number;
  dueAmount: number;
  transactionNo: string;
  paymentMethod: string;
  paymentStatus: string;
  //   bank: IBankDetails;
  supervisor: IUser;
  isActive: boolean;
  _id: string;
}
