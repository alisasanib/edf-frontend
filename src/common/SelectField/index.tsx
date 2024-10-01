import React from "react";
import styles from "./styles.module.css";

interface SelectFieldProps {
  value: "name" | "capital" | "region";
  onChange: (value: "name" | "capital" | "region") => void;
  options: {
    key: string;
    value: string;
  }[];
  label?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ value, onChange, options, label }) => {
  return (
    <div>
      <label
        htmlFor='country-search-select'
        className='sr-only'>
        {label}
      </label>
      <select
        id='country-search-select'
        data-testid='select-menu'
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value as "name" | "capital" | "region")}
        aria-label={label}>
        {options.map((option) => (
          <option
            data-testid='select-option'
            className={styles.option}
            key={option.key}
            value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
