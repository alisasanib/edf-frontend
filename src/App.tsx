/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

function App() {
  const [results, setResults] = useState<any>([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <h2>Country search</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        style={{
          padding: "8px",
          border: "1px solid black",
        }}
      />
      <div
        onClick={() => {
          fetch(`https://restcountries.com/v3.1/name/${search}`)
            .then((res) => res.json())
            .then((data) => setResults(data));
        }}
        style={{
          display: "inline-block",
          padding: "8px",
          margin: "8px",
          border: "1px solid black",
          cursor: "pointer",
        }}
      >
        Search
      </div>

      <div>
        {results.map((x: any) => {
          return (
            <div>
              {x.flag} {x.name.official}
              <br />
              Capital: {x.capital}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
