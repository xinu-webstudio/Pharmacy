import { MedicalProductInventoryModel } from "../models/medicalProductInventory.model";
import { POSTransactionModel } from "../models/pharmacy.model";
import Logger from "../../../utils/logUtils";

/**
 * Calculate bill totals
 */
export const calculateBillTotals = (
  items: Array<{ quantity: number; unitPrice: number; discount?: number }>,
  globalDiscount: number = 0,
  tax: number = 0
) => {
  const subtotal = items.reduce((sum, item) => {
    const itemDiscount = item.discount || 0;
    const itemTotal = item.quantity * item.unitPrice;
    const itemAfterDiscount = itemTotal - (itemTotal * itemDiscount / 100);
    return sum + itemAfterDiscount;
  }, 0);

  const globalDiscountAmount = subtotal * (globalDiscount / 100);
  const amountAfterDiscount = subtotal - globalDiscountAmount;
  const taxAmount = amountAfterDiscount * (tax / 100);
  const totalAmount = amountAfterDiscount + taxAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    globalDiscountAmount: Math.round(globalDiscountAmount * 100) / 100,
    amountAfterDiscount: Math.round(amountAfterDiscount * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

/**
 * Validate bill items against inventory
 */
export const validateBillItems = async (items: Array<{ batchId: string; quantity: number }>) => {
  const validationResults = await Promise.all(
    items.map(async (item) => {
      try {
        const inventory = await MedicalProductInventoryModel.findById(item.batchId)
          .populate('product', 'name productCode prescriptionRequired');

        if (!inventory) {
          return {
            batchId: item.batchId,
            isValid: false,
            error: 'Batch not found',
          };
        }

        if (inventory.availableStock < item.quantity) {
          return {
            batchId: item.batchId,
            isValid: false,
            error: `Insufficient stock. Available: ${inventory.availableStock}, Required: ${item.quantity}`,
            availableStock: inventory.availableStock,
          };
        }

        // Check expiry
        const expiryDate = new Date(inventory.expiryDate);
        const currentDate = new Date();
        if (expiryDate <= currentDate) {
          return {
            batchId: item.batchId,
            isValid: false,
            error: 'Product has expired',
            expiryDate: inventory.expiryDate,
          };
        }

        return {
          batchId: item.batchId,
          isValid: true,
          inventory,
        };
      } catch (error) {
        return {
          batchId: item.batchId,
          isValid: false,
          error: 'Validation error',
        };
      }
    })
  );

  const invalidItems = validationResults.filter(result => !result.isValid);
  
  return {
    allValid: invalidItems.length === 0,
    validationResults,
    invalidItems,
  };
};

/**
 * Generate invoice number
 */
export const generateInvoiceNumber = (prefix: string = 'INV', sequence: number) => {
  const paddedSequence = sequence.toString().padStart(8, '0');
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  return `${prefix}${year}${month}${paddedSequence}`;
};

/**
 * Calculate insurance coverage
 */
export const calculateInsuranceCoverage = (
  totalAmount: number,
  insuranceType: string,
  coveragePercentage: number = 0,
  maxCoverage: number = 0
) => {
  if (!insuranceType || coveragePercentage <= 0) {
    return {
      coveredAmount: 0,
      patientAmount: totalAmount,
      insuranceAmount: 0,
    };
  }

  let coveredAmount = totalAmount * (coveragePercentage / 100);
  
  if (maxCoverage > 0 && coveredAmount > maxCoverage) {
    coveredAmount = maxCoverage;
  }

  const patientAmount = totalAmount - coveredAmount;

  return {
    coveredAmount: Math.round(coveredAmount * 100) / 100,
    patientAmount: Math.round(patientAmount * 100) / 100,
    insuranceAmount: Math.round(coveredAmount * 100) / 100,
  };
};

/**
 * Apply discount rules
 */
export const applyDiscountRules = (
  items: Array<{ productId: string; quantity: number; unitPrice: number }>,
  customerType: string = 'REGULAR'
) => {
  // Define discount rules based on customer type and quantity
  const discountRules = {
    REGULAR: { threshold: 0, discount: 0 },
    MEMBER: { threshold: 0, discount: 5 },
    VIP: { threshold: 0, discount: 10 },
    BULK: { threshold: 100, discount: 15 },
  };

  const rule = discountRules[customerType as keyof typeof discountRules] || discountRules.REGULAR;
  
  return items.map(item => {
    const totalValue = item.quantity * item.unitPrice;
    let discount = 0;

    // Apply customer type discount
    if (totalValue >= rule.threshold) {
      discount = rule.discount;
    }

    // Apply quantity-based discount
    if (item.quantity >= 10) {
      discount = Math.max(discount, 5);
    }
    if (item.quantity >= 50) {
      discount = Math.max(discount, 10);
    }
    if (item.quantity >= 100) {
      discount = Math.max(discount, 15);
    }

    return {
      ...item,
      discount,
      discountAmount: totalValue * (discount / 100),
      finalAmount: totalValue * (1 - discount / 100),
    };
  });
};

/**
 * Get sales summary for a period
 */
export const getSalesSummary = async (
  startDate: string,
  endDate: string,
  filters: any = {}
) => {
  try {
    const matchConditions: any = {
      date: { $gte: startDate, $lte: endDate },
      paymentStatus: 'PAID',
      ...filters,
    };

    const summary = await POSTransactionModel.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' },
          totalDiscount: { $sum: '$discount' },
          totalTax: { $sum: '$tax' },
          averageTransaction: { $avg: '$totalAmount' },
          totalItems: { $sum: { $size: '$items' } },
        }
      }
    ]);

    // Get daily breakdown
    const dailyBreakdown = await POSTransactionModel.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: '$date',
          dailyTransactions: { $sum: 1 },
          dailyAmount: { $sum: '$totalAmount' },
          dailyDiscount: { $sum: '$discount' },
          dailyTax: { $sum: '$tax' },
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Get payment method breakdown
    const paymentMethodBreakdown = await POSTransactionModel.aggregate([
      { $match: matchConditions },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          amount: { $sum: '$totalAmount' },
        }
      }
    ]);

    return {
      summary: summary[0] || {
        totalTransactions: 0,
        totalAmount: 0,
        totalDiscount: 0,
        totalTax: 0,
        averageTransaction: 0,
        totalItems: 0,
      },
      dailyBreakdown,
      paymentMethodBreakdown,
    };
  } catch (error) {
    Logger.error("Error getting sales summary:", error);
    throw error;
  }
};

/**
 * Calculate profit margins
 */
export const calculateProfitMargins = async (
  items: Array<{ batchId: string; quantity: number; sellingPrice: number }>
) => {
  try {
    const profitAnalysis = await Promise.all(
      items.map(async (item) => {
        const inventory = await MedicalProductInventoryModel.findById(item.batchId);
        
        if (!inventory) {
          return {
            batchId: item.batchId,
            error: 'Batch not found',
          };
        }

        const costPrice = inventory.purchaseRate;
        const sellingPrice = item.sellingPrice;
        const quantity = item.quantity;
        
        const totalCost = costPrice * quantity;
        const totalRevenue = sellingPrice * quantity;
        const profit = totalRevenue - totalCost;
        const profitMargin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

        return {
          batchId: item.batchId,
          quantity,
          costPrice,
          sellingPrice,
          totalCost: Math.round(totalCost * 100) / 100,
          totalRevenue: Math.round(totalRevenue * 100) / 100,
          profit: Math.round(profit * 100) / 100,
          profitMargin: Math.round(profitMargin * 100) / 100,
        };
      })
    );

    const totalProfit = profitAnalysis.reduce((sum, item) => sum + (item.profit || 0), 0);
    const totalRevenue = profitAnalysis.reduce((sum, item) => sum + (item.totalRevenue || 0), 0);
    const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      items: profitAnalysis,
      summary: {
        totalProfit: Math.round(totalProfit * 100) / 100,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        overallMargin: Math.round(overallMargin * 100) / 100,
      },
    };
  } catch (error) {
    Logger.error("Error calculating profit margins:", error);
    throw error;
  }
};
