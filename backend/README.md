# Pharmacy Module

This module contains all pharmacy-related functionality extracted from the main application.

## Structure

```
pharmacy/
├── controllers/          # Pharmacy controllers
├── models/              # Pharmacy database models
├── routes/              # Pharmacy API routes
├── types/               # Pharmacy TypeScript interfaces
├── utilities/           # Pharmacy utility functions
├── constants.ts         # Pharmacy-specific constants
└── index.ts            # Main pharmacy module exports
```

## Features

- Medical Product Management
- Inventory Management
- Sales and Purchase Management
- POS (Point of Sale) System
- Medicine Request Management
- Pharmacy Billing
- Pharmacy Reports
- Purchase Request Management
- Quotation Management

## Usage

Import the pharmacy module in your application:

```typescript
import { pharmacyRoutes, pharmacyControllers, pharmacyModels } from './pharmacy';
```
