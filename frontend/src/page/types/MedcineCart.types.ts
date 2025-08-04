export interface MedicineCartTypes {
  quantity: number;
  item: {
    product: string;
    batch: string;
    productId: string;
    expiryDate: string;
    availableStock: number;

    productCategory: string;
    strength: string;
    _id: string;
    batchId: string;
    fromInvoice: boolean;
    mrpRate: number;
  };
}
