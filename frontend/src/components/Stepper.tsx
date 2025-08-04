import React from 'react';

interface StepperProps {
  step: number;
  title: string;
  isActive: boolean;
  isCompleted?: boolean;
}

export const Steper: React.FC<StepperProps> = ({
  step,
  title,
  isActive,
  isCompleted = false,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
          isActive
            ? 'bg-primary-600 text-white'
            : isCompleted
            ? 'bg-success-600 text-white'
            : 'bg-grey-200 text-grey-600'
        }`}
      >
        {isCompleted ? '✓' : step}
      </div>
      <span
        className={`text-sm font-medium ${
          isActive ? 'text-primary-600' : isCompleted ? 'text-success-600' : 'text-grey-600'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
