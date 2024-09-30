import ThemeToggleButton from "../ThemeToggleButton";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.Header_container}>
      <ThemeToggleButton />
    </div>
  );
};

export default Header;
