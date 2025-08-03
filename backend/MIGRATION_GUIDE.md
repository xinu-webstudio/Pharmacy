# Pharmacy Module Migration Guide

This guide explains how to migrate from the existing pharmacy code scattered throughout the application to the new centralized pharmacy module.

## Overview

The pharmacy functionality has been extracted from various locations in the main application and organized into a dedicated module at `main/pharmacy/`.

## File Mapping

### Original → New Location

| Original File | New Location |
|---------------|--------------|
| `api/types/inventories/medicalProductInventory.types.ts` | `pharmacy/types/medicalProductInventory.types.ts` |
| `api/model/inventories/medicalProductInventory.model.ts` | `pharmacy/models/medicalProductInventory.model.ts` |
| `api/controller/inventories/medicalProductInventory.controller.ts` | `pharmacy/controllers/medicalProductInventory.controller.ts` |
| `api/routes/inventories/medicalProductInventory.routes.ts` | `pharmacy/routes/medicalProductInventory.routes.ts` |

### New Files Created

- `pharmacy/constants.ts` - Pharmacy-specific constants
- `pharmacy/types/pharmacy.types.ts` - Additional pharmacy types (POS, Medicine Requests, etc.)
- `pharmacy/models/pharmacy.model.ts` - Additional pharmacy models
- `pharmacy/controllers/pos.controller.ts` - POS system controller
- `pharmacy/controllers/medicineRequest.controller.ts` - Medicine request controller
- `pharmacy/controllers/salesPurchase.controller.ts` - Sales and purchase controller
- `pharmacy/routes/pos.routes.ts` - POS routes
- `pharmacy/routes/medicineRequest.routes.ts` - Medicine request routes
- `pharmacy/utilities/inventoryHelpers.ts` - Inventory management utilities
- `pharmacy/utilities/billingHelpers.ts` - Billing and calculation utilities
- `pharmacy/index.ts` - Main module export

## Migration Steps

### 1. Update Imports in Existing Files

Replace imports from the old locations with imports from the pharmacy module:

```typescript
// OLD
import { MedicalProductsModel } from '../api/model/inventories/medicalProductInventory.model';
import { IMEDICALPRODUCTS } from '../api/types/inventories/medicalProductInventory.types';

// NEW
import { MedicalProductsModel } from '../pharmacy/models';
import { IMEDICALPRODUCTS } from '../pharmacy/types';
```

### 2. Update Route Registration

In your main routes configuration file, replace the old medical product inventory routes:

```typescript
// OLD
import medicalProductInventoryRoutes from './api/routes/inventories/medicalProductInventory.routes';

// NEW
import pharmacyRoutes from './pharmacy/routes';

// Register routes
app.use('/api/v1/en', pharmacyRoutes);
```

### 3. Update Constants Usage

Replace pharmacy-related constants from the main constants file:

```typescript
// OLD
import constants from '../api/constants';
const { MEDICALPRODUCT, FORMENUM } = constants.DB;

// NEW
import pharmacyConstants from '../pharmacy/constants';
const { MEDICALPRODUCT } = pharmacyConstants.DB;
const { FORMENUM } = pharmacyConstants.ENUMS;
```

### 4. Update Controller References

Update any references to the old controllers:

```typescript
// OLD
import { medicalProductController } from '../api/controller/inventories/medicalProductInventory.controller';

// NEW
import { medicalProductController } from '../pharmacy/controllers';
```

## New Features Available

The pharmacy module now includes several new features:

### 1. POS System
- Complete point-of-sale functionality
- Transaction management
- Daily sales summaries

### 2. Medicine Request Management
- Request creation and approval workflow
- Dispensing tracking
- Status management

### 3. Enhanced Inventory Management
- Stock movement tracking
- Low stock alerts
- Expiry alerts
- Inventory turnover analysis

### 4. Advanced Billing
- Automatic calculations
- Insurance coverage
- Discount rules
- Profit margin analysis

## API Endpoints

The new pharmacy module provides the following endpoints:

- `GET/POST/PUT/DELETE /pharmacy/medicalproduct` - Medical products
- `GET/POST/PUT/DELETE /pharmacy/medicalInventory` - Inventory management
- `GET/POST/PUT/DELETE /pharmacy/salePurchase` - Sales and purchases
- `GET/POST/PUT/DELETE /pharmacy/pos` - POS transactions
- `GET /pharmacy/pos/daily-summary` - Daily sales summary
- `GET/POST/PUT/DELETE /pharmacy/medicine-request` - Medicine requests
- `PUT /pharmacy/medicine-request/:id/approve` - Approve request
- `PUT /pharmacy/medicine-request/:id/reject` - Reject request
- `PUT /pharmacy/medicine-request/:id/dispense` - Dispense medicines

## Database Collections

The pharmacy module uses the following MongoDB collections:

- `medicalproduct` - Medical products
- `medicalproductinventory` - Inventory batches
- `salepurchase` - Sales and purchase records
- `POSTransaction` - POS transactions
- `MedicineRequest` - Medicine requests
- `purchaseRequest` - Purchase requests
- `quotationorder` - Quotation orders
- `StockMovement` - Stock movement history
- `Prescription` - Prescriptions

## Permissions

The pharmacy module uses the following permission codes:

- `10060` - POS access
- `10061` - Medicine request access
- `10062` - Finance section access
- `10063` - Pharmacy expenses
- `10064` - Pharmacy sales
- `10065` - Pharmacy reports

## Testing

After migration, test the following functionality:

1. Medical product CRUD operations
2. Inventory management
3. Sales and purchase transactions
4. POS system functionality
5. Medicine request workflow
6. Stock alerts and notifications
7. Billing calculations
8. Report generation

## Rollback Plan

If issues arise, you can rollback by:

1. Reverting import statements to original locations
2. Re-registering original routes
3. Restoring original controller references

The original files remain in their locations and can be used as fallback.

## Support

For issues or questions regarding the migration, refer to:

- `pharmacy/README.md` - Module documentation
- `pharmacy/types/` - Type definitions
- `pharmacy/controllers/` - Controller implementations
- `pharmacy/utilities/` - Helper functions
