import { useEffect } from "react";
import { useFetchCountries } from "../../../hooks/useFetchCountries";

interface ModalContentProps {
  name: string;
}

const ModalContent = ({ name }: ModalContentProps) => {
  const { countries, fetchCountryByName, loading, error } = useFetchCountries();

  useEffect(() => {
    fetchCountryByName(name);
  }, [name, fetchCountryByName]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!countries.length) return null;

  const country = countries[0];

  return (
    <div style={{ display: "flex", gap: 25 }}>
      <div style={{ borderRadius: "inherit" }}>
        <img
          style={{ width: "250px", height: "auto", borderRadius: "inherit" }}
          src={country.flags?.png}
          alt={country.flags?.alt}
        />
      </div>
      <div>
        <h4>{country.name.official}</h4>
        <p>Capital: {country.capital}</p>
        <p>Region: {country.region}</p>
        <p>Sub-region: {country.subregion}</p>
        <p>
          Currencies:{" "}
          {country.currencies &&
            Object.keys(country.currencies).map(
              (key) => `${country.currencies?.[key].name}(${country.currencies?.[key].symbol})`
            )}
        </p>
        <p>
          Languages:{" "}
          {country.languages &&
            Object.keys(country.languages)
              .map((key) => country.languages?.[key])
              .join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ModalContent;
