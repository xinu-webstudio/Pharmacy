import React, { useRef } from 'react';
import { Text } from '../Text.component';
import { twMerge } from 'tailwind-merge';
import { Field } from 'formik';
import clsx from 'clsx';
import { Icon } from '@iconify/react/dist/iconify.js';

interface InputFieldPropTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: string;
  inputClassName?: string;
  defaultPadding?: boolean;
  border?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  errorCondition?: boolean | any;
  inputSize?: string;
}

// Refactor InputField with React.forwardRef
export const InputField = React.forwardRef<
  HTMLInputElement,
  InputFieldPropTypes
>(
  (
    {
      label,
      placeholder,
      type = 'text',
      required = false,
      border = true,
      readonly = false,
      disabled = false,
      inputClassName,
      inputSize = 'body-sm-mid',
      defaultPadding = true,
      errorCondition,
      ...other
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleCalendarClick = () => {
      if (inputRef.current && !disabled && !readonly && type === 'date') {
        inputRef.current.showPicker();
      }
    };

    const isDateType = type === 'date';

    return (
      <div
        className={clsx(
          'grid-cols-2 gap-1 items-center w-full',
          label && label !== '' && 'grid'
        )}
      >
        <label className="flex text-gray-800 gap-1">
          <Text
            variant="grey-500"
            size={inputSize as any}
            className="tracking-wide capitalize text-gray-800"
          >
            {label}
          </Text>
          {required && <span className="text-red text-sm">*</span>}
        </label>

        <div className="relative w-full">
          <Field
            ref={(el: HTMLInputElement) => {
              if (ref) {
                if (typeof ref === 'function') {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }
              inputRef.current = el;
            }}
            type={type}
            placeholder={placeholder}
            className={twMerge(
              clsx(
                'w-full outline-none text-sm transition-all  duration-200',
                'h-[36px]',

                // Border and background
                border && 'border border-gray-300',
                'bg-white ',

                // Padding
                defaultPadding && (isDateType ? 'px-2 pr-10' : 'px-2'),

                // Border radius and shadow for date inputs
                isDateType && 'rounded-sm',
                !isDateType && 'rounded-sm',

                // Focus states
                'text-black',

                // Error states
                errorCondition && 'border border-rose-200 ring-1 ring-rose-200',

                // Disabled states
                disabled && 'bg-gray-100 cursor-not-allowed text-gray-500',
                readonly && 'cursor-default',

                // Date input specific styles
                isDateType && [
                  'text-gray-700',
                  '[&::-webkit-calendar-picker-indicator]:opacity-0',
                  '[&::-webkit-calendar-picker-indicator]:absolute',
                  '[&::-webkit-calendar-picker-indicator]:right-1',
                  '[&::-webkit-calendar-picker-indicator]:w-6',
                  '[&::-webkit-calendar-picker-indicator]:h-4',
                  '[&::-webkit-calendar-picker-indicator]:cursor-pointer',
                  '[&::-webkit-calendar-picker-indicator]:z-20',
                  // Placeholder and empty state styling
                  'placeholder:text-gray-400',
                  '[&:not(:focus):invalid]:text-gray-400',
                  '[&::-webkit-datetime-edit-text]:text-gray-700',
                  '[&::-webkit-datetime-edit-month-field]:text-gray-700',
                  '[&::-webkit-datetime-edit-day-field]:text-gray-700',
                  '[&::-webkit-datetime-edit-year-field]:text-gray-700',
                  '[&:not(:focus)]:text-gray-400',
                  '[&:focus]:text-gray-700',
                  '[&:not(:placeholder-shown)]:text-gray-700',
                ],

                // Non-date input styles
                !isDateType && 'text-gray-700 placeholder:text-gray-400'
              )
            )}
            readOnly={readonly}
            disabled={disabled}
            {...other}
          />

          {/* Calendar Icon for date inputs */}
          {isDateType && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer z-0  transition-colors pointer-events-none"
              onClick={handleCalendarClick}
            >
              <Icon
                icon="mdi:calendar"
                className="w-4 h-4 text-gray-400"
                style={{ color: 'gray' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Add displayName for better debugging in devtools
InputField.displayName = 'InputField';
