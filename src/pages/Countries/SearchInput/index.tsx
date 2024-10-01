import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Country } from "../../../types/Country.dto";
import InputField from "../../../common/InputField";
import SelectField from "../../../common/SelectField";

interface SearchInputProps {
  searchTerm: string;
  searchBy: "name" | "capital" | "region";
  onSeachTermChange: (value: string) => void;
  onSeachByChange: (value: "name" | "capital" | "region") => void;
  isAutoComplete: boolean;
  handleCountrySelect?: (value: string) => void;
  countries?: Country[];
}

const OPTIONS = [
  { key: "name", value: "Search By Name" },
  { key: "capital", value: "Search By Capital" },
  { key: "region", value: "Search By Region" },
];

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!props.isAutoComplete || !props.countries || props.countries.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prevIndex) => (prevIndex + 1) % (props.countries?.length ?? 0));
        break;
      case "ArrowUp":
        setActiveIndex(
          (prevIndex) => (prevIndex - 1 + (props.countries?.length ?? 0)) % (props.countries?.length ?? 0)
        );
        break;
      case "Enter":
        if (activeIndex >= 0 && activeIndex < props.countries.length) {
          props.handleCountrySelect?.(props.countries[activeIndex].name.official);
        }
        break;
      case "Escape":
        setIsFocused(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < (props.countries?.length ?? 0)) {
      const listItem = document.querySelector(`#autocomplete-item-${activeIndex}`) as HTMLElement;
      listItem?.scrollIntoView?.({ block: "nearest" });
    }
  }, [activeIndex, props.countries]);

  return (
    <div
      className={styles.search_container}
      style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <div style={{ position: "relative" }}>
        <InputField
          value={props.searchTerm}
          onChange={props.onSeachTermChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder='Search for a country'
          isAutoComplete={props.isAutoComplete}
          ariaExpanded={isFocused}
          ariaControls='autocomplete-list'
          ariaLabel='Search for a country'
        />
        {props.isAutoComplete && props.countries && props.countries.length > 0 && !!props.searchTerm && isFocused && (
          <ul
            id='autocomplete-list'
            role='listbox'
            className={styles.autocompleteList}>
            {props.countries.map((country, index) => (
              <li
                id={`autocomplete-item-${index}`}
                role='option'
                key={country.name.official}
                onMouseDown={() => props.handleCountrySelect?.(country.name.official)}
                className={`${styles.autocompleteItem} ${index === activeIndex ? styles.activeItem : ""}`}
                aria-selected={index === activeIndex}
                data-testid='autocomplete-option'>
                {country.name.official}
              </li>
            ))}
          </ul>
        )}
      </div>
      <SelectField
        options={OPTIONS}
        value={props.searchBy}
        onChange={props.onSeachByChange}
      />
    </div>
  );
};

export default SearchInput;
