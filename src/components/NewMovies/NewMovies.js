import React from "react";
import { useState } from "react";
import classes from "./NewMovies.module.css";
const NewMovies = (props) => {
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
    props.onAddMovie(value)
    setValue({
      title: "",
      releaseDate: "",
      openingText: "",
    });
  };
  return (
    <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input
            onChange={titleChangeHandler}
            type="text"
            placeholder="Movie title"
            id="title"
            value={value.title}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="text">Opening Text</label>
          <textarea
            onChange={textChangeHandler}
            placeholder="Opening Text"
            id="text"
            rows="5"
            value={value.openingText}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="releaseDate">Release Date</label>
          <input
            onChange={dateChangeHandler}
            type="date"
            id="releaseDate"
            value={value.releaseDate}
          />
        </div>
      <button style={{margin:"20px"}} type="submit">Add Movie</button>
      <button onClick={props.onClick} type="click">Close</button>
    </form>
  );
};

export default React.memo(NewMovies);
