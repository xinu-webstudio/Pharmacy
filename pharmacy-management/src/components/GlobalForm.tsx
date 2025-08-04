import { Field, FieldProps } from "formik";
import { ReactNode } from "react";

interface Option {
    value: string;
    label: string;
}

interface FieldConfig {
    type: string;
    field: string;
    label: string;
    options?: Option[];
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: string | string[];
    isMultipleFile?: boolean;
}

interface GlobalFormProps {
    formDatails: FieldConfig[];
    getFieldProps: (field: string) => FieldProps['field'];
    onValueChange?: (field: string, value: string | string[]) => void;
}

const renderField = ({
    type,
    field,
    label,
    options,
    placeholder,
    disabled,
    defaultValue,
}: FieldConfig, getFieldProps: (field: string) => FieldProps['field'], onValueChange?: (field: string, value: string | string[]) => void): ReactNode => {
    switch (type) {
        case 'select':
            return (
                <select
                    {...getFieldProps(field)}
                    id={field}
                    className="bg-gray-50 focus:outline-none placeholder-gray-400 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                    <option value="" disabled>{label}</option>
                    {options?.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            );

        case 'radio':
            return (
                <div className="flex flex-col gap-2">
                    {options?.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2">
                            <input
                                {...getFieldProps(field)}
                                type="radio"
                                value={value}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{label}</span>
                        </label>
                    ))}
                </div>
            );

        case 'checkbox':
            return (
                <div className="flex flex-wrap gap-2">
                    {options?.map(({ value, label }) => (
                        <label key={value} className="flex items-center gap-2">
                            <input
                                {...getFieldProps(field)}
                                type="checkbox"
                                value={value}
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
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
                    className="w-full h-24 placeholder-gray-400 px-2 py-1 rounded-md border border-gray-300 focus:outline-none resize-none"
                    placeholder={placeholder || label}
                    {...getFieldProps(field)}
                />
            );

        case 'multiple':
            return (
                <select
                    multiple
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
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
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
            );

        default:
            return (
                <Field
                    className="h-12 w-full placeholder-gray-400 px-2 border rounded-md border-gray-300 focus:outline-none"
                    placeholder={placeholder || label}
                    type={type}
                    disabled={disabled}
                    {...getFieldProps(field)}
                />
            );
    }
};

export const GlobalForm: React.FC<GlobalFormProps> = ({ formDatails, getFieldProps, onValueChange }) => {
    return (
        formDatails.map((fieldConfig) => (
            <div key={fieldConfig.field} className="">
                <div className="font-bold text-gray-700 block text-sm mb-2 py-1">
                    {fieldConfig.label}
                </div>
                {renderField(fieldConfig, getFieldProps, onValueChange)}
            </div>
        ))
    );
};
