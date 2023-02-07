import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import NewMovies from "./components/NewMovies/NewMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addMovie, setAddMovie] = useState(false);

  const makeItAvailableHandler = () => {
    setAddMovie(!addMovie);
  };

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://be-gin-2f479-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("SomeThing went Wrong.....Retrying");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://be-gin-2f479-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const deleteMovieHandler = async (id) => {
    // console.log(id);
    // console.log(movies);
    const response = await fetch(
      `https://be-gin-2f479-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
        Headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.ok){
      const filteredMovies = movies.filter((item) => item.id !== id);
      setMovies(()=>filteredMovies);
    }
  };

    useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler,]);

  let content = <p>FOUND NO MOVIES</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} onDel={deleteMovieHandler} />;
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
        {!addMovie && (
          <button onClick={makeItAvailableHandler}>Add New Movie</button>
        )}
        {addMovie && (
          <NewMovies
            onClick={makeItAvailableHandler}
            onAddMovie={addMovieHandler}
          />
        )}
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;

// {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && !error && <p>FOUND NO MOVIES</p>}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p>LOOADING......</p>} */}
