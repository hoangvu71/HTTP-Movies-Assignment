import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList(props) {
  const addMovie = (event) => {
    event.preventDefault()
    props.history.push('/add-movie')
  }
  return (
    <div className="movie-list">
      <button onClick={addMovie} >Add Movie</button>
      {
        props.movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
