import Logger from "../src/utils/logUtils";
import {
  MedicalProductInventoryModel,
  SalesAndPurchaseModel,
  MedicalProductsModel,
} from "../models/medicalProductInventory.model";
import { formatResponse } from "../src/api/utilities/formatRes";
import { Response } from "express";
import {
  IMedicalProductInventory,
  ISaleAndPurchase,
  IMEDICALPRODUCTS,
} from "../types/medicalProductInventory.types";
import { Types } from "mongoose";
import { getNextSequence } from "../src/api/utilities/batchCreater";

const medicalProductController = {
  create: async (req: any, res: Response) => {
    try {
      const data = req.body as IMEDICALPRODUCTS;
      const { ...requestData } = data;
      const nextSeq = await getNextSequence("medical_batch");
      const newNumber = nextSeq.toString().padStart(8, "0");
      const productCode = `${"PHA"}${newNumber}`;

      const result = await MedicalProductsModel.create({
        ...requestData,
        productCode,
        createdBy: req.user?.id,
      });

      return formatResponse(res, 201, true, "Medical Product Created", result);
    } catch (error) {
      Logger.error("Medical Product error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to Medical Product",
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
        productCategory,
        ...rest
      } = req.query;
      const limittt = Math.max(parseInt(limit, 10), 1);
      const currentPage = Math.max(parseInt(page, 10), 1);
      const skip = (currentPage - 1) * limittt;

      const query: any = {};
      Object.keys(rest).forEach((key) => {
        if (rest[key] !== undefined && rest[key] !== null && rest[key] !== "") {
          query[key] = rest[key];
        }
      });

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { productCode: { $regex: search, $options: "i" } },
        ];
      }

      if (productCategory) {
        query.productCategory = productCategory;
      }

      const [result, totalCount] = await Promise.all([
        MedicalProductsModel.find(query)
          .populate("brand", "name")
          .populate("createdBy", "email role commonInfo")
          .populate("updatedBy", "email role commonInfo")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limittt)
          .lean(),
        MedicalProductsModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limittt);

      return formatResponse(
        res,
        200,
        true,
        "Medical Products retrieved successfully",
        {
          data: result,
          pagination: {
            currentPage,
            totalPages,
            totalCount,
            limit: limittt,
          },
        }
      );
    } catch (error) {
      Logger.error("Medical Product retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve Medical Products",
        error
      );
    }
  },

  getById: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await MedicalProductsModel.findById(id)
        .populate("brand", "name")
        .populate("createdBy", "email role commonInfo")
        .populate("updatedBy", "email role commonInfo")
        .lean();

      if (!result) {
        return formatResponse(res, 404, false, "Medical Product not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medical Product retrieved successfully",
        result
      );
    } catch (error) {
      Logger.error("Medical Product retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve Medical Product",
        error
      );
    }
  },

  update: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body as IMEDICALPRODUCTS;
      const { ...requestData } = data;

      const result = await MedicalProductsModel.findByIdAndUpdate(
        id,
        {
          ...requestData,
          updatedBy: req.user?.id,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "Medical Product not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medical Product updated successfully",
        result
      );
    } catch (error) {
      Logger.error("Medical Product update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to update Medical Product",
        error
      );
    }
  },

  delete: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await MedicalProductsModel.findByIdAndDelete(id);

      if (!result) {
        return formatResponse(res, 404, false, "Medical Product not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medical Product deleted successfully",
        result
      );
    } catch (error) {
      Logger.error("Medical Product deletion error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to delete Medical Product",
        error
      );
    }
  },
};

// Helper functions for inventory management
const updatePharmacyInventory = async (
  inventoryId: string,
  quantityChange: number,
  userId: any
) => {
  try {
    const inventory = await MedicalProductInventoryModel.findById(inventoryId);
    if (!inventory) {
      throw new Error(`Inventory with ID ${inventoryId} not found`);
    }

    const newAvailableStock = inventory.availableStock + quantityChange;
    if (newAvailableStock < 0) {
      throw new Error(
        `Insufficient stock. Available: ${
          inventory.availableStock
        }, Required: ${Math.abs(quantityChange)}`
      );
    }

    const { ...otherFields } = inventory.toObject();
    delete otherFields._id;
    delete otherFields.__v;

    const updatedInventory =
      await MedicalProductInventoryModel.findByIdAndUpdate(
        inventoryId,
        {
          $set: {
            ...otherFields,
            availableStock: newAvailableStock,
            updatedBy: userId,
          },
        },
        { new: true }
      );

    return updatedInventory;
  } catch (error) {
    Logger.error(`Error updating inventory [${inventoryId}]:`, error);
    throw error;
  }
};

const createPharmacyInventory = async (
  data: IMedicalProductInventory,
  userId: any
) => {
  const { ...otherFields } = data;
  return MedicalProductInventoryModel.create({
    ...otherFields,
    createdBy: userId,
  });
};

const medicalInventoryController = {
  create: async (req: any, res: Response) => {
    try {
      const data = req.body as IMedicalProductInventory;
      const userId = req.user?.id;
      const result = await createPharmacyInventory(data, userId);
      return formatResponse(
        res,
        201,
        true,
        "Medical Inventory Created",
        result
      );
    } catch (error) {
      Logger.error("Medical Inventory Creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to Create Medical Inventory",
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
        status,
        category,
        ...rest
      } = req.query;
      const limittt = Math.max(parseInt(limit, 10), 1);
      const currentPage = Math.max(parseInt(page, 10), 1);
      const skip = (currentPage - 1) * limittt;

      const query: any = {};
      Object.keys(rest).forEach((key) => {
        if (rest[key] !== undefined && rest[key] !== null && rest[key] !== "") {
          query[key] = rest[key];
        }
      });

      if (search) {
        query.$or = [
          { batchNo: { $regex: search, $options: "i" } },
          { invoiceNo: { $regex: search, $options: "i" } },
        ];
      }

      if (status) {
        query.status = status;
      }

      if (category) {
        query.category = category;
      }

      const [result, totalCount] = await Promise.all([
        MedicalProductInventoryModel.find(query)
          .populate("product", "name productCode")
          .populate("vendor", "email commonInfo")
          .populate("purchasedBy", "email commonInfo")
          .populate("store", "name location")
          .populate("createdBy", "email role commonInfo")
          .populate("updatedBy", "email role commonInfo")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limittt)
          .lean(),
        MedicalProductInventoryModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limittt);

      return formatResponse(
        res,
        200,
        true,
        "Medical Inventory retrieved successfully",
        {
          data: result,
          pagination: {
            currentPage,
            totalPages,
            totalCount,
            limit: limittt,
          },
        }
      );
    } catch (error) {
      Logger.error("Medical Inventory retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve Medical Inventory",
        error
      );
    }
  },
};

export { medicalProductController, medicalInventoryController };
