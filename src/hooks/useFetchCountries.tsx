import { useState, useCallback } from "react";
import { Country } from "../types/Country.dto";
import { fetchData } from "../utils/fetchData";
import { API_URL } from "../config";

export const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  const fetchCountryByName = useCallback(async (name: string, searchBy = "name", fields = "") => {
    if (!name) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`${API_URL}/${searchBy}/${name}${fields ? `?${fields}` : ""}`);
      setCountries(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllCountries = useCallback(
    async (fields: string) => {
      setError(null);
      if (allCountries.length) {
        setCountries(allCountries);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchData(`${API_URL}/all?${fields}`);
        setCountries(data);
        setAllCountries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong.");
        } else {
          setError("Something went wrong.");
        }
        setCountries([]);
      } finally {
        setLoading(false);
      }
    },
    [allCountries]
  );

  return {
    countries,
    allCountries,
    fetchCountryByName,
    fetchAllCountries,
    loading,
    error,
  };
};
