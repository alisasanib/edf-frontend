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

  const onCloseModal = useCallback(() => {
    setDisplayModal(false);
    setSelectedCountry(null);
  }, []);

  const onSearchTermChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const onSearchByChange = useCallback((value: SearchOptions) => {
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
          <div style={{ display: "flex", justifyContent: "center", width: "inherit" }}>
            <CircularLoader />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          visibleCountryList.map((country) => (
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

export default Countries;
