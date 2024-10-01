import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ModalContent from ".";
import { useFetchCountries } from "../../../hooks/useFetchCountries";

jest.mock("../../../hooks/useFetchCountries");

describe("ModalContent Component", () => {
  const mockFetchCountryByName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    (useFetchCountries as jest.Mock).mockReturnValue({
      countries: [],
      fetchCountryByName: mockFetchCountryByName,
      loading: true,
      error: null,
    });

    render(<ModalContent name='Germany' />);
    expect(screen.getByTestId("circular-loader")).toBeInTheDocument();
  });

  test("displays error state", () => {
    (useFetchCountries as jest.Mock).mockReturnValue({
      countries: [],
      fetchCountryByName: mockFetchCountryByName,
      loading: false,
      error: "Failed to fetch country data",
    });

    render(<ModalContent name='Germany' />);

    expect(screen.getByText(/error: failed to fetch country data/i)).toBeInTheDocument();
  });

  test("calls fetchCountryByName with the correct name", () => {
    (useFetchCountries as jest.Mock).mockReturnValue({
      countries: [],
      fetchCountryByName: mockFetchCountryByName,
      loading: false,
      error: null,
    });

    render(<ModalContent name='Germany' />);
    expect(mockFetchCountryByName).toHaveBeenCalledWith("Germany");
  });

  test("renders country details when data is fetched", async () => {
    const mockCountry = {
      name: { official: "Germany" },
      flags: { png: "flag-url.png", alt: "Flag of Germany" },
      capital: "Berlin",
      region: "Europe",
      subregion: "Western Europe",
      currencies: { EUR: { name: "Euro", symbol: "€" } },
      languages: { de: "German" },
    };

    (useFetchCountries as jest.Mock).mockReturnValue({
      countries: [mockCountry],
      fetchCountryByName: mockFetchCountryByName,
      loading: false,
      error: null,
    });

    render(<ModalContent name='Germany' />);

    expect(await screen.findByText(/germany/i)).toBeInTheDocument();
    expect(screen.getByText(/berlin/i)).toBeInTheDocument();
    expect(screen.getByText(/western europe/i)).toBeInTheDocument();
    expect(screen.getByText(/Languages: german/i)).toBeInTheDocument();
    expect(screen.getByAltText(/flag of germany/i)).toBeInTheDocument();
  });

  test("returns null if no countries are fetched", () => {
    (useFetchCountries as jest.Mock).mockReturnValue({
      countries: [],
      fetchCountryByName: mockFetchCountryByName,
      loading: false,
      error: null,
    });

    const { container } = render(<ModalContent name='Germany' />);
    expect(container.firstChild).toBeNull();
  });
});
