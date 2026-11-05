import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  _id: string;
  description: string;
  completed: boolean;
}

interface Movie {
  _id: string;
  title: string;
  year: number;
  imdb: {
    rating: number;
  };
  countries: string[];
}

function Application() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [country, setCountry] = useState("");

  async function loadMovies() {
    const res = await fetch("/api/movies?country=" + country);
    setMovies(await res.json());
  }

  useEffect(() => {
    loadMovies();
  }, [country]);

  return (
    <>
      <h1>Movies</h1>

      <h2>List movies</h2>

      <div>
        Country:
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>

      {movies.map((m) => (
        <li key={m._id}>
          {m.title} ({m.year}) Rating: {m.imdb.rating}
          <ul>
            <li>Countries: {m.countries.join(", ")}</li>
          </ul>
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
