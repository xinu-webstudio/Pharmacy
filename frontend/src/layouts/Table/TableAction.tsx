import React from 'react';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  disabled?: boolean;
}

interface TableActionProps {
  actions: ActionButton[];
  className?: string;
}

export const TableAction: React.FC<TableActionProps> = ({
  actions,
  className = '',
}) => {
  const getButtonClass = (variant: string = 'primary') => {
    switch (variant) {
      case 'primary':
        return 'btn btn-primary';
      case 'secondary':
        return 'btn btn-secondary';
      case 'success':
        return 'btn btn-success';
      case 'warning':
        return 'btn btn-warning';
      case 'error':
        return 'btn btn-error';
      default:
        return 'btn btn-primary';
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          disabled={action.disabled}
          className={`${getButtonClass(action.variant)} px-3 py-1 text-sm`}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};
