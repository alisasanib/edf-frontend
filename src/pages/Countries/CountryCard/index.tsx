import { Country } from "../../../types/Country.dto";
import styles from "./styles.module.css";
import { KeyboardEvent } from "react";

interface CountryCardProps {
  country: Country;
  handleSelectCountry: (country: Country) => void;
}

const CountryCard = (props: CountryCardProps) => {
  const handleInteraction = () => {
    props.handleSelectCountry(props.country);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleInteraction();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={handleInteraction}
      onKeyDown={handleKeyPress}
      className={styles.Country_card}>
      <div style={{ borderRadius: "inherit" }}>
        <img
          style={{ width: "100%", height: "12rem", borderRadius: "inherit" }}
          src={props.country.flags?.png}
          alt={props.country.flags?.alt}
        />
      </div>
      <div style={{ margin: "1rem" }}>
        <h4 style={{ padding: "0.5rem" }}>
          {props.country.flag} {props.country.name.official}
        </h4>
        <p>Capital: {props.country.capital}</p>
      </div>
    </div>
  );
};

export default CountryCard;
