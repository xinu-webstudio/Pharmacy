import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import clsx from 'clsx';

interface dropDownFieldPropTypes
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  firstInput?: string;
  options?: {
    value: any;
    label: string;
    extra?: string;
    other?: any;
    more?: any;
  }[];
  required?: boolean;
  inputClassname?: string;
  error?: string;
  errorCondition?: boolean | any;
}

export const DropdownField = React.forwardRef<
  HTMLSelectElement,
  dropDownFieldPropTypes
>(
  (
    {
      label,
      options,
      required = false,
      firstInput,
      error,
      inputClassname,
      errorCondition,
      value,
      ...other
    },
    ref
  ) => {
    // Check if we're showing placeholder (no value selected)
    const isShowingPlaceholder = !value || value === '';

    return (
      <div
        className={clsx(
          'grid-cols-2 items-center gap-1',
          label && label !== '' && 'grid'
        )}
      >
        <label className="flex text-gray-800 gap-1">
          <Text
            variant="grey-500"
            size="body-sm-mid"
            className="tracking-wide capitalize text-gray-800"
          >
            {label}
          </Text>
          {required && <span className="text-red text-sm">*</span>}
        </label>
        <div
          className={`border border-gray-300 text-sm px-1 rounded-sm flex justify-center items-center h-[36px] ${
            errorCondition ? 'border border-rose-200 ring-1 ring-rose-200' : ''
          }`}
        >
          <select
            className={twMerge(
              `w-full h-full outline-none  bg-transparent ${
                isShowingPlaceholder ? 'text-gray-400' : 'text-gray-700'
              } ${inputClassname}`
            )}
            value={value || ''}
            ref={ref}
            {...other}
          >
            <option
              key="default-option"
              value=""
              disabled
              className="text-gray-400"
            >
              {firstInput || `Select ${label}`}
            </option>
            {options?.map((option) => (
              <option
                key={option.value + option.label}
                value={option.value}
                className="text-black"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <span className="text-red text-sm">{error}</span>}
      </div>
    );
  }
);
