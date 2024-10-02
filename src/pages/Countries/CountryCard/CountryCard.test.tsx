import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from ".";
import "@testing-library/jest-dom";

const mockProps = {
  country: {
    name: { official: "Canada" },
    capital: "Ottawa",
    flag: "🇨🇦",
    flags: {
      png: "https://flagcdn.com/w320/ca.png",
      alt: "Flag of Canada",
    },
  },
  onSelectCountry: jest.fn(),
};

describe("<CountryCard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders country details correctly", () => {
    render(<CountryCard {...mockProps} />);

    expect(screen.getByText(/canada/i)).toBeInTheDocument();
    expect(screen.getByText("Capital: Ottawa")).toBeInTheDocument();
    const flagImg = screen.getByAltText("Flag of Canada");
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute("src", mockProps.country.flags.png);
  });

  test("handles click events", () => {
    render(<CountryCard {...mockProps} />);
    const card = screen.getByRole("button");
    fireEvent.click(card);

    expect(mockProps.onSelectCountry).toHaveBeenCalledTimes(1);
    expect(mockProps.onSelectCountry).toHaveBeenCalledWith(mockProps.country);
  });

  test("handles 'Enter' key press events", () => {
    render(<CountryCard {...mockProps} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });

    expect(mockProps.onSelectCountry).toHaveBeenCalledTimes(1);
    expect(mockProps.onSelectCountry).toHaveBeenCalledWith(mockProps.country);
  });

  test("handles 'Space' key press events", () => {
    render(<CountryCard {...mockProps} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: " " });

    expect(mockProps.onSelectCountry).toHaveBeenCalledTimes(1);
    expect(mockProps.onSelectCountry).toHaveBeenCalledWith(mockProps.country);
  });

  test("does not call onSelectCountry on non-Enter or non-Space keys", () => {
    render(<CountryCard {...mockProps} />);

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Tab" });
    expect(mockProps.onSelectCountry).not.toHaveBeenCalled();
  });
});
