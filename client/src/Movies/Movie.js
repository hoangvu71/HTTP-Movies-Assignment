import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };
  const handleEdit = (event) => {
    event.preventDefault();
    props.history.push(`/update-movie/${match.params.id}`)
  }
  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
    .then(res => {
      console.log(res);
      props.getMovieList();
      props.history.push('/')
    })
    .catch(err => console.log(err))
  }
  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }


  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleEdit} >Edit Movie</button>
      <button onClick={handleDelete} >Delete Movie</button>
    </div>
  );
}

export default Movie;
