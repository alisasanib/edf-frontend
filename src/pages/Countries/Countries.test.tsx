import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import Countries from ".";
import { useFetchCountries } from "../../hooks/useFetchCountries";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import React from "react";
import { renderWithTheme } from "../../utils/testUtils";

jest.mock("../../hooks/useFetchCountries");
jest.mock("../../hooks/useInfiniteScroll");

const mockUseFetchCountries = useFetchCountries as jest.Mock;
const mockUseInfiniteScroll = useInfiniteScroll as jest.Mock;

describe("<Countries />", () => {
  beforeEach(() => {
    mockUseFetchCountries.mockReturnValue({
      countries: [],
      allCountries: [],
      fetchAllCountries: jest.fn(),
      fetchCountryByName: jest.fn(),
      loading: false,
      error: null,
    });
    mockUseInfiniteScroll.mockImplementation(() => {});
  });

  test("renders the SearchInput component with default values", () => {
    renderWithTheme(<Countries />);

    const searchInput = screen.getByText("Search By Name");
    expect(searchInput).toBeInTheDocument();
  });

  test("shows a loading indicator when loading is true", () => {
    mockUseFetchCountries.mockReturnValueOnce({
      countries: [],
      allCountries: [],
      fetchAllCountries: jest.fn(),
      fetchCountryByName: jest.fn(),
      loading: true,
      error: null,
    });

    renderWithTheme(<Countries />);
    expect(screen.getByTestId("circular-loader")).toBeInTheDocument();
  });

  test("displays an error message when there is an error", () => {
    mockUseFetchCountries.mockReturnValueOnce({
      countries: [],
      allCountries: [],
      fetchAllCountries: jest.fn(),
      fetchCountryByName: jest.fn(),
      loading: false,
      error: "Failed to fetch data",
    });

    renderWithTheme(<Countries />);

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  test("renders country cards when countries are available", () => {
    mockUseFetchCountries.mockReturnValueOnce({
      countries: [
        { name: { official: "Country 1" }, flags: { png: "flag1.png" }, capital: "Capital 1" },
        { name: { official: "Country 2" }, flags: { png: "flag2.png" }, capital: "Capital 2" },
      ],
      allCountries: [],
      fetchAllCountries: jest.fn(),
      fetchCountryByName: jest.fn(),
      loading: false,
      error: null,
    });

    renderWithTheme(<Countries />);

    expect(screen.getByText("Country 1")).toBeInTheDocument();

    expect(screen.getByText("Country 2")).toBeInTheDocument();
  });

  test("loads more countries when scrolling", () => {
    const mockSetVisibleCountries = jest.fn();
    jest.spyOn(React, "useState").mockReturnValue([40, mockSetVisibleCountries]);

    renderWithTheme(<Countries />);

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    waitFor(() => {
      expect(mockSetVisibleCountries).toHaveBeenCalled();
    });
  });

  test("opens and closes the modal on country selection", () => {
    mockUseFetchCountries.mockReturnValueOnce({
      countries: [{ name: { official: "Country 1" }, flags: { png: "flag1.png" }, capital: "Capital 1" }],
      allCountries: [],
      fetchAllCountries: jest.fn(),
      fetchCountryByName: jest.fn(),
      loading: false,
      error: null,
    });

    renderWithTheme(<Countries />);

    const countryCard = screen.getByText("Country 1");
    fireEvent.click(countryCard);
    expect(screen.getByText("Country 1")).toBeInTheDocument();
    const closeModal = screen.getByTestId("close-model");
    fireEvent.click(closeModal);

    waitFor(() => {
      expect(screen.queryByText("Country 1")).not.toBeInTheDocument();
    });
  });
});
