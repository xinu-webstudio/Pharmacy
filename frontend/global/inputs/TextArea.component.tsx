// export default TextareaField;
import React from 'react';
import { Field } from 'formik';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Text } from '../Text.component';

interface TextAreaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  variant?: string;
  inputClassName?: string;
  defaultPadding?: boolean;
  border?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  inputSize?: string;
}

// Refactor TextAreaField with React.forwardRef
const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      label,
      placeholder,
      required = false,
      border = true,
      readonly = false,
      disabled = false,
      inputClassName,
      inputSize = 'body-sm-mid',
      defaultPadding = true,
      ...other
    },
    ref
  ) => (
    <div
      className={clsx(
        'grid grid-cols grid-cols-2 gap-1 items-center w-full',
        label && label !== '' && 'grid'
      )}
    >
      <label className="flex text-gray-800 gap-1 pt-1">
        <Text
          variant="grey-500"
          size={inputSize as any}
          className="tracking-wide capitalize"
        >
          {label}
        </Text>
        {required && <span className="text-red text-sm">*</span>}
      </label>

      <Field
        as="textarea"
        innerRef={ref}
        rows={1}
        placeholder={placeholder}
        className={twMerge(
          `${border && 'border'} border-grey-200 ${
            defaultPadding && 'py-[6px] px-2'
          } rounded-sm text-sm resize-none ${
            readonly ? ' cursor-auto' : 'text-black'
          } outline-none w-full ${inputClassName}`,
          disabled && 'bg-gray-50 cursor-not-allowed'
        )}
        readOnly={readonly}
        disabled={disabled}
        {...other}
      />
    </div>
  )
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
