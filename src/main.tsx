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
}

function Application() {
  const [movies, setMovies] = useState<Movie[]>([]);

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

      <h2>List movies</h2>
      {movies.map((t) => (
        <li key={t._id}>
          <label>{t.title}</label>
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
