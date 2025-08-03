import type React from 'react';
import {
  useState,
  type KeyboardEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Field, type FieldProps } from 'formik';
import clsx from 'clsx';
import { Text } from '../Text.component';

interface FormikMultiSelectProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  options?: { label: string; value: string }[];
  labelWidth?: string;
}

export const FormikMultiSelect: React.FC<FormikMultiSelectProps> = ({
  name,
  label,
  required,
  placeholder = 'Type and press Enter',
  className,
  options = [],
  labelWidth = 'w-32',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Map<number, HTMLLIElement>>(new Map());

  useEffect(() => {
    optionRefs.current.clear();
  }, [options.length]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [options.length, inputValue]);

  useEffect(() => {
    if (!isFocused) {
      setHighlightedIndex(-1);
    }
  }, [isFocused]);

  const setOptionRef = useCallback((index: number) => {
    return (el: HTMLLIElement | null) => {
      if (el) {
        optionRefs.current.set(index, el);
      } else {
        optionRefs.current.delete(index);
      }
    };
  }, []);

  useEffect(() => {
    if (highlightedIndex >= 0 && isFocused && dropdownRef.current) {
      const dropdown = dropdownRef.current;
      const highlightedOption = optionRefs.current.get(highlightedIndex);
      if (dropdown && highlightedOption) {
        const dropdownTop = dropdown.scrollTop;
        const dropdownBottom = dropdownTop + dropdown.clientHeight;
        const optionTop = highlightedOption.offsetTop;
        const optionBottom = optionTop + highlightedOption.offsetHeight;

        if (optionBottom > dropdownBottom) {
          dropdown.scrollTop = optionBottom - dropdown.clientHeight + 8;
        } else if (optionTop < dropdownTop) {
          dropdown.scrollTop = optionTop - 8;
        }
      }
    }
  }, [highlightedIndex, isFocused]);

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const values: string[] = field.value || [];
        const setValue = (newValues: string[]) => {
          form.setFieldValue(name, newValues);
        };

        const filteredOptions = options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase()) &&
            !values.includes(opt.value)
        );

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          switch (e.key) {
            case 'Enter':
              e.preventDefault();
              if (
                highlightedIndex >= 0 &&
                highlightedIndex < filteredOptions.length
              ) {
                const selectedOption = filteredOptions[highlightedIndex];
                if (!values.includes(selectedOption.value)) {
                  setValue([...values, selectedOption.value]);
                  setInputValue('');
                }
              } else if (inputValue.trim()) {
                const trimmed = inputValue.trim();
                if (!values.includes(trimmed)) {
                  setValue([...values, trimmed]);
                  setInputValue('');
                }
              }
              break;
            case 'ArrowDown':
              e.preventDefault();
              setHighlightedIndex((prev) =>
                prev < filteredOptions.length - 1 ? prev + 1 : 0
              );
              break;
            case 'ArrowUp':
              e.preventDefault();
              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredOptions.length - 1
              );
              break;
            case 'Escape':
              setIsFocused(false);
              break;
            case 'Backspace':
              if (inputValue === '' && values.length > 0) {
                setValue(values.slice(0, -1));
              }
              break;
          }
        };

        const handleRemove = (item: string) => {
          setValue(values.filter((v) => v !== item));
        };

        const handleSelect = (option: { label: string; value: string }) => {
          if (!values.includes(option.value)) {
            setValue([...values, option.value]);
            setInputValue('');
          }
        };

        return (
          <div
            className={clsx(
              'grid grid-cols-2 gap-1 items-center w-full',
              className
            )}
          >
            {label && (
              <label className={clsx('text-gray-800 flex gap-1', labelWidth)}>
                <Text
                  variant="grey-500"
                  size="body-sm-mid"
                  className="tracking-wide capitalize"
                >
                  {label}
                </Text>
                {required && <span className="text-red text-sm">*</span>}
              </label>
            )}

            <div className="relative w-full">
              <div className="min-h-[36px] border border-gray-300 rounded-sm px-2 py-1 bg-white text-sm w-full">
                {values.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-1">
                    {values.map((item, index) => {
                      const label =
                        options.find((opt) => opt.value === item)?.label ||
                        item;
                      return (
                        <div
                          key={index}
                          className="flex items-center bg-primary text-white px-2 py-1 rounded-full text-xs"
                        >
                          {label}
                          <button
                            type="button"
                            className="ml-1 text-blue-100 hover:text-red-300"
                            onClick={() => handleRemove(item)}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                <input
                  type="text"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
                  placeholder={placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                />
              </div>

              {isFocused && filteredOptions.length > 0 && (
                <ul
                  ref={dropdownRef}
                  className="absolute z-10 w-full mt-1 bg-white border rounded shadow-md max-h-40 overflow-y-auto"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {filteredOptions.map((option, idx) => (
                    <li
                      key={`${option.value}-${idx}`}
                      ref={setOptionRef(idx)}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      className={clsx(
                        'px-4 py-2 cursor-pointer transition-colors',
                        highlightedIndex === idx
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      )}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        );
      }}
    </Field>
  );
};
