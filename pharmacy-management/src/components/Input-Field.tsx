import React from "react";
import { Text } from "./Text";
import { twMerge } from "tailwind-merge";
import { Field } from "formik";

interface InputFieldPropTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: string;
  inputClassName?: string;
  defaultPadding?: boolean;
  border?: boolean;
  readonly?: boolean;
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
      type = "text",
      required = false,
      border = true,
      readonly = false,
      inputClassName,
      defaultPadding = true,
      ...other
    },
    ref
  ) => (
    <div className="flex flex-col w-full gap-2">
      <label className="flex text-gray-800 gap-1">
        <Text
          variant="grey-500"
          size="body-sm-lg"
          className="tracking-wide capitalize"
        >
          {label}
        </Text>
        {required && <span className="text-red">*</span>}
      </label>
      <Field
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={twMerge(
          `${border && "border"} border-grey-200 ${
            defaultPadding && "py-2 px-4"
          } rounded ${
            readonly ? "placeholder:text-black cursor-auto" : "text-black"
          } outline-none w-full ${inputClassName}`
        )}
        readOnly={readonly}
        {...other}
      />
    </div>
  )
);

// Add displayName for better debugging in devtools
InputField.displayName = "InputField";
