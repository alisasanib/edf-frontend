import { useTheme } from "../../hooks/useTheme";
import SunIcon from "../../assets/icons/light-mode-svgrepo-com.svg";
import MoonIcon from "../../assets/icons/moon-dark-theme-svgrepo-com.svg";

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      style={{
        marginLeft: "2rem",
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
      }}
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      {isDarkMode ? (
        <img
          width={25}
          src={SunIcon}
          alt='Switch to light mode'
        />
      ) : (
        <img
          width={25}
          src={MoonIcon}
          alt='Switch to dark mode'
        />
      )}
    </button>
  );
};

export default ThemeToggleButton;
