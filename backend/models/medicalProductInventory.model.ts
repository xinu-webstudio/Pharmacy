import { model, Schema } from "mongoose";
import {
  IMedicalProductInventory,
  ISaleAndPurchase,
  IProductList,
  IBeautyAndSkinCare,
  IDeviceSchema,
  IDrug,
  ILabtestEqipments,
  IMEDICALPRODUCTS,
  IMedicalSupplies,
  IOther,
} from "../types/medicalProductInventory.types";
import pharmacyConstants from "../constants";
import mainConstants from "../src/api/constants";

const drugSchema = new Schema<IDrug>(
  {
    genericName: { type: String, required: false },
    commonName: { type: String, required: false },
    brandName: { type: String, required: false },
    rxNormId: { type: String, required: false },
    ndc: { type: String, required: false },
    atcCode: { type: String, required: false },
    snomedCT: { type: String, required: false },
    strength: { type: String, required: false },
    form: {
      type: String,
      enum: pharmacyConstants.ENUMS.FORMENUM,
      default: "TABLET",
      required: false,
    },
    route: {
      type: String,
      enum: mainConstants.ROUTEENUM,
      default: "ORAL",
      required: false,
    },
    useCase: { type: String, required: false },
  },
  { _id: false }
);

const medicalSuppliesSchema = new Schema<IMedicalSupplies>(
  {
    material: { type: String, required: false },
    useCase: { type: String, required: false },
    brandName: { type: String, required: false },
    commonName: { type: String, required: false },
    size: { type: String, required: false },
    color: { type: String, required: false },
    singleUse: { type: Boolean, required: false, default: true },
    sterilization: { type: Boolean, required: false, default: true },
    packaging: {
      type: String,
      enum: mainConstants.PACKAGINGENUM,
      default: "BOX",
      required: false,
    },
  },
  { _id: false }
);

const deviceSchema = new Schema<IDeviceSchema>(
  {
    useCase: { type: String, required: false },
    brandName: { type: String, required: false },
    commonName: { type: String, required: false },
    size: { type: String, required: false },
    color: { type: String, required: false },
    packaging: {
      type: String,
      enum: mainConstants.PACKAGINGENUM,
      default: "BOX",
      required: false,
    },
    instructions: { type: String, required: false },
  },
  { _id: false }
);

const beautyAndSkinCareSchema = new Schema<IBeautyAndSkinCare>(
  {
    useCase: { type: String, required: false },
    brandName: { type: String, required: false },
    commonName: { type: String, required: false },
    category: {
      type: String,
      enum: mainConstants.SKINCARECATEGORYENUM,
      default: "CLEANSER",
      required: false,
    },
    skinType: { type: String, required: false },
    volume: { type: String, required: false },
    packaging: {
      type: String,
      enum: mainConstants.PACKAGINGENUM,
      default: "BOX",
      required: false,
    },
    instructions: { type: String, required: false },
  },
  { _id: false }
);

const labtestEquipmentSchema = new Schema<ILabtestEqipments>(
  {
    useCase: { type: String, required: false },
    brandName: { type: String, required: false },
    equipmentName: { type: String, required: false },
    equipmentCode: { type: String, required: false },
    category: {
      type: String,
      enum: mainConstants.LABTESTCATEGORYENUM,
      default: "ANALYSER",
      required: false,
    },
    manufacturer: { type: String, required: false },
    model: { type: String, required: false },
    serialNumber: { type: String, required: false },
    lastCalibrationDate: { type: String, required: false },
    nextCalibrationDue: { type: String, required: false },
    maintenanceCycle: { type: String, required: false },
    isAutomated: { type: Boolean, required: false },
    associatedTests: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.LABTEST,
    },
    remarks: { type: String, required: false },
    packaging: {
      type: String,
      enum: mainConstants.PACKAGINGENUM,
      default: "BOX",
      required: false,
    },
    instructions: { type: String, required: false },
  },
  { _id: false }
);

