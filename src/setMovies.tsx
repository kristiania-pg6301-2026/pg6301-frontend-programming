import React, { useEffect, useState } from "react";

interface MovieListing {
  _id: string;
  title: string;
  plot: string;
  year: number;
}

export function MovieApplication() {
  const [movies, setMovies] = useState<MovieListing[]>([]);

  async function loadMovies() {
    const res = await fetch("/api/movies");
    setMovies(await res.json());
  }

  useEffect(() => {
    loadMovies();
  }, []);
  return (
    <>
      <h1>Movies</h1>

      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            {m.title} ({m.year})
          </li>
        ))}
      </ul>
    </>
  );
}
