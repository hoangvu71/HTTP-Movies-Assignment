import React, {useState, useEffect} from "react"
import {useParams} from 'react-router-dom'
import axios from "axios";

function UpdateForm(props) {
    const [edit, setEdit] = useState({ isMovie: false, movie: {}})
    const { id } = useParams();
    const movie = props.movieList.find(movie => 
        `${movie.id}` === props.match.params.id);
    
    useEffect(() => {
        if (movie) {
            setEdit({movie: movie, isMovie: true})
        }
    }, [props.movieList])

    if (!props.movieList.length || !movie || !edit.isMovie) {
        return <h2>Loading movie</h2>
    }

    const changeHandler = (event) => {
        if (event.target.name === "stars") {
            setEdit({...edit, movie: {...edit.movie, [event.target.name]: event.target.value.split(",")}})
        } else {
            setEdit({...edit, movie: {...edit.movie, [event.target.name]: event.target.value}})
        }
    }
   
    const handleUpdate = (event) => {
        event.preventDefault();
        console.log("This is when I click on update button", edit.movie)
        axios.put(`http://localhost:5000/api/movies/${id}`, edit.movie)
        .then(res => {
            console.log("This is res", res);
            props.getMovieList();
            props.history.push("/")
    
    })
        .catch(err => console.log(err))
    }
    return(
        <div>
            {console.log(edit)}
            {console.log("This is movie list", props.movieList)}
            <input onChange={changeHandler} name="title" value={edit.movie.title} />
            <input onChange={changeHandler} name="director" value={edit.movie.director} />
            <input onChange={changeHandler} name="metascore" value={edit.movie.metascore} />
            <input onChange={changeHandler} name="stars" value={edit.movie.stars} />
            <button onClick={handleUpdate}>Update</button>
        </div>
    )
}

export default UpdateForm