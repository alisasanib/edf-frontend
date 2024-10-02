import { useEffect, memo } from "react";
import { useFetchCountries } from "../../../hooks/useFetchCountries";
import { CircularLoader } from "../../../common";
import styles from "./styles.module.css";

interface ModalContentProps {
  name: string;
}

const ModalContent: React.FC<ModalContentProps> = memo(({ name }) => {
  const { countries, fetchCountryByName, loading, error } = useFetchCountries();

  useEffect(() => {
    fetchCountryByName(name);
  }, [name, fetchCountryByName]);

  if (loading) return <CircularLoader />;
  if (error) return <div>Error: {error}</div>;
  if (!countries.length) return null;

  const country = countries[0];

  return (
    <div className={styles.modal_content_container}>
      <div className={styles.country_imageWrapper}>
        <img
          className={styles.country_image}
          src={country.flags?.png}
          alt={country.flags?.alt}
        />
      </div>
      <div className={styles.country_details}>
        <h4 className={styles.country_name}>{country.name.official}</h4>
        <p className={styles.country_info}>Capital: {country.capital}</p>
        <p className={styles.country_info}>Region: {country.region}</p>
        <p className={styles.country_info}>Sub-region: {country.subregion}</p>
        <p className={styles.country_info}>
          Currencies:{" "}
          {country.currencies &&
            Object.keys(country.currencies).map(
              (key) => `${country.currencies?.[key].name}(${country.currencies?.[key].symbol})`
            )}
        </p>
        <p className={styles.country_info}>
          Languages:{" "}
          {country.languages &&
            Object.keys(country.languages)
              .map((key) => country.languages?.[key])
              .join(", ")}
        </p>
      </div>
    </div>
  );
});

ModalContent.displayName = "ModalContent";

export default ModalContent;
