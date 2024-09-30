import { useState, useEffect, useCallback } from "react";
import CountryCard from "./CountryCard";
import Modal from "../../common/Modal";
import SearchInput from "./SearchInput";
import ModalContent from "./ModalContent";
import { useFetchCountries } from "../../hooks/useFetchCountries";
import { debounced } from "../../utils/debounce";
import { Country } from "../../types/Country.dto";
import styles from "./styles.module.css";


const SearchCountries = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchBy, setSearchBy] = useState<"name" | "capital" | "region">("name");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  const { countries, allCountries, fetchAllCountries, fetchCountryByName, loading, error } = useFetchCountries();

  useEffect(() => {
    if (!searchTerm) {
      if (allCountries.length) {
        fetchAllCountries("fields=name,flags,capital"); // If needed to ensure data consistency
      } else {
        fetchAllCountries("fields=name,flags,capital");
      }
    } else {
      debounced(() => fetchCountryByName(searchTerm, searchBy));
    }
  }, [searchTerm, searchBy, allCountries, fetchAllCountries, fetchCountryByName]);


  const handleSelectCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setDisplayModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setDisplayModal(false);
    setSelectedCountry(null);
  }, []);

  const onSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const onSearchByChange = useCallback((value: "name" | "capital" | "region") => {
    setSearchBy(value);
    setSearchTerm("");
  }, []);

  const handleCountrySelect = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);
  return (
    <div
      style={{
        margin: "2rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
      }}>
      <SearchInput
        searchTerm={searchTerm}
        searchBy={searchBy}
        onSeachTermChange={onSearchTermChange}
        onSeachByChange={onSearchByChange}
        isAutoComplete={searchBy === "name"}
        countries={countries}
        handleCountrySelect={handleCountrySelect}
      />

      <div className={styles.Countries_container}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          countries.map((country) => (
            <CountryCard
              key={country.name.official}
              handleSelectCountry={handleSelectCountry}
              country={country}
            />
          ))
        )}
      </div>

      {!!selectedCountry && (
        <Modal
          visible={displayModal}
          onBgClick={onCloseModal}>
          <ModalContent name={selectedCountry?.name?.official} />
        </Modal>
      )}
    </div>
  );
};

export default SearchCountries;
