import { useState } from "react";
import styles from "./styles.module.css";
import { Country } from "../../../types/Country.dto";
import InputField from "../../../common/InputField";

interface SearchInputProps {
  searchTerm: string;
  searchBy: "name" | "capital" | "region";
  onSeachTermChange: (value: string) => void;
  onSeachByChange: (value: "name" | "capital" | "region") => void;
  isAutoComplete: boolean;
  handleCountrySelect?: (value: string) => void;
  countries?: Country[];
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

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
          placeholder='Search for a country'
          isAutoComplete={props.isAutoComplete}
          ariaExpanded={isFocused}
          ariaControls='autocomplete-list'
          ariaLabel='Search for a country'
        />
      </div>
    </div>
  );
};

export default SearchInput;
