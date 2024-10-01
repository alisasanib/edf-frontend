import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from ".";
import { Country } from "../../../types/Country.dto";
import "@testing-library/jest-dom";

const mockCountries: Country[] = [
  {
    name: { official: "Germany" },
    flags: { png: "", alt: "" },
    capital: "",
    region: "",
    subregion: "",
    currencies: {},
    languages: {},
  },
  {
    name: { official: "France" },
    flags: { png: "", alt: "" },
    capital: "",
    region: "",
    subregion: "",
    currencies: {},
    languages: {},
  },
  {
    name: { official: "Italy" },
    flags: { png: "", alt: "" },
    capital: "",
    region: "",
    subregion: "",
    currencies: {},
    languages: {},
  },
];

describe("<SearchInput />", () => {
  const mockOnSearchTermChange = jest.fn();
  const mockOnSearchByChange = jest.fn();
  const mockHandleCountrySelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and select elements", () => {
    render(
      <SearchInput
        searchTerm=''
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={false}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    const select = screen.getByTestId("select-menu");

    expect(input).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test("calls onSeachTermChange when typing in the input", () => {
    render(
      <SearchInput
        searchTerm=''
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={false}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);

    fireEvent.change(input, { target: { value: "Germany" } });

    expect(mockOnSearchTermChange).toHaveBeenCalledWith("Germany");
  });

  test("calls onSeachByChange when changing the select option", () => {
    render(
      <SearchInput
        searchTerm=''
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={false}
      />
    );

    const select = screen.getByTestId("select-menu");

    fireEvent.change(select, { target: { value: "capital" } });

    expect(mockOnSearchByChange).toHaveBeenCalledWith("capital");
  });

  test("renders autocomplete list when focused and countries exist", () => {
    render(
      <SearchInput
        searchTerm='Ger'
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={true}
        countries={mockCountries}
        handleCountrySelect={mockHandleCountrySelect}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.focus(input);

    const autocompleteItems = screen.getAllByTestId("select-option");
    expect(autocompleteItems.length).toBe(3);
  });

  test("does not render autocomplete when searchTerm is empty", () => {
    render(
      <SearchInput
        searchTerm=''
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={true}
        countries={mockCountries}
        handleCountrySelect={mockHandleCountrySelect}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.focus(input);

    expect(screen.queryByTestId("autocomplete-option")).toBeNull();
  });

  test("handles keyboard navigation and selection in autocomplete", () => {
    render(
      <SearchInput
        searchTerm='Ger'
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={true}
        countries={mockCountries}
        handleCountrySelect={mockHandleCountrySelect}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.focus(input);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });

    const activeItem = screen.getByText("France");
    expect(activeItem).toHaveClass("activeItem");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockHandleCountrySelect).toHaveBeenCalledWith("France");
  });

  test("closes autocomplete on blur", () => {
    render(
      <SearchInput
        searchTerm='Ger'
        searchBy='name'
        onSeachTermChange={mockOnSearchTermChange}
        onSeachByChange={mockOnSearchByChange}
        isAutoComplete={true}
        countries={mockCountries}
        handleCountrySelect={mockHandleCountrySelect}
      />
    );

    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(screen.queryByRole("listbox")).toBeNull();
  });
});
