import { Types } from "mongoose";
import { IGeneralSystemFields } from "../../api/types/common/systemInfo.types";

export interface IMedicalProductInventory extends IGeneralSystemFields {
  date: string;
  batchNo: string;
  packageNo?: string;
  invoiceNo: string;
  store: Types.ObjectId;
  vendor: Types.ObjectId;
  storageLocation: string;
  purchasedBy: Types.ObjectId;
  product: Types.ObjectId;
  manufacturedDate: string;
  expiryDate: string;
  purchaseRate: number;
  mrpRate: number;
  totalAmount: number;
  totalStock: number;
  availableStock: number;
  minimumTreshHold: number;
  status: string;
  category: string;
}

export interface IProductList {
  product: Types.ObjectId;
  manufacturedDate: string;
  expiryDate: string;
  purchaseRate: number;
  mrpRate: number;
  quantity: number;
  totalAmount: number;
}

export interface ISaleAndPurchase extends IGeneralSystemFields {
  date: string;
  batchNo: string;
  invoiceNo: string;
  vendor: Types.ObjectId;
  purchasedBy: Types.ObjectId;
  billingAgainst: Types.ObjectId;
  category: string;
  productList: IProductList[];
  totalAmount: number;
  discount: number;
  tax: number;
  payableAmount: number;
  transactionNo: string;
  paymentMethod: string;
  paymentStatus: string;
  bank: Types.ObjectId;
}

export interface IDrug {
  genericName: string;
  useCase: string;
  commonName: string;
  brandName: string;  
  rxNormId: string;  
  ndc: string; 
  atcCode: string; 
  snomedCT: string; 
  strength: string; 
  form: string; 
  route: string; 
}

export interface IMedicalSupplies {
  material: string;
  brandName: string;
  commonName: string;
  useCase: string;
  size: string;  
  color: string;  
  singleUse: boolean; 
  sterilization: boolean; 
  packaging: string;  
}

export interface IDeviceSchema {
  brandName: string;
  commonName: string;
  useCase: string;
  size: string;  
  color: string;  
  singleUse: boolean; 
  sterilization: boolean; 
  packaging: string;  
  instructions: string;  
}

export interface IBeautyAndSkinCare {
  brandName: string;
  commonName: string;
  useCase: string;
  category: string;
  skinType: string;  
  volume: string;  
  packaging: string;  
  instructions: string;  
}

export interface ILabtestEqipments {
  useCase: string;
  brandName: string;
  equipmentName: string;
  equipmentCode: string;
  category: string;
  manufacturer: string;  
  model: string;  
  serialNumber: string;  
  lastCalibrationDate: string;  
  nextCalibrationDue: string;  
  maintenanceCycle: string;  
  isAutomated: boolean;  
  associatedTests: Types.ObjectId;
  remarks: string;  
  packaging: string;  
  instructions: string;  
}

export interface IOther {
  useCase: string;
  brandName: string;
  equipmentName: string;
  equipmentCode: string;
  category: string;
  manufacturer: string;  
  model: string;  
  serialNumber: string;  
  lastCalibrationDate: string;  
  nextCalibrationDue: string;  
  maintenanceCycle: string;  
  isAutomated: boolean;  
  associatedTests: Types.ObjectId;
  remarks: string;  
  packaging: string;  
  instructions: string;  
}

export interface IMEDICALPRODUCTS extends IGeneralSystemFields {
  ProductID: string;
  name: string;
  brand: Types.ObjectId[];
  productCode: string;
  prescriptionRequired: boolean;
  productDetails: string;
  productCategory: string;
  drug?: IDrug;
  medicalSupplies?: IMedicalSupplies;
  device?: IDeviceSchema;
  personalCare?: IDeviceSchema;
  lifeStyleProduct?: IDeviceSchema;
  beautySkinCare?: IBeautyAndSkinCare;
  labTestEquipment?: ILabtestEqipments;
  other?: IOther;
  costPrice?: number;
  sellingPrice?: number;
  discount?: number;
  vat?: number;
}
