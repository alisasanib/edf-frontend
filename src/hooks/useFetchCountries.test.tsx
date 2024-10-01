import { render, act, waitFor } from "@testing-library/react";
import { useFetchCountries } from "./useFetchCountries";
import { fetchData } from "../utils/fetchData";
import { Country } from "../types/Country.dto";
import { API_URL } from "../config";

jest.mock("../utils/fetchData");
const mockFetchData = fetchData as jest.MockedFunction<typeof fetchData>;

interface HookWrapperProps {
  callback: () => void;
}

const HookWrapper: React.FC<HookWrapperProps> = ({ callback }) => {
  callback();
  return null;
};

describe("useFetchCountries hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches a single country by name successfully", async () => {
    const mockCountryData: Country[] = [
      {
        name: { official: "France" },
        flags: { png: "flag-url" },
        capital: ["Paris"],
      },
    ];
    mockFetchData.mockResolvedValueOnce(mockCountryData);
    let result: ReturnType<typeof useFetchCountries> | undefined;

    render(
      <HookWrapper
        callback={() => {
          result = useFetchCountries();
        }}
      />
    );

    act(() => {
      result?.fetchCountryByName("France");
    });

    expect(result?.loading).toBe(true);

    await waitFor(() => expect(result?.loading).toBe(false));

    expect(result?.countries).toEqual(mockCountryData);
    expect(result?.error).toBeNull();

    expect(mockFetchData).toHaveBeenCalledWith(`${API_URL}/name/France`);
  });

  test("handles error when fetching a single country", async () => {
    mockFetchData.mockRejectedValueOnce(new Error("Network Error"));

    let result: ReturnType<typeof useFetchCountries> | undefined;

    render(
      <HookWrapper
        callback={() => {
          result = useFetchCountries();
        }}
      />
    );

    act(() => {
      result?.fetchCountryByName("InvalidCountry");
    });

    await waitFor(() => expect(result?.loading).toBe(false));
    expect(result?.countries).toEqual([]);
    expect(result?.error).toBe("Network Error");
  });

  test("fetches all countries successfully", async () => {
    const mockAllCountriesData: Country[] = [
      { name: { official: "Germany" }, flags: { png: "flag-url" }, capital: ["Berlin"] },
      { name: { official: "Canada" }, flags: { png: "flag-url" }, capital: ["Ottawa"] },
    ];

    mockFetchData.mockResolvedValueOnce(mockAllCountriesData);

    let result: ReturnType<typeof useFetchCountries> | undefined;
    render(
      <HookWrapper
        callback={() => {
          result = useFetchCountries();
        }}
      />
    );

    act(() => {
      result?.fetchAllCountries("");
    });

    expect(result?.loading).toBe(true);

    await waitFor(() => expect(result?.loading).toBe(false));

    expect(result?.countries).toEqual(mockAllCountriesData);
    expect(result?.allCountries).toEqual(mockAllCountriesData);
    expect(result?.error).toBeNull();
    expect(mockFetchData).toHaveBeenCalledWith(`${API_URL}/all?`);
  });

  test("returns cached countries if already available", async () => {
    const mockAllCountriesData: Country[] = [
      { name: { official: "Germany" }, flags: { png: "flag-url" }, capital: ["Berlin"] },
      { name: { official: "Canada" }, flags: { png: "flag-url" }, capital: ["Ottawa"] },
    ];

    mockFetchData.mockResolvedValueOnce(mockAllCountriesData);

    let result: ReturnType<typeof useFetchCountries> | undefined;

    render(
      <HookWrapper
        callback={() => {
          result = useFetchCountries();
        }}
      />
    );

    act(() => {
      result?.fetchAllCountries("");
    });

    await waitFor(() => expect(result?.loading).toBe(false));
    act(() => {
      result?.fetchAllCountries("");
    });
    expect(mockFetchData).toHaveBeenCalledTimes(1);
    expect(result?.countries).toEqual(mockAllCountriesData);
  });
});
