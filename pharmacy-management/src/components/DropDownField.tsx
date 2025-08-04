import React from "react";
import { Text } from "./Text";
import { twMerge } from "tailwind-merge";

interface dropDownFieldPropTypes
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  firstInput?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  inputClassname?: string;
  error?: string;
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
      ...other
    },
    ref
  ) => (
    <div className="flex flex-col gap-2">
      <label className="flex gap-1">
         <Text
                  variant="grey-500"
                  size="body-sm-lg"
                  className="tracking-wide capitalize"
                >
                  {label}
                </Text>
        {/* {label && (
          <Text variant="grey-500" size="body-xs-default">
            {label}
          </Text>
        )} */}
        {required && <span className="text-red">*</span>}
      </label>
      <div className="border border-grey-200 pr-2 py-2 rounded flex justify-center items-center">
        <select
          className={twMerge(
            `text-gray-700 w-full pl-2 rounded outline-none ${inputClassname}`
          )}
          defaultValue={firstInput ? "" : undefined}
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
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
);
