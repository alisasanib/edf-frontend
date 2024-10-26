import { memo } from "react";
import { InputField, SelectField } from "../../../common";
import { SearchOptions } from "../../../types/SearchOptions.dto";
import { Option } from "../../../types/Option.dto";
import styles from "./styles.module.css";

interface SearchInputProps {
  searchTerm: string;
  searchBy: SearchOptions;
  onSearchTermChange: (value: string) => void;
  onSearchByChange: (value: SearchOptions) => void;
  isAutoComplete: boolean;
  options?: Option[];
}

const OPTIONS = [
  { key: "name", value: "Search By Name" },
  { key: "capital", value: "Search By Capital" },
  { key: "region", value: "Search By Region" },
];

const SearchInput: React.FC<SearchInputProps> = memo(
  ({ searchTerm, searchBy, onSearchTermChange, onSearchByChange, isAutoComplete, options }) => {
    return (
      <div className={styles.search_container}>
        <div>
          <InputField
            value={searchTerm}
            onChange={onSearchTermChange}
            placeholder='Search for a country'
            isAutoComplete={isAutoComplete}
            ariaControls='autocomplete-list'
            ariaLabel='Search for a country'
            options={options}
          />
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

SearchInput.displayName = "SearchInput";

export default SearchInput;
