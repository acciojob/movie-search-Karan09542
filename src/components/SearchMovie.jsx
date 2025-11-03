import React, { useState } from 'react'

const SearchMovie = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    function handleSearchMovie(){
        fetch(`http://www.omdbapi.com/?apikey=99eb9fd1&s=${search}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.Response === "False"){
                setError("Invalid movie name. Please try again.")
            }else {
                setError("")
                setMovies(data.Search)
            }
        })
        .catch(err => {
            setError("Invalid movie name. Please try again.")
            setMovies([])
            console.error(err)
        })
    }

  return (
    <div>
        <div>
            <label htmlFor="search">Search Movie</label>
            <br />
            <input onChange={(e) => setSearch(e.target.value)} type="text" id="search" placeholder='Search'/>
            <button onClick={handleSearchMovie}>Search</button>
        </div>
        <ul>
            {movies.map((movie, i) => (
                <li key={movie.imdbID + `-${i}`}>
                    <h2>{movie.Title} {`(${movie.Year})`}</h2>
                    <img src={movie.Poster} alt="moive-image"/>
                </li>
            ))}
        </ul>
        <p class="error">{error}</p>
    </div>
  )
}

export default SearchMovie