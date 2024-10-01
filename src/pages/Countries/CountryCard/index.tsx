import { KeyboardEvent } from "react";
import { Country } from "../../../types/Country.dto";
import styles from "./styles.module.css";

interface CountryCardProps {
  country: Country;
  handleSelectCountry: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = (props) => {
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
      <div className={styles.Country_imageWrapper}>
        <img
          className={styles.Country_image}
          src={props.country.flags?.png}
          alt={props.country.flags?.alt}
        />
      </div>
      <div className={styles.Country_details}>
        <h4 className={styles.Country_name}>
          {props.country.flag} {props.country.name.official}
        </h4>
        <p className={styles.Country_capital}>
          Capital: {props.country.capital}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
