import React from "react";
import styles from "./styles.module.css";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  isAutoComplete: boolean;
  ariaExpanded: boolean;
  ariaControls: string;
  ariaLabel: string;
  errorMessage?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      isAutoComplete,
      ariaExpanded,
      ariaControls,
      ariaLabel,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div>
        <input
          role='combobox'
          className={styles.input}
          id='country-search'
          type='text'
          ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-expanded={ariaExpanded}
          aria-controls={ariaControls}
          autoComplete={isAutoComplete ? "off" : ""}
          aria-invalid={!!errorMessage}
        />
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
