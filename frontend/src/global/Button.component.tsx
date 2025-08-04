import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  title?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  title,
  className = '',
  onClick,
  size = 'md',
  children,
  ...props
}) => {
  const sizes = {
    xs: 'px-2 py-1 text-sm',
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const variants = {
    primary: 'bg-primary text-white hover:bg-light_primary',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    outline: 'border border-primary text-primary hover:bg-primary/10',
  };

  const baseClasses =
    'inline-flex justify-center items-center mt-1 rounded-md transition-colors duration-200 font-medium';
  const sizeClasses = sizes[size];
  const variantClasses = variants[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children || title || 'Add'}
    </button>
  );
};

export default Button;
