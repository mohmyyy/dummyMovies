import React from "react";
import { useState } from "react";
import classes from "./NewMovies.module.css";
const NewMovies = () => {
  const [value, setValue] = useState({
    title: "",
    releaseDate: "",
    openingText: "",
  });
  const titleChangeHandler = (event) => {
    setValue({ ...value, title: event.target.value });
  };
  const textChangeHandler = (event) => {
    setValue({ ...value, openingText: event.target.value });
  };
  const dateChangeHandler = (event) => {
    setValue({ ...value, releaseDate: event.target.value });
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(value);
    setValue({
      title: "",
      releaseDate: "",
      openingText: "",
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes["new-movies"]}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={titleChangeHandler}
            type="text"
            placeholder="Movie title"
            id="title"
            value={value.title}
          />
        </div>
        <div>
          <label htmlFor="text">Opening Text</label>
          <input
            onChange={textChangeHandler}
            placeholder="Opening Text"
            type="text"
            id="text"
            value={value.openingText}
          />
        </div>
        <div>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            onChange={dateChangeHandler}
            type="date"
            id="releaseDate"
            value={value.releaseDate}
          />
        </div>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default React.memo(NewMovies);
