import { useState, useEffect, useCallback, useMemo } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import CountryCard from "./CountryCard";
import { Modal, CircularLoader } from "../../common";
import SearchInput from "./SearchInput";
import ModalContent from "./ModalContent";
import { useFetchCountries } from "../../hooks/useFetchCountries";
import { debounced } from "../../utils/debounce";
import { Country } from "../../types/Country.dto";
import { SearchOptions } from "../../types/SearchOptions.dto";
import styles from "./styles.module.css";

const Countries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchBy, setSearchBy] = useState<SearchOptions>("name");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [visibleCountries, setVisibleCountries] = useState<number>(20);

  const { countries, allCountries, fetchAllCountries, fetchCountryByName, loading, error } = useFetchCountries();

  useEffect(() => {
    if (!searchTerm) {
      if (allCountries.length) {
        fetchAllCountries("fields=name,flags,capital");
      } else {
        fetchAllCountries("fields=name,flags,capital");
      }
    } else {
      debounced(() => fetchCountryByName(searchTerm, searchBy));
    }
  }, [searchTerm, searchBy, allCountries, fetchAllCountries, fetchCountryByName]);

  const visibleCountryList = useMemo(() => {
    return countries.slice(0, visibleCountries);
  }, [countries, visibleCountries]);

  const loadMore = useCallback(() => {
    if (visibleCountries < countries.length) {
      setVisibleCountries((prevVisible) => prevVisible + 20);
    }
  }, [countries.length, visibleCountries]);

  useInfiniteScroll(loading, loadMore);

  const handleSelectCountry = useCallback((country: Country) => {
    setSelectedCountry(country);
    setDisplayModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setDisplayModal(false);
    setSelectedCountry(null);
  }, []);

  const handleSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSearchByChange = useCallback((value: SearchOptions) => {
    setSearchBy(value);
    setSearchTerm("");
  }, []);

  return (
    <div className={styles.countries_container}>
      <SearchInput
        searchTerm={searchTerm}
        searchBy={searchBy}
        onSearchTermChange={handleSearchTermChange}
        onSearchByChange={handleSearchByChange}
        isAutoComplete={searchBy === "name"}
        countries={countries}
      />

      <div className={styles.countries_list}>
        {loading ? (
          <div className={styles.countries_loader}>
            <CircularLoader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          visibleCountryList.map((country) => (
            <CountryCard
              key={country.name.official}
              onSelectCountry={handleSelectCountry}
              country={country}
            />
          ))
        )}
      </div>

      {!!selectedCountry && (
        <Modal
          visible={displayModal}
          onBgClick={handleCloseModal}>
          <ModalContent name={selectedCountry?.name?.official} />
        </Modal>
      )}
    </div>
  );
};

export default Countries;
