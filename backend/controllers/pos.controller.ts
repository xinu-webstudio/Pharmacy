import Logger from "../../../utils/logUtils";
import { POSTransactionModel } from "../models/pharmacy.model";
import { MedicalProductInventoryModel } from "../models/medicalProductInventory.model";
import { formatResponse } from "../../api/utilities/formatRes";
import { Response } from "express";
import { IPOSTransaction } from "../types/pharmacy.types";
import { getNextSequence } from "../../api/utilities/batchCreater";

const posController = {
  create: async (req: any, res: Response) => {
    try {
      const {
        items = [],
        discount = 0,
        tax = 0,
        ...requestData
      } = req.body as IPOSTransaction;

      const userId = req.user?.id;

      if (!Array.isArray(items) || items.length === 0) {
        return formatResponse(res, 400, false, "Items list must contain at least one item.");
      }

      // Generate transaction ID
      const nextSeq = await getNextSequence("pos_transaction");
      const transactionId = `POS${nextSeq.toString().padStart(8, "0")}`;

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
      const discountAmount = subtotal * (Number(discount) / 100);
      const taxAmount = (subtotal - discountAmount) * (Number(tax) / 100);
      const totalAmount = subtotal - discountAmount + taxAmount;

      // Validate stock availability
      for (const item of items) {
        const inventory = await MedicalProductInventoryModel.findById(item.batch);
        if (!inventory) {
          return formatResponse(res, 400, false, `Batch ${item.batch} not found`);
        }
        if (inventory.availableStock < item.quantity) {
          return formatResponse(res, 400, false, `Insufficient stock for batch ${item.batch}. Available: ${inventory.availableStock}, Required: ${item.quantity}`);
        }
      }

      // Create POS transaction
      const transaction = await POSTransactionModel.create({
        ...requestData,
        transactionId,
        cashier: userId,
        items,
        subtotal,
        discount: discountAmount,
        tax: taxAmount,
        totalAmount,
        createdBy: userId,
      });

      // Update inventory for each item
      for (const item of items) {
        await MedicalProductInventoryModel.findByIdAndUpdate(
          item.batch,
          {
            $inc: { availableStock: -item.quantity },
            updatedBy: userId,
          }
        );
      }

      return formatResponse(
        res,
        201,
        true,
        "POS transaction created successfully",
        transaction
      );
    } catch (error) {
      Logger.error("POS transaction creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to create POS transaction",
        error
      );
    }
  },

  getAll: async (req: any, res: Response) => {
    try {
      const {
        limit = "20",
        page = "1",
        search,
        paymentStatus,
        paymentMethod,
        dateFrom,
        dateTo,
        ...rest
      } = req.query;

      const limittt = Math.max(parseInt(limit, 10), 1);
      const currentPage = Math.max(parseInt(page, 10), 1);
      const skip = (currentPage - 1) * limittt;

      const query: any = {};
      Object.keys(rest).forEach((key) => {
        if (rest[key] !== undefined && rest[key] !== null && rest[key] !== '') {
          query[key] = rest[key];
        }
      });

      if (search) {
        query.$or = [
          { transactionId: { $regex: search, $options: 'i' } },
        ];
      }

      if (paymentStatus) {
        query.paymentStatus = paymentStatus;
      }

      if (paymentMethod) {
        query.paymentMethod = paymentMethod;
      }

      if (dateFrom || dateTo) {
        query.date = {};
        if (dateFrom) query.date.$gte = dateFrom;
        if (dateTo) query.date.$lte = dateTo;
      }

      const [result, totalCount] = await Promise.all([
        POSTransactionModel.find(query)
          .populate('customer', 'email commonInfo')
          .populate('cashier', 'email commonInfo')
          .populate('items.product', 'name productCode')
          .populate('items.batch', 'batchNo expiryDate')
          .populate('createdBy', 'email role commonInfo')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limittt)
          .lean(),
        POSTransactionModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limittt);

      return formatResponse(res, 200, true, "POS transactions retrieved successfully", {
        data: result,
        pagination: {
          currentPage,
          totalPages,
          totalCount,
          limit: limittt,
        },
      });
    } catch (error) {
      Logger.error("POS transaction retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve POS transactions",
        error
      );
    }
  },

  getById: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await POSTransactionModel.findById(id)
        .populate('customer', 'email commonInfo')
        .populate('cashier', 'email commonInfo')
        .populate('items.product', 'name productCode')
        .populate('items.batch', 'batchNo expiryDate mrpRate')
        .populate('createdBy', 'email role commonInfo')
        .lean();

      if (!result) {
        return formatResponse(res, 404, false, "POS transaction not found");
      }

      return formatResponse(res, 200, true, "POS transaction retrieved successfully", result);
    } catch (error) {
      Logger.error("POS transaction retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve POS transaction",
        error
      );
    }
  },

  update: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.user?.id;

      // Only allow updating payment status and notes for completed transactions
      const allowedUpdates = ['paymentStatus', 'notes'];
      const filteredData = Object.keys(updateData)
        .filter(key => allowedUpdates.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = updateData[key];
          return obj;
        }, {});

      const result = await POSTransactionModel.findByIdAndUpdate(
        id,
        {
          ...filteredData,
          updatedBy: userId,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "POS transaction not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "POS transaction updated successfully",
        result
      );
    } catch (error) {
      Logger.error("POS transaction update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to update POS transaction",
        error
      );
    }
  },

  // Get daily sales summary
  getDailySummary: async (req: any, res: Response) => {
    try {
      const { date } = req.query;
      const targetDate = date || new Date().toISOString().split('T')[0];

      const summary = await POSTransactionModel.aggregate([
        {
          $match: {
            date: targetDate,
            paymentStatus: 'PAID'
          }
        },
        {
          $group: {
            _id: null,
            totalTransactions: { $sum: 1 },
            totalAmount: { $sum: '$totalAmount' },
            totalDiscount: { $sum: '$discount' },
            totalTax: { $sum: '$tax' },
            averageTransaction: { $avg: '$totalAmount' }
          }
        }
      ]);

      const result = summary[0] || {
        totalTransactions: 0,
        totalAmount: 0,
        totalDiscount: 0,
        totalTax: 0,
        averageTransaction: 0
      };

      return formatResponse(res, 200, true, "Daily summary retrieved successfully", result);
    } catch (error) {
      Logger.error("Daily summary retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve daily summary",
        error
      );
    }
  },
};

export { posController };
