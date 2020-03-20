import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateForm from "./Movies/UpdateForm"
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie"
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  
  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={props => (
        <MovieList movies={movieList} {...props} />
      )}>
      </Route>

      <Route path="/movies/:id" render={props => (
        <Movie getMovieList={getMovieList} addToSavedList={addToSavedList} {...props}/>
      )}>
      </Route>
      
      <Route path="/update-movie/:id" render={props => (
        <UpdateForm movieList={movieList} getMovieList={getMovieList} {...props}/>
      )}/>
      <Route exact path="/add-movie" render={props => (
        <AddMovie {...props} getMovieList={getMovieList} />
      )}
      />
    </>
  );
};

export default App;
