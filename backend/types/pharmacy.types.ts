import { Types } from "mongoose";
import { IGeneralSystemFields } from "../../api/types/common/systemInfo.types";

// POS (Point of Sale) Types
export interface IPOSTransaction extends IGeneralSystemFields {
  transactionId: string;
  date: string;
  customer?: Types.ObjectId; // Patient ID
  cashier: Types.ObjectId; // User ID
  items: IPOSItem[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paymentMethod: 'CASH' | 'CARD' | 'BANK_TRANSFER' | 'INSURANCE';
  paymentStatus: 'PENDING' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED';
  notes?: string;
}

export interface IPOSItem {
  product: Types.ObjectId;
  batch: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

// Medicine Request Types
export interface IMedicineRequest extends IGeneralSystemFields {
  requestId: string;
  date: string;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  department: Types.ObjectId;
  requestType: 'PRESCRIPTION' | 'EMERGENCY' | 'ROUTINE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  medications: IMedicationRequest[];
  status: 'PENDING' | 'APPROVED' | 'DISPENSED' | 'REJECTED' | 'CANCELLED';
  approvedBy?: Types.ObjectId;
  dispensedBy?: Types.ObjectId;
  notes?: string;
  rejectionReason?: string;
}

export interface IMedicationRequest {
  medication: Types.ObjectId;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  substitutionAllowed: boolean;
}

// Purchase Request Types
export interface IPurchaseRequest extends IGeneralSystemFields {
  requestNo: string;
  date: string;
  department: Types.ObjectId;
  requestedBy: Types.ObjectId;
  vendor?: Types.ObjectId;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  productList: IPurchaseRequestItem[];
  totalAmount: number;
  status: 'PENDING' | 'APPROVED' | 'ORDERED' | 'RECEIVED' | 'REJECTED';
  approvedBy?: Types.ObjectId;
  approvalDate?: string;
  expectedDeliveryDate?: string;
  notes?: string;
}

export interface IPurchaseRequestItem {
  product: Types.ObjectId;
  requestedQuantity: number;
  unitPrice: number;
  totalPrice: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH';
  justification?: string;
}

// Quotation Types
export interface IQuotationOrder extends IGeneralSystemFields {
  quotationNo: string;
  date: string;
  vendor: Types.ObjectId;
  requestedBy: Types.ObjectId;
  validUntil: string;
  productList: IQuotationItem[];
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'RECEIVED' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
  terms?: string;
  notes?: string;
}

export interface IQuotationItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
  specifications?: string;
}

// Stock Management Types
export interface IStockAlert extends IGeneralSystemFields {
  product: Types.ObjectId;
  currentStock: number;
  minimumThreshold: number;
  alertType: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'EXPIRY_ALERT' | 'OVERSTOCK';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  acknowledged: boolean;
  acknowledgedBy?: Types.ObjectId;
  acknowledgedAt?: string;
}

export interface IStockMovement extends IGeneralSystemFields {
  product: Types.ObjectId;
  batch: Types.ObjectId;
  movementType: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT' | 'RETURN';
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  reference?: string; // Invoice number, transfer ID, etc.
  performedBy: Types.ObjectId;
}

// Pharmacy Reports Types
export interface IPharmacyReport {
  reportType: 'SALES' | 'INVENTORY' | 'EXPIRY' | 'PURCHASE' | 'PROFIT_LOSS';
  dateFrom: string;
  dateTo: string;
  filters?: {
    department?: Types.ObjectId;
    vendor?: Types.ObjectId;
    category?: string;
    product?: Types.ObjectId;
  };
  generatedBy: Types.ObjectId;
  generatedAt: string;
}

// Prescription Types
export interface IPrescription extends IGeneralSystemFields {
  prescriptionId: string;
  date: string;
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  medications: IPrescriptionMedication[];
  diagnosis?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'EXPIRED';
  validUntil: string;
  refillsAllowed: number;
  refillsUsed: number;
}

export interface IPrescriptionMedication {
  medication: Types.ObjectId;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions: string;
  substitutionAllowed: boolean;
  dispensed: boolean;
  dispensedQuantity?: number;
  dispensedDate?: string;
  dispensedBy?: Types.ObjectId;
}
