import { Field, FieldProps } from 'formik';
import { ReactNode } from 'react';
import { Text } from './Text.component';
import { twMerge } from 'tailwind-merge';
import { SearchableDropdown } from './inputs/SearchableDropdown.component';
import { FormikMultiSelect } from './inputs/FormikMultiSelect.component';

interface Option {
  value: string;
  label: string;
}

interface FieldConfig {
  type: string;
  field: string;
  label?: string;
  options?: Option[];
  placeholder?: string;
  firstInput?: string;

  required?: boolean;
  disabled?: boolean;
  minValidation?: boolean;
  defaultValue?: string | string[];
  isMultipleFile?: boolean;
  className?: string;
  isVisible?: boolean;
}

interface GlobalFormProps {
  formDatails: FieldConfig[];
  getFieldProps: (field: string) => FieldProps['field'];
  onValueChange?: (field: string, value: string | string[]) => void;
  errors?: Record<string, string> | any;
  touched?: Record<string, any>;
}

const renderField = (
  {
    type,
    field,
    label,
    options,
    placeholder,
    disabled,
    defaultValue,
    minValidation,
    required,
    className,
  }: FieldConfig,
  getFieldProps: (field: string) => FieldProps['field'],
  onValueChange?: (field: string, value: string | string[]) => void
): ReactNode => {
  switch (type) {
    case 'select':
      return (
        <div
          className={`border border-grey-200 pl-2 px-3 py-[6px] rounded-sm flex justify-center items-center }`}
        >
          <select
            {...getFieldProps(field)}
            id={field}
            className={twMerge(
              `text-gray-700 w-full text-[14px]  outline-none ${className}`
            )}
            // onChange={(e) => {
            //   const selectedValue = e.target.value;
            //   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            //   onValueChange && onValueChange(field, selectedValue);
            // }}
          >
            <option
              value=""
              className="text-bgToken"
              key="default-option"
              disabled
            >
              Select {label}
            </option>
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'radio':
      return (
        <div className="flex flex-wrap gap-2">
          {options?.map(({ value, label }) => {
            const fieldProps = getFieldProps(field);
            return (
              <label key={value} className="flex items-center gap-2">
                <input
                  {...fieldProps}
                  type="radio"
                  value={value}
                  checked={String(fieldProps.value) == String(value)}
                  className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 ${className}`}
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            );
          })}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex flex-wrap gap-2">
          {options?.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2">
              <input
                required={required}
                {...getFieldProps(field)}
                type="checkbox"
                value={value}
                className={`focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300  rounded ${className}`}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      );

    case 'textarea':
      return (
        <Field
          as="textarea"
          className={`w-full h-24 placeholder-gray-400 px-2 py-1 rounded-sm border border-gray-300 focus:outline-none resize-none ${className}`}
          placeholder={placeholder || label}
          {...getFieldProps(field)}
        />
      );

    case 'multiple':
      return (
        <select
          multiple
          className={`bg-gray-50 border border-gray-300 text-sm rounded-sm block w-full p-2.5 focus:outline-none ${className}`}
          name={field}
          onChange={(e) => {
            const selectedOptions = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            onValueChange && onValueChange(field, selectedOptions);
          }}
          value={defaultValue || []}
        >
          {options?.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );

    case 'multi-search':
      const fieldProps = getFieldProps(field);
      return (
        <SearchableDropdown
          field={field}
          options={options || []}
          label=""
          placeholder={placeholder}
          getFieldProps={getFieldProps}
          value={fieldProps.value} // Pass the current field value
          onValueChange={(field, value) => {
            onValueChange && onValueChange(field, value);
          }}
        />
      );

    case 'multi-select':
      return (
        <div className="w-[200%]">
          <FormikMultiSelect
            options={options || []}
            {...getFieldProps(field)}
          />
        </div>
      );

    default:
      return (
        <Field
          className={twMerge(
            `border border-grey-200 py-[7.5px] px-2 rounded text-[14px] items-center text-darkish-black outline-none ${
              type === 'date' ? 'placeholder:text-gray-400' : ''
            } ${className}`
          )}
          placeholder={placeholder || label}
          type={type}
          min={type === 'number' && minValidation ? 0 : ''}
          disabled={disabled}
          {...getFieldProps(field)}
        />
      );
  }
};

export const GlobalForm: React.FC<GlobalFormProps> = ({
  formDatails,
  getFieldProps,
  onValueChange,
  errors = {},
}) => {
  return formDatails
    .filter(({ isVisible = true }) => isVisible)
    .map((fieldConfig) => (
      <div
        key={fieldConfig.field}
        className={`${
          fieldConfig.label ? 'grid grid-cols-2' : ''
        } gap-1 w-full`}
      >
        {fieldConfig.label && (
          <div className="flex text-gray-800 items-center gap-1">
            <Text
              variant="grey-500"
              size="body-sm-mid"
              className="tracking-wide capitalize text-gray-800"
            >
              {fieldConfig.label}
            </Text>
            {fieldConfig.required && (
              <span className="text-red text-sm">*</span>
            )}
          </div>
        )}
        {renderField(fieldConfig, getFieldProps, onValueChange)}

        {/* Error message display */}
        {errors[fieldConfig.field] && (
          <div className="text-red text-[10px] -mt-1">
            {errors[fieldConfig.field]}
          </div>
        )}
      </div>
    ));
};
