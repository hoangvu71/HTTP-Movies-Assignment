import React, { useState } from "react"
import axios from "axios"

function AddMovie(props) {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const changeHandler = (event) => {
        console.log(movie)
        if (event.target.name === "stars") {
            setMovie({ ...movie, [event.target.name]: event.target.value.split(",") })
        } else {
            setMovie({ ...movie, [event.target.name]: event.target.value })
        }
    }
    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                console.log(res);
                props.getMovieList();
                props.history.push("/")
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input onChange={changeHandler} name="title" placeholder="title" />
                <input onChange={changeHandler} name="director" placeholder="director" />
                <input onChange={changeHandler} name="metascore" placeholder="metascore" />
                <input onChange={changeHandler} name="stars" placeholder="stars" />
                <button>Submit</button>
            </form>
        </div>
    )
}



export default AddMovie