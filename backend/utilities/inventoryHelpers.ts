import { MedicalProductInventoryModel, MedicalProductsModel } from "../models/medicalProductInventory.model";
import { StockMovementModel } from "../models/pharmacy.model";
import Logger from "../../../utils/logUtils";
import { Types } from "mongoose";

/**
 * Update inventory stock levels
 */
export const updateInventoryStock = async (
  inventoryId: string,
  quantityChange: number,
  userId: string,
  reason: string,
  reference?: string
) => {
  try {
    const inventory = await MedicalProductInventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error(`Inventory with ID ${inventoryId} not found`);
    }

    const newAvailableStock = inventory.availableStock + quantityChange;
    if (newAvailableStock < 0) {
      throw new Error(`Insufficient stock. Available: ${inventory.availableStock}, Required: ${Math.abs(quantityChange)}`);
    }

    // Update inventory
    const updatedInventory = await MedicalProductInventoryModel.findByIdAndUpdate(
      inventoryId,
      {
        $set: {
          availableStock: newAvailableStock,
          updatedBy: userId,
        },
      },
      { new: true }
    );

    // Record stock movement
    await StockMovementModel.create({
      product: inventory.product,
      batch: inventoryId,
      movementType: quantityChange > 0 ? 'IN' : 'OUT',
      quantity: Math.abs(quantityChange),
      previousStock: inventory.availableStock,
      newStock: newAvailableStock,
      reason,
      reference,
      performedBy: userId,
      createdBy: userId,
    });

    return updatedInventory;
  } catch (error) {
    Logger.error(`Error updating inventory stock [${inventoryId}]:`, error);
    throw error;
  }
};

/**
 * Check stock availability for multiple items
 */
export const checkStockAvailability = async (items: Array<{ batchId: string; quantity: number }>) => {
  const stockChecks = await Promise.all(
    items.map(async (item) => {
      const inventory = await MedicalProductInventoryModel.findById(item.batchId);
      return {
        batchId: item.batchId,
        requestedQuantity: item.quantity,
        availableStock: inventory?.availableStock || 0,
        isAvailable: (inventory?.availableStock || 0) >= item.quantity,
        product: inventory?.product,
      };
    })
  );

  const unavailableItems = stockChecks.filter(check => !check.isAvailable);
  
  return {
    allAvailable: unavailableItems.length === 0,
    stockChecks,
    unavailableItems,
  };
};

/**
 * Get low stock alerts
 */
export const getLowStockAlerts = async () => {
  try {
    const lowStockItems = await MedicalProductInventoryModel.aggregate([
      {
        $match: {
          $expr: {
            $lte: ["$availableStock", "$minimumTreshHold"]
          }
        }
      },
      {
        $lookup: {
          from: "medicalproducts",
          localField: "product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      {
        $unwind: "$productInfo"
      },
      {
        $project: {
          batchNo: 1,
          availableStock: 1,
          minimumTreshHold: 1,
          expiryDate: 1,
          productName: "$productInfo.name",
          productCode: "$productInfo.productCode",
          alertType: {
            $cond: {
              if: { $eq: ["$availableStock", 0] },
              then: "OUT_OF_STOCK",
              else: "LOW_STOCK"
            }
          },
          severity: {
            $cond: {
              if: { $eq: ["$availableStock", 0] },
              then: "CRITICAL",
              else: {
                $cond: {
                  if: { $lte: ["$availableStock", { $multiply: ["$minimumTreshHold", 0.5] }] },
                  then: "HIGH",
                  else: "MEDIUM"
                }
              }
            }
          }
        }
      }
    ]);

    return lowStockItems;
  } catch (error) {
    Logger.error("Error getting low stock alerts:", error);
    throw error;
  }
};

/**
 * Get expiry alerts
 */
export const getExpiryAlerts = async (daysAhead: number = 30) => {
  try {
    const currentDate = new Date();
    const alertDate = new Date();
    alertDate.setDate(currentDate.getDate() + daysAhead);

    const expiringItems = await MedicalProductInventoryModel.aggregate([
      {
        $match: {
          expiryDate: {
            $lte: alertDate.toISOString().split('T')[0]
          },
          availableStock: { $gt: 0 }
        }
      },
      {
        $lookup: {
          from: "medicalproducts",
          localField: "product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      {
        $unwind: "$productInfo"
      },
      {
        $project: {
          batchNo: 1,
          availableStock: 1,
          expiryDate: 1,
          productName: "$productInfo.name",
          productCode: "$productInfo.productCode",
          daysToExpiry: {
            $divide: [
              { $subtract: [{ $dateFromString: { dateString: "$expiryDate" } }, currentDate] },
              1000 * 60 * 60 * 24
            ]
          },
          severity: {
            $cond: {
              if: { $lte: [{ $dateFromString: { dateString: "$expiryDate" } }, currentDate] },
              then: "CRITICAL",
              else: {
                $cond: {
                  if: { $lte: [{ $dateFromString: { dateString: "$expiryDate" } }, { $add: [currentDate, 7 * 24 * 60 * 60 * 1000] }] },
                  then: "HIGH",
                  else: "MEDIUM"
                }
              }
            }
          }
        }
      },
      {
        $sort: { expiryDate: 1 }
      }
    ]);

    return expiringItems;
  } catch (error) {
    Logger.error("Error getting expiry alerts:", error);
    throw error;
  }
};

/**
 * Calculate inventory value
 */
export const calculateInventoryValue = async (filters: any = {}) => {
  try {
    const pipeline = [
      { $match: filters },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: { $multiply: ["$availableStock", "$purchaseRate"] }
          },
          totalMRPValue: {
            $sum: { $multiply: ["$availableStock", "$mrpRate"] }
          },
          totalItems: { $sum: 1 },
          totalStock: { $sum: "$availableStock" }
        }
      }
    ];

    const result = await MedicalProductInventoryModel.aggregate(pipeline);
    
    return result[0] || {
      totalValue: 0,
      totalMRPValue: 0,
      totalItems: 0,
      totalStock: 0
    };
  } catch (error) {
    Logger.error("Error calculating inventory value:", error);
    throw error;
  }
};

/**
 * Get inventory turnover rate
 */
export const getInventoryTurnover = async (productId: string, days: number = 30) => {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const movements = await StockMovementModel.aggregate([
      {
        $match: {
          product: new Types.ObjectId(productId),
          movementType: 'OUT',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSold: { $sum: "$quantity" },
          averageDailyUsage: { $avg: "$quantity" }
        }
      }
    ]);

    const currentStock = await MedicalProductInventoryModel.aggregate([
      {
        $match: { product: new Types.ObjectId(productId) }
      },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$availableStock" }
        }
      }
    ]);

    const totalSold = movements[0]?.totalSold || 0;
    const totalStock = currentStock[0]?.totalStock || 0;
    const averageDailyUsage = movements[0]?.averageDailyUsage || 0;
    
    const turnoverRate = totalStock > 0 ? totalSold / totalStock : 0;
    const daysOfStock = averageDailyUsage > 0 ? totalStock / averageDailyUsage : 0;

    return {
      totalSold,
      totalStock,
      averageDailyUsage,
      turnoverRate,
      daysOfStock
    };
  } catch (error) {
    Logger.error("Error calculating inventory turnover:", error);
    throw error;
  }
};
