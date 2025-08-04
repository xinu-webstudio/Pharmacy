import React from 'react';

interface StatusProps {
  status: string;
  className?: string;
}

export const Status: React.FC<StatusProps> = ({ status, className = '' }) => {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
      case 'COMPLETED':
      case 'PAID':
      case 'IN-STOCK':
        return 'bg-success-100 text-success-800 border-success-200';
      case 'PENDING':
      case 'PROCESSING':
      case 'LOW-STOCK':
        return 'bg-warning-100 text-warning-800 border-warning-200';
      case 'INACTIVE':
      case 'CANCELLED':
      case 'FAILED':
      case 'OUT-OF-STOCK':
      case 'OUTOFSTOCK':
        return 'bg-error-100 text-error-800 border-error-200';
      case 'DRAFT':
      case 'NEAR-EXPIRY':
        return 'bg-grey-100 text-grey-800 border-grey-200';
      default:
        return 'bg-grey-100 text-grey-800 border-grey-200';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
};