// MEDICALPRODUCT
const medicalProductsSchema = new Schema<IMEDICALPRODUCTS>(
  {
    name: { type: String, required: false },
    productCode: { type: String, required: false },
    prescriptionRequired: { type: Boolean, required: false },
    productCategory: {
      type: String,
      enum: pharmacyConstants.ENUMS.INVENTORY_CATEGORY,
      default: "DRUG",
      required: false,
    },
    brand: [
      {
        type: Schema.Types.ObjectId,
        ref: mainConstants.DB.BRAND,
        required: false,
      },
    ],
    drug: drugSchema,
    medicalSupplies: medicalSuppliesSchema,
    device: deviceSchema,
    personalCare: deviceSchema,
    lifeStyleProduct: deviceSchema,
    beautySkinCare: beautyAndSkinCareSchema,
    labTestEquipment: labtestEquipmentSchema,
    other: otherSchema,
    costPrice: { type: Number, required: false },
    sellingPrice: { type: Number, required: false },
    discount: { type: Number, required: false },
    vat: { type: Number, required: false },

    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

const medicalProductInventorySchema = new Schema<IMedicalProductInventory>(
  {
    date: { type: String, required: false },
    batchNo: { type: String, required: false },
    packageNo: { type: String, required: false },
    invoiceNo: { type: String, required: false },
    store: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.STORE,
      default: null,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    purchasedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: false,
    },
    manufacturedDate: { type: String, required: false },
    expiryDate: { type: String, required: false },
    purchaseRate: { type: Number, required: false },
    mrpRate: { type: Number, required: false },
    storageLocation: { type: String, required: false },
    totalAmount: { type: Number, required: false, default: 0, min: 0 },
    totalStock: { type: Number, required: false, default: 0, min: 0 },
    availableStock: { type: Number, required: false, default: 0, min: 0 },
    minimumTreshHold: { type: Number, required: false, default: 10 },
    status: {
      type: String,
      enum: pharmacyConstants.ENUMS.PRODUCT_STATUS,
      default: "ACTIVE",
      required: false,
    },
    category: {
      type: String,
      enum: pharmacyConstants.ENUMS.TRANSACTION_TYPE,
      required: false,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema<IProductList>({
  product: {
    type: Schema.Types.ObjectId,
    ref: pharmacyConstants.DB.MEDICALPRODUCT,
    required: false,
  },
  manufacturedDate: { type: String, required: false },
  expiryDate: { type: String, required: false },
  purchaseRate: { type: Number, required: false },
  mrpRate: { type: Number, required: false },
  quantity: { type: Number, required: false },
  totalAmount: { type: Number, required: false },
});

const saleAndPurchaseSchema = new Schema<ISaleAndPurchase>(
  {
    date: { type: String, required: false },
    batchNo: { type: String, required: false, unique: true },
    invoiceNo: { type: String, required: false, unique: true },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    billingAgainst: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    category: {
      type: String,
      enum: pharmacyConstants.ENUMS.TRANSACTION_TYPE,
      default: "SALE",
      required: false,
    },
    productList: [productSchema],
    totalAmount: { type: Number, required: false },
    discount: { type: Number, required: false },
    tax: { type: Number, required: false },
    payableAmount: { type: Number, required: false },
    transactionNo: { type: String, required: false },
    paymentMethod: {
      type: String,
      enum: pharmacyConstants.ENUMS.PAYMENTMETHOD,
      default: "CASH",
      required: false,
    },
    paymentStatus: {
      type: String,
      enum: pharmacyConstants.ENUMS.PAYMENTSTATUS,
      default: "PENDING",
      required: false,
    },
    bank: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: mainConstants.DB.BANK,
    },

    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

const MedicalProductsModel = model<IMEDICALPRODUCTS>(
  pharmacyConstants.DB.MEDICALPRODUCT,
  medicalProductsSchema
);
const MedicalProductInventoryModel = model<IMedicalProductInventory>(
  pharmacyConstants.DB.MEDICALPRODUCTINVENTORY,
  medicalProductInventorySchema
);
const SalesAndPurchaseModel = model<ISaleAndPurchase>(
  pharmacyConstants.DB.SALEPURCHASE,
  saleAndPurchaseSchema
);

export {
  MedicalProductsModel,
  MedicalProductInventoryModel,
  SalesAndPurchaseModel,
};
