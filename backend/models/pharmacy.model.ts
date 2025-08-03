import { model, Schema } from 'mongoose';
import {
  IPOSTransaction,
  IPOSItem,
  IMedicineRequest,
  IMedicationRequest,
  IPurchaseRequest,
  IPurchaseRequestItem,
  IQuotationOrder,
  IQuotationItem,
  IStockAlert,
  IStockMovement,
  IPrescription,
  IPrescriptionMedication,
} from '../types/pharmacy.types';
import pharmacyConstants from '../constants';
import mainConstants from '../../api/constants';

// POS Item Schema
const posItemSchema = new Schema<IPOSItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCTINVENTORY,
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

// POS Transaction Schema
const posTransactionSchema = new Schema<IPOSTransaction>(
  {
    transactionId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    customer: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    cashier: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    items: [posItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['CASH', 'CARD', 'BANK_TRANSFER', 'INSURANCE'],
      default: 'CASH',
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: pharmacyConstants.ENUMS.PAYMENTSTATUS,
      default: 'PENDING',
      required: true,
    },
    notes: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

// Medication Request Schema
const medicationRequestSchema = new Schema<IMedicationRequest>(
  {
    medication: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: true,
    },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    instructions: { type: String, required: false },
    substitutionAllowed: { type: Boolean, default: false },
  },
  { _id: false }
);

// Medicine Request Schema
const medicineRequestSchema = new Schema<IMedicineRequest>(
  {
    requestId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    patient: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.DEPARTMENT,
      required: true,
    },
    requestType: {
      type: String,
      enum: ['PRESCRIPTION', 'EMERGENCY', 'ROUTINE'],
      default: 'PRESCRIPTION',
      required: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      required: true,
    },
    medications: [medicationRequestSchema],
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'DISPENSED', 'REJECTED', 'CANCELLED'],
      default: 'PENDING',
      required: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    dispensedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    notes: { type: String, required: false },
    rejectionReason: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

// Purchase Request Item Schema
const purchaseRequestItemSchema = new Schema<IPurchaseRequestItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: true,
    },
    requestedQuantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    urgency: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
      required: true,
    },
    justification: { type: String, required: false },
  },
  { _id: false }
);

// Purchase Request Schema
const purchaseRequestSchema = new Schema<IPurchaseRequest>(
  {
    requestNo: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.DEPARTMENT,
      required: true,
    },
    requestedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      required: true,
    },
    productList: [purchaseRequestItemSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'ORDERED', 'RECEIVED', 'REJECTED'],
      default: 'PENDING',
      required: true,
    },
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
    approvalDate: { type: String, required: false },
    expectedDeliveryDate: { type: String, required: false },
    notes: { type: String, required: false },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

// Stock Movement Schema
const stockMovementSchema = new Schema<IStockMovement>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCTINVENTORY,
      required: true,
    },
    movementType: {
      type: String,
      enum: ['IN', 'OUT', 'TRANSFER', 'ADJUSTMENT', 'RETURN'],
      required: true,
    },
    quantity: { type: Number, required: true },
    previousStock: { type: Number, required: true, min: 0 },
    newStock: { type: Number, required: true, min: 0 },
    reason: { type: String, required: true },
    reference: { type: String, required: false },
    performedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

// Prescription Medication Schema
const prescriptionMedicationSchema = new Schema<IPrescriptionMedication>(
  {
    medication: {
      type: Schema.Types.ObjectId,
      ref: pharmacyConstants.DB.MEDICALPRODUCT,
      required: true,
    },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    instructions: { type: String, required: false },
    substitutionAllowed: { type: Boolean, default: false },
    dispensed: { type: Boolean, default: false },
    dispensedQuantity: { type: Number, required: false, min: 0 },
    dispensedDate: { type: String, required: false },
    dispensedBy: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: false,
    },
  },
  { _id: false }
);

// Prescription Schema
const prescriptionSchema = new Schema<IPrescription>(
  {
    prescriptionId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    patient: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: mainConstants.DB.USER,
      required: true,
    },
    medications: [prescriptionMedicationSchema],
    diagnosis: { type: String, required: false },
    status: {
      type: String,
      enum: ['ACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED'],
      default: 'ACTIVE',
      required: true,
    },
    validUntil: { type: String, required: true },
    refillsAllowed: { type: Number, default: 0, min: 0 },
    refillsUsed: { type: Number, default: 0, min: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
    updatedBy: { type: Schema.Types.ObjectId, ref: mainConstants.DB.USER },
  },
  {
    timestamps: true,
  }
);

// Create Models
const POSTransactionModel = model<IPOSTransaction>(
  'POSTransaction',
  posTransactionSchema
);
const MedicineRequestModel = model<IMedicineRequest>(
  'MedicineRequest',
  medicineRequestSchema
);
const PurchaseRequestModel = model<IPurchaseRequest>(
  pharmacyConstants.DB.PRODUCTPURCHASEREQUEST,
  purchaseRequestSchema
);
const QuotationOrderModel = model<IQuotationOrder>(
  pharmacyConstants.DB.PRODUCTQUOTATIONORDER,
  quotationOrderSchema
);
const StockMovementModel = model<IStockMovement>(
  'StockMovement',
  stockMovementSchema
);
const PrescriptionModel = model<IPrescription>(
  'Prescription',
  prescriptionSchema
);

export {
  POSTransactionModel,
  MedicineRequestModel,
  PurchaseRequestModel,
  QuotationOrderModel,
  StockMovementModel,
  PrescriptionModel,
};
