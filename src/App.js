import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const fetchMovieHandler = async () => {
    setIsLoading(true)
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false)
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>LOOADING</p>}
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
