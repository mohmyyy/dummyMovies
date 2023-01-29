import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/film");
      if (!response.ok) {
        throw new Error("SomeThing went Wrong.....Retrying");
      }
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
    } catch (error) {
      setTimeout(()=>{
        setError(error.message)
      },5000);
    }
    setIsLoading(false);
  };

  const fetchMovieCancelHandler = () => {
    setError(null)
  }
  let content = <p>FOUND NO MOVIES</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
        <button onClick={fetchMovieCancelHandler}>Cancel Button</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;

{/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>FOUND NO MOVIES</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>LOOADING......</p>} */}