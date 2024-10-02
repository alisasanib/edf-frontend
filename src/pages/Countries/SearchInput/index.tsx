import { useState, useEffect, useCallback, memo } from "react";
import { InputField, SelectField } from "../../../common";
import { Country } from "../../../types/Country.dto";
import { SearchOptions } from "../../../types/SearchOptions.dto";
import styles from "./styles.module.css";

interface SearchInputProps {
  searchTerm: string;
  searchBy: SearchOptions;
  onSearchTermChange: (value: string) => void;
  onSearchByChange: (value: SearchOptions) => void;
  isAutoComplete: boolean;
  countries?: Country[];
}

const OPTIONS = [
  { key: "name", value: "Search By Name" },
  { key: "capital", value: "Search By Capital" },
  { key: "region", value: "Search By Region" },
];

const SearchInput: React.FC<SearchInputProps> = memo(
  ({ searchTerm, searchBy, onSearchTermChange, onSearchByChange, isAutoComplete, countries }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isAutoComplete || !countries || countries.length === 0) return;

        switch (e.key) {
          case "ArrowDown":
            setActiveIndex((prevIndex) => (prevIndex + 1) % (countries?.length ?? 0));
            break;
          case "ArrowUp":
            setActiveIndex((prevIndex) => (prevIndex - 1 + (countries?.length ?? 0)) % (countries?.length ?? 0));
            break;
          case "Enter":
            if (activeIndex >= 0 && activeIndex < countries.length) {
              onSearchTermChange?.(countries[activeIndex].name.official);
            }
            break;
          case "Escape":
            setIsFocused(false);
            break;
          default:
            break;
        }
      },
      [activeIndex, countries, isAutoComplete, onSearchTermChange]
    );

    const handleFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
    }, []);

    useEffect(() => {
      if (activeIndex >= 0 && activeIndex < (countries?.length ?? 0)) {
        const listItem = document.querySelector(`#autocomplete-item-${activeIndex}`) as HTMLElement;
        listItem?.scrollIntoView?.({ block: "nearest" });
      }
    }, [activeIndex, countries]);

    return (
      <div className={styles.search_container}>
        <div style={{ position: "relative" }}>
          <InputField
            value={searchTerm}
            onChange={onSearchTermChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder='Search for a country'
            isAutoComplete={isAutoComplete}
            ariaExpanded={isFocused}
            ariaControls='autocomplete-list'
            ariaLabel='Search for a country'
          />
          {isAutoComplete && countries && countries.length > 0 && !!searchTerm && isFocused && (
            <ul
              id='autocomplete-list'
              role='listbox'
              className={styles.autocompleteList}>
              {countries.map((country, index) => (
                <li
                  id={`autocomplete-item-${index}`}
                  role='option'
                  key={country.name.official}
                  onMouseDown={() => onSearchTermChange?.(country.name.official)}
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
          value={searchBy}
          onChange={onSearchByChange}
        />
      </div>
    );
  }
);

export default SearchInput;
