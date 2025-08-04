
import { useState, useEffect, useRef } from "react";
import { Text } from "./Text";
import { twMerge } from "tailwind-merge";
import { Field } from "formik";

interface SelectInputProps {
    options: {
        value: string;
        label: string;
    }[];
    placeholder?: string;
    name: string;
    label?: string;
    border?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ options, placeholder = "Type to search...", name, label, border = true }) => {
    const [query, setQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFilteredOptions(
            options.filter((option) =>
                option.label.toLowerCase().includes(query.toLowerCase())
            )
        );
    }, [query, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: string) => {
        setQuery(option);
        setShowDropdown(false);
    };

    return (
        <div className="relative " ref={dropdownRef}>
            <div className="flex flex-col gap-2">
                <label className="flex gap-1">
                    <Text variant="grey-600" size="body-sm-lg">
                        {label}
                    </Text>
                </label>
                <Field
                    type="text"
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setQuery(e.target.value);
                        setShowDropdown(true);
                    }}
                    name={name}
                    placeholder={placeholder}
                    className={twMerge(
                        `${border && 'border'} border-grey-200 rounded  text-black py-2 px-4 outline-none w-full `
                    )}
                />

            </div>
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-md max-h-40 overflow-y-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="px-3 py-1 cursor-pointer hover:bg-gray-200"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectInput;
