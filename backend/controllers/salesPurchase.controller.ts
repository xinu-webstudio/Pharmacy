import Logger from "../../../utils/logUtils";
import { SalesAndPurchaseModel } from "../models/medicalProductInventory.model";
import { formatResponse } from "../../api/utilities/formatRes";
import { Response } from "express";
import { ISaleAndPurchase } from "../types/medicalProductInventory.types";
import { getNextSequence } from "../../api/utilities/batchCreater";

const salePurchaseController = {
  create: async (req: any, res: Response) => {
    try {
      const {
        productList = [],
        tax = 0,
        discount = 0,
        ...requestData
      } = req.body as ISaleAndPurchase;
  
      const userId = req.user?.id;
  
      if (!Array.isArray(productList) || productList.length === 0) {
        return formatResponse(res, 400, false, "Product list must contain at least one item.");
      }
  
      const totalAmount = productList.reduce((sum, prod) => sum + (prod.totalAmount || 0), 0);
      const balanceAfterDiscount = totalAmount * (1 - Number(discount) / 100);
      const payableAmount = balanceAfterDiscount * (1 + Number(tax) / 100);
  
      const newRecord = await SalesAndPurchaseModel.create({
        ...requestData,
        productList,
        totalAmount,
        tax,
        discount,
        payableAmount,
        createdBy: userId,
      });
  
      return formatResponse(
        res,
        201,
        true,
        "Sale/Purchase record created successfully",
        newRecord
      );
    } catch (error) {
      Logger.error("Sale/Purchase creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to create Sale/Purchase record",
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
        category, 
        paymentStatus,
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
          { batchNo: { $regex: search, $options: 'i' } },
          { invoiceNo: { $regex: search, $options: 'i' } },
          { transactionNo: { $regex: search, $options: 'i' } },
        ];
      }

      if (category) {
        query.category = category;
      }

      if (paymentStatus) {
        query.paymentStatus = paymentStatus;
      }

      if (dateFrom || dateTo) {
        query.date = {};
        if (dateFrom) query.date.$gte = dateFrom;
        if (dateTo) query.date.$lte = dateTo;
      }

      const [result, totalCount] = await Promise.all([
        SalesAndPurchaseModel.find(query)
          .populate('vendor', 'email commonInfo')
          .populate('billingAgainst', 'email commonInfo')
          .populate('productList.product', 'name productCode')
          .populate('bank', 'name accountNumber')
          .populate('createdBy', 'email role commonInfo')
          .populate('updatedBy', 'email role commonInfo')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limittt)
          .lean(),
        SalesAndPurchaseModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limittt);

      return formatResponse(res, 200, true, "Sale/Purchase records retrieved successfully", {
        data: result,
        pagination: {
          currentPage,
          totalPages,
          totalCount,
          limit: limittt,
        },
      });
    } catch (error) {
      Logger.error("Sale/Purchase retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve Sale/Purchase records",
        error
      );
    }
  },

  getById: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await SalesAndPurchaseModel.findById(id)
        .populate('vendor', 'email commonInfo')
        .populate('billingAgainst', 'email commonInfo')
        .populate('productList.product', 'name productCode')
        .populate('bank', 'name accountNumber')
        .populate('createdBy', 'email role commonInfo')
        .populate('updatedBy', 'email role commonInfo')
        .lean();

      if (!result) {
        return formatResponse(res, 404, false, "Sale/Purchase record not found");
      }

      return formatResponse(res, 200, true, "Sale/Purchase record retrieved successfully", result);
    } catch (error) {
      Logger.error("Sale/Purchase retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve Sale/Purchase record",
        error
      );
    }
  },

  update: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const {
        productList = [],
        tax = 0,
        discount = 0,
        ...requestData
      } = req.body as ISaleAndPurchase;

      const userId = req.user?.id;

      if (!Array.isArray(productList) || productList.length === 0) {
        return formatResponse(res, 400, false, "Product list must contain at least one item.");
      }

      const totalAmount = productList.reduce((sum, prod) => sum + (prod.totalAmount || 0), 0);
      const balanceAfterDiscount = totalAmount * (1 - Number(discount) / 100);
      const payableAmount = balanceAfterDiscount * (1 + Number(tax) / 100);

      const result = await SalesAndPurchaseModel.findByIdAndUpdate(
        id,
        {
          ...requestData,
          productList,
          totalAmount,
          tax,
          discount,
          payableAmount,
          updatedBy: userId,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "Sale/Purchase record not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Sale/Purchase record updated successfully",
        result
      );
    } catch (error) {
      Logger.error("Sale/Purchase update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to update Sale/Purchase record",
        error
      );
    }
  },

  delete: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await SalesAndPurchaseModel.findByIdAndDelete(id);

      if (!result) {
        return formatResponse(res, 404, false, "Sale/Purchase record not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Sale/Purchase record deleted successfully",
        result
      );
    } catch (error) {
      Logger.error("Sale/Purchase deletion error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to delete Sale/Purchase record",
        error
      );
    }
  },
};

export { salePurchaseController };
