import Logger from "../../../utils/logUtils";
import { MedicineRequestModel } from "../models/pharmacy.model";
import { formatResponse } from "../../api/utilities/formatRes";
import { Response } from "express";
import { IMedicineRequest } from "../types/pharmacy.types";
import { getNextSequence } from "../../api/utilities/batchCreater";

const medicineRequestController = {
  create: async (req: any, res: Response) => {
    try {
      const {
        medications = [],
        ...requestData
      } = req.body as IMedicineRequest;

      const userId = req.user?.id;

      if (!Array.isArray(medications) || medications.length === 0) {
        return formatResponse(res, 400, false, "Medications list must contain at least one item.");
      }

      // Generate request ID
      const nextSeq = await getNextSequence("medicine_request");
      const requestId = `MR${nextSeq.toString().padStart(8, "0")}`;

      const request = await MedicineRequestModel.create({
        ...requestData,
        requestId,
        medications,
        createdBy: userId,
      });

      return formatResponse(
        res,
        201,
        true,
        "Medicine request created successfully",
        request
      );
    } catch (error) {
      Logger.error("Medicine request creation error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to create medicine request",
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
        priority,
        requestType,
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
          { requestId: { $regex: search, $options: 'i' } },
        ];
      }

      if (status) {
        query.status = status;
      }

      if (priority) {
        query.priority = priority;
      }

      if (requestType) {
        query.requestType = requestType;
      }

      if (dateFrom || dateTo) {
        query.date = {};
        if (dateFrom) query.date.$gte = dateFrom;
        if (dateTo) query.date.$lte = dateTo;
      }

      const [result, totalCount] = await Promise.all([
        MedicineRequestModel.find(query)
          .populate('patient', 'email commonInfo')
          .populate('doctor', 'email commonInfo')
          .populate('department', 'name')
          .populate('medications.medication', 'name productCode')
          .populate('approvedBy', 'email commonInfo')
          .populate('dispensedBy', 'email commonInfo')
          .populate('createdBy', 'email role commonInfo')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limittt)
          .lean(),
        MedicineRequestModel.countDocuments(query),
      ]);

      const totalPages = Math.ceil(totalCount / limittt);

      return formatResponse(res, 200, true, "Medicine requests retrieved successfully", {
        data: result,
        pagination: {
          currentPage,
          totalPages,
          totalCount,
          limit: limittt,
        },
      });
    } catch (error) {
      Logger.error("Medicine request retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve medicine requests",
        error
      );
    }
  },

  getById: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await MedicineRequestModel.findById(id)
        .populate('patient', 'email commonInfo')
        .populate('doctor', 'email commonInfo')
        .populate('department', 'name')
        .populate('medications.medication', 'name productCode prescriptionRequired')
        .populate('approvedBy', 'email commonInfo')
        .populate('dispensedBy', 'email commonInfo')
        .populate('createdBy', 'email role commonInfo')
        .lean();

      if (!result) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      return formatResponse(res, 200, true, "Medicine request retrieved successfully", result);
    } catch (error) {
      Logger.error("Medicine request retrieval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to retrieve medicine request",
        error
      );
    }
  },

  update: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const userId = req.user?.id;

      const result = await MedicineRequestModel.findByIdAndUpdate(
        id,
        {
          ...updateData,
          updatedBy: userId,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medicine request updated successfully",
        result
      );
    } catch (error) {
      Logger.error("Medicine request update error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to update medicine request",
        error
      );
    }
  },

  approve: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { notes } = req.body;
      const userId = req.user?.id;

      const result = await MedicineRequestModel.findByIdAndUpdate(
        id,
        {
          status: 'APPROVED',
          approvedBy: userId,
          notes,
          updatedBy: userId,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medicine request approved successfully",
        result
      );
    } catch (error) {
      Logger.error("Medicine request approval error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to approve medicine request",
        error
      );
    }
  },

  reject: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { rejectionReason } = req.body;
      const userId = req.user?.id;

      if (!rejectionReason) {
        return formatResponse(res, 400, false, "Rejection reason is required");
      }

      const result = await MedicineRequestModel.findByIdAndUpdate(
        id,
        {
          status: 'REJECTED',
          rejectionReason,
          updatedBy: userId,
        },
        { new: true }
      );

      if (!result) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medicine request rejected successfully",
        result
      );
    } catch (error) {
      Logger.error("Medicine request rejection error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to reject medicine request",
        error
      );
    }
  },

  dispense: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const { notes } = req.body;
      const userId = req.user?.id;

      const request = await MedicineRequestModel.findById(id);
      if (!request) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      if (request.status !== 'APPROVED') {
        return formatResponse(res, 400, false, "Only approved requests can be dispensed");
      }

      const result = await MedicineRequestModel.findByIdAndUpdate(
        id,
        {
          status: 'DISPENSED',
          dispensedBy: userId,
          notes,
          updatedBy: userId,
        },
        { new: true }
      );

      return formatResponse(
        res,
        200,
        true,
        "Medicine request dispensed successfully",
        result
      );
    } catch (error) {
      Logger.error("Medicine request dispensing error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to dispense medicine request",
        error
      );
    }
  },

  delete: async (req: any, res: Response) => {
    try {
      const { id } = req.params;
      const result = await MedicineRequestModel.findByIdAndDelete(id);

      if (!result) {
        return formatResponse(res, 404, false, "Medicine request not found");
      }

      return formatResponse(
        res,
        200,
        true,
        "Medicine request deleted successfully",
        result
      );
    } catch (error) {
      Logger.error("Medicine request deletion error:", error);
      return formatResponse(
        res,
        500,
        false,
        "Failed to delete medicine request",
        error
      );
    }
  },
};

export { medicineRequestController };
