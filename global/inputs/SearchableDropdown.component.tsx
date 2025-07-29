import React, { useState, useRef, useEffect } from 'react';
import { FieldProps } from 'formik';

interface Option {
  value: string;
  label: string;
  [key: string]: any;
}

interface SearchableDropdownProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field: string;
  label: string;
  options: Option[];
  disableInput?: boolean;
  isEditMode?: boolean;
  getFieldProps: (field: string) => FieldProps['field'];
  onValueChange?: (field: string, value: string, extra?: any) => void;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  field,
  label,
  options,
  placeholder,
  getFieldProps,
  onValueChange,
  value,
  disableInput,
  required = false,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get Formik props
  const formikProps = getFieldProps(field);

  // Find and set the selected option based on the value prop when options change or in edit mode
  useEffect(() => {
    if (value && options?.length > 0) {
      const option = options.find((opt) => opt.value === value);
      if (option) {
        setSelectedOption(option);
        setSearchTerm(option.label);
      }
    } else if (!value) {
      // Clear state when value is empty
      setSelectedOption(null);
      setSearchTerm('');
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  useEffect(() => {
    const filtered = options?.filter((option) =>
      option?.label?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered || []);
  }, [searchTerm, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    // Only clear the selected option if the user has typed something that
    // doesn't match the beginning of the selected option's label
    if (selectedOption) {
      const isTypingToSearch = !selectedOption.label
        .toLowerCase()
        .startsWith(inputValue.toLowerCase());

      if (isTypingToSearch && inputValue.length > 0) {
        setSelectedOption(null);
        // Clear the field value via callback
        if (onValueChange) {
          onValueChange(field, '');
        }
      }
    }

    setIsOpen(true);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);

    // Call the onValueChange callback to update the form
    if (onValueChange) {
      onValueChange(field, option.value, option);
    }
  };

  const handleInputClick = () => {
    // If there's a selected option, select all text for easy replacement
    // If no selected option, clear the search term to show all options
    if (!selectedOption) {
      setSearchTerm('');
    }
    setIsOpen(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="font-bold text-gray-700 block text-sm ">
        {label}
        {required && (
          <span className="text-red text-opacity-75 text-xs relative bottom-1  ml-1 ">
            *
          </span>
        )}
      </div>
      <div className="relative">
        <input
          name={formikProps.name}
          type="text"
          className="border w-full border-grey-200 pl-2 px-3 py-[6px] rounded outline-none flex justify-center items-center "
          placeholder={placeholder || 'Search or select...'}
          value={searchTerm}
          onChange={handleInputChange}
          disabled={disableInput}
          onClick={handleInputClick}
          {...other}
          autoComplete="off"
          data-form-type="other"
        />
        {/* Hidden input to store the actual value for Formik */}
        <input
          type="hidden"
          name={formikProps.name}
          value={selectedOption?.value || ''}
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions?.length > 0 ? (
            filteredOptions?.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm ${
                  selectedOption?.value === option.value ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
