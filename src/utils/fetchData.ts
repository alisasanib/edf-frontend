export const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("No results were found. Please update the your search.");
      } else {
        throw new Error("Failed to fetch data.");
      }
    }
    return await res.json();
  };
  