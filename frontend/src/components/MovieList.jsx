import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Search from "./Search";
import axios from "axios";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
      .then(res => {
        setMovies(res.data);
        setFilteredMovies(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (query) => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <div className="col-span-full text-center text-white mt-10 flex flex-col items-center justify-center">
            <svg
              className="w-16 h-16 mb-4 text-yellow-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 014-4h4m0 0l3-3m-3 3l-3 3M5 17h4m0 0v4m0-4H5m14-8V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"
              />
            </svg>
            <p className="text-lg">No movies found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieList;
