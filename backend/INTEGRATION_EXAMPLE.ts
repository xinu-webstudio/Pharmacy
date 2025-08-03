/**
 * Example integration of the Pharmacy Module
 * 
 * This file shows how to integrate the pharmacy module into your main application
 */

import express from 'express';
import { Application } from 'express';

// Import the pharmacy module
import pharmacyModule, { pharmacyRoutes, pharmacyConstants } from './pharmacy';

// Example: Integrating pharmacy routes into Express app
export const integratePharmacyModule = (app: Application) => {
  // Register pharmacy routes
  app.use('/api/v1/en', pharmacyRoutes);
  
  console.log('Pharmacy module integrated successfully');
  console.log('Available endpoints:', pharmacyModule.endpoints);
};

// Example: Using pharmacy controllers directly
import { 
  medicalProductController, 
  posController, 
  medicineRequestController 
} from './pharmacy/controllers';

export const exampleControllerUsage = () => {
  // You can use controllers directly in custom routes
  const router = express.Router();
  
  // Custom route using pharmacy controller
  router.get('/custom-medical-products', medicalProductController.getAll);
  router.get('/custom-pos-summary', posController.getDailySummary);
  
  return router;
};

// Example: Using pharmacy utilities
import { 
  updateInventoryStock, 
  calculateBillTotals, 
  getLowStockAlerts 
} from './pharmacy/utilities';

export const exampleUtilityUsage = async () => {
  try {
    // Update inventory stock
    await updateInventoryStock(
      'batch-id-123', 
      -5, // reduce by 5 units
      'user-id-456', 
      'Sale transaction',
      'POS-12345'
    );
    
    // Calculate bill totals
    const billTotals = calculateBillTotals(
      [
        { quantity: 2, unitPrice: 100, discount: 5 },
        { quantity: 1, unitPrice: 50, discount: 0 }
      ],
      10, // 10% global discount
      5   // 5% tax
    );
    
    console.log('Bill totals:', billTotals);
    
    // Get low stock alerts
    const lowStockItems = await getLowStockAlerts();
    console.log('Low stock items:', lowStockItems);
    
  } catch (error) {
    console.error('Error using pharmacy utilities:', error);
  }
};

// Example: Using pharmacy models directly
import { 
  MedicalProductsModel, 
  POSTransactionModel, 
  MedicineRequestModel 
} from './pharmacy/models';

export const exampleModelUsage = async () => {
  try {
    // Create a new medical product
    const newProduct = await MedicalProductsModel.create({
      name: 'Paracetamol 500mg',
      productCode: 'PHA00000001',
      prescriptionRequired: false,
      productCategory: 'DRUG',
      drug: {
        genericName: 'Paracetamol',
        commonName: 'Paracetamol',
        brandName: 'Crocin',
        strength: '500mg',
        form: 'TABLET',
        route: 'ORAL',
        useCase: 'Pain relief and fever reduction'
      },
      createdBy: 'user-id-123'
    });
    
    console.log('Created product:', newProduct);
    
    // Find POS transactions for today
    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = await POSTransactionModel.find({
      date: today,
      paymentStatus: 'PAID'
    }).populate('items.product', 'name productCode');
    
    console.log('Today\'s transactions:', todayTransactions);
    
  } catch (error) {
    console.error('Error using pharmacy models:', error);
  }
};

// Example: Using pharmacy constants
export const exampleConstantsUsage = () => {
  console.log('Pharmacy database collections:', pharmacyConstants.DB);
  console.log('Available drug forms:', pharmacyConstants.ENUMS.FORMENUM);
  console.log('Payment methods:', pharmacyConstants.ENUMS.PAYMENTMETHOD);
  console.log('Pharmacy routes:', pharmacyConstants.ROUTES);
};

// Example: Complete pharmacy service class
export class PharmacyService {
  
  async createMedicalProduct(productData: any, userId: string) {
    try {
      const product = await MedicalProductsModel.create({
        ...productData,
        createdBy: userId
      });
      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async processPOSSale(saleData: any, userId: string) {
    try {
      // Validate stock availability
      const stockValidation = await this.validateStockAvailability(saleData.items);
      if (!stockValidation.allAvailable) {
        return { success: false, error: 'Insufficient stock for some items' };
      }
      
      // Calculate totals
      const totals = calculateBillTotals(
        saleData.items,
        saleData.discount || 0,
        saleData.tax || 0
      );
      
      // Create POS transaction
      const transaction = await POSTransactionModel.create({
        ...saleData,
        ...totals,
        cashier: userId,
        createdBy: userId
      });
      
      // Update inventory
      for (const item of saleData.items) {
        await updateInventoryStock(
          item.batchId,
          -item.quantity,
          userId,
          'POS Sale',
          transaction.transactionId
        );
      }
      
      return { success: true, data: transaction };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async processeMedicineRequest(requestData: any, userId: string) {
    try {
      const request = await MedicineRequestModel.create({
        ...requestData,
        createdBy: userId
      });
      
      // Send notification to pharmacy staff
      // await this.sendMedicineRequestNotification(request);
      
      return { success: true, data: request };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async getPharmacyDashboard(userId: string) {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const [
        lowStockAlerts,
        todaySales,
        pendingRequests,
        expiryAlerts
      ] = await Promise.all([
        getLowStockAlerts(),
        POSTransactionModel.countDocuments({ date: today, paymentStatus: 'PAID' }),
        MedicineRequestModel.countDocuments({ status: 'PENDING' }),
        this.getExpiryAlerts(30) // 30 days ahead
      ]);
      
      return {
        success: true,
        data: {
          lowStockAlerts: lowStockAlerts.length,
          todaySales,
          pendingRequests,
          expiryAlerts: expiryAlerts.length,
          alerts: {
            lowStock: lowStockAlerts,
            expiry: expiryAlerts
          }
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  private async validateStockAvailability(items: any[]) {
    // Implementation would use the utility function
    // This is just a placeholder
    return { allAvailable: true };
  }
  
  private async getExpiryAlerts(daysAhead: number) {
    // Implementation would use the utility function
    // This is just a placeholder
    return [];
  }
}

// Export the service for use in your application
export const pharmacyService = new PharmacyService();
