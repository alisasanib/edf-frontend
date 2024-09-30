import { Country } from "../../../types/Country.dto";
import styles from "./styles.module.css";

interface CountryCardProps {
  country: Country;
}

const CountryCard = (props: CountryCardProps) => {
  return (
    <div
      role='button'
      tabIndex={0}
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
