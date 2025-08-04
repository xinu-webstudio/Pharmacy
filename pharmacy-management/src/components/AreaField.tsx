import React from 'react';
import { Text } from './Text';

interface AreaFieldPropTypes
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  required?: boolean;
  variant?: string;
  size?: string;
}

export const AreaField = React.forwardRef<
  HTMLTextAreaElement,
  AreaFieldPropTypes
>(({ label, placeholder, required = false, ...other }, ref) => (
  <div className="flex flex-col gap-2">
    <label className="flex gap-1 place-items-start">
      <Text variant="grey-600" size="body-sm-lg">
        {label}
      </Text>
      {required && <span className="text-red">*</span>}
    </label>
    <textarea
      ref={ref}
      placeholder={placeholder}
      className="border border-grey-200 py-3 px-4 rounded text-black outline-none"
      {...other}
    />
  </div>
));
