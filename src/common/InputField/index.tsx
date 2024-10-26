import React, { useCallback, useEffect, useState } from "react";
import { Option } from "../../types/Option.dto";
import styles from "./styles.module.css";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isAutoComplete: boolean;
  ariaControls: string;
  ariaLabel: string;
  errorMessage?: string;
  options?: Option[];
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ value, onChange, placeholder, isAutoComplete, ariaControls, ariaLabel, errorMessage, options }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isAutoComplete || !options || options.length === 0) return;

        switch (e.key) {
          case "ArrowDown":
            setActiveIndex((prevIndex) => (prevIndex + 1) % (options?.length ?? 0));
            break;
          case "ArrowUp":
            setActiveIndex((prevIndex) => (prevIndex - 1 + (options?.length ?? 0)) % (options?.length ?? 0));
            break;
          case "Enter":
            if (activeIndex >= 0 && activeIndex < options.length) {
              onChange?.(options[activeIndex].label);
            }
            break;
          case "Escape":
            setIsFocused(false);
            break;
          default:
            break;
        }
      },
      [activeIndex, options, isAutoComplete, onChange]
    );

    useEffect(() => {
      if (activeIndex >= 0 && activeIndex < (options?.length ?? 0)) {
        const listItem = document.querySelector(`#autocomplete-item-${activeIndex}`) as HTMLElement;
        listItem?.scrollIntoView?.({ block: "nearest" });
      }
    }, [activeIndex, options]);
    return (
      <div style={{ position: "relative" }}>
        <input
          role='combobox'
          className={styles.input}
          id='country-search'
          type='text'
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-expanded={isFocused}
          aria-controls={ariaControls}
          autoComplete={isAutoComplete ? "off" : ""}
          aria-invalid={!!errorMessage}
        />
        {isAutoComplete && options && options.length > 0 && !!value && isFocused && (
          <ul
            id='autocomplete-list'
            role='listbox'
            className={styles.autocompleteList}>
            {options.map((option: any, index: number) => (
              <li
                id={`autocomplete-item-${index}`}
                role='option'
                key={option.id}
                onMouseDown={() => onChange?.(option.label)}
                className={`${styles.autocompleteItem} ${index === activeIndex ? styles.activeItem : ""}`}
                aria-selected={index === activeIndex}
                data-testid='autocomplete-option'>
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {errorMessage && (
          <span
            role='alert'
            className={styles.errorMessage}>
            {errorMessage}
          </span>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
