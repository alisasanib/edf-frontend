import { render, screen, act, waitFor } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "../hooks/useTheme";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove("dark-mode", "light-mode");
  });

  const TestComponent = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    return (
      <div>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <span>Current Theme: {isDarkMode ? "Dark" : "Light"}</span>
      </div>
    );
  };

  const renderWithThemeProvider = () =>
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

  test("renders light mode by default", () => {
    renderWithThemeProvider();
    expect(screen.getByText(/Current Theme: Light/i)).toBeInTheDocument();
    expect(document.body.classList.contains("light-mode")).toBe(true);
  });

  test("toggles to dark mode and updates localStorage", async () => {
    renderWithThemeProvider();
    const button = screen.getByRole("button", { name: /toggle theme/i });
    act(() => {
      userEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText(/Current Theme: Dark/i)).toBeInTheDocument();
    });

    expect(document.body.classList.contains("dark-mode")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  test("loads theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    renderWithThemeProvider();

    expect(screen.getByText(/Current Theme: Dark/i)).toBeInTheDocument();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  });

  test("loads theme based on system preference when no localStorage", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    renderWithThemeProvider();

    expect(screen.getByText(/Current Theme: Dark/i)).toBeInTheDocument();
    expect(document.body.classList.contains("dark-mode")).toBe(true);
  });

  test("throws error if useTheme is used outside of ThemeProvider", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const BrokenComponent = () => {
      useTheme();
      return null;
    };
    expect(() => render(<BrokenComponent />)).toThrow("useTheme must be used within a ThemeProvider");
    consoleErrorSpy.mockRestore();
  });
});
