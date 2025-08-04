import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Basic pharmacy API routes
app.get('/api/v1/en/pharmacy/health', (req, res) => {
  res.json({
    message: 'Pharmacy API is running',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/v1/en/pharmacy/products',
      '/api/v1/en/pharmacy/inventory',
      '/api/v1/en/pharmacy/sales',
      '/api/v1/en/pharmacy/pos',
    ],
  });
});

// Mock pharmacy endpoints
app.get('/api/v1/en/pharmacy/products', (req, res) => {
  res.json({
    success: true,
    message: 'Products retrieved successfully',
    data: [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        category: 'DRUG',
        price: 10.50,
        stock: 100,
        status: 'IN-STOCK'
      },
      {
        id: '2',
        name: 'Ibuprofen 400mg',
        category: 'DRUG',
        price: 15.75,
        stock: 50,
        status: 'IN-STOCK'
      }
    ],
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/v1/en/pharmacy/inventory', (req, res) => {
  res.json({
    success: true,
    message: 'Inventory retrieved successfully',
    data: {
      totalProducts: 150,
      lowStock: 5,
      outOfStock: 2,
      nearExpiry: 3,
    },
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Pharmacy Management System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      api: `/api/${process.env.API_VERSION || 'v1'}/en`,
      pharmacy: `/api/${process.env.API_VERSION || 'v1'}/en/pharmacy`,
    },
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} does not exist.`,
    availableRoutes: [
      '/',
      '/health',
      `/api/${process.env.API_VERSION || 'v1'}/en/pharmacy`,
    ],
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    error: message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Pharmacy Management System API running on port ${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}/en`);
  console.log(`💊 Pharmacy Routes: http://localhost:${PORT}/api/${process.env.API_VERSION || 'v1'}/en/pharmacy`);
  
  if (NODE_ENV === 'development') {
    console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
