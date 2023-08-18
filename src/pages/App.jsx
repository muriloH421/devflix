import { useEffect } from "react";
import logo from "../assets/devflix.png";
import searchIcon from "../assets/search.svg";
import { useState } from "react";

import "./App.css";
import MovieCard from "../components/movieCard/movieCard";
import { useCallback } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const apikey = "e4d577fa";
  const apiUrl = `https://omdbapi.com/?apikey=${apikey}`;

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(searchTerm);
  };

  // fetch(apiUrl)
  //   .then((Response) => Response.json())
  //   .then((data) => console.log(data));

  return (
    <div id="app">
      <div className="app">
        <img src={logo} alt="logo devflix"></img>F
      </div>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="pesquise aqui "
        />
        <img
          src={searchIcon}
          alt="Icone de pesquisa"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key ={movies.imdbID}  movies={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Nenhum filme encontrado 😢</h2>
        </div>
      )}
    </div>
  );
};
export default App;
