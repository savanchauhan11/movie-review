import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import NoResults from "../components/NoResults";
import MovieRow from "../components/MovieRow";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [showInfo, setShowInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let timer;
    if (hovered) timer = setTimeout(() => setShowInfo(hovered), 700);
    else setShowInfo(null);
    return () => clearTimeout(timer);
  }, [hovered]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedMovies = filteredMovies.reduce((acc, movie) => {
    const genre = movie.genre || "Other";
    if (!acc[genre]) acc[genre] = [];
    acc[genre].push(movie);
    return acc;
  }, {});

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6"> 
        <Navbar onSearch={(query) => setSearchTerm(query)} />

        {searchTerm === "" && movies.length > 0 && (
          <HeroBanner movies={movies.slice(1, 9)} />
        )}

        {filteredMovies.length > 0 ? (
          Object.keys(groupedMovies).map((genre) => (
            <MovieRow
              key={genre}
              genre={genre}
              movies={groupedMovies[genre]}
              hovered={hovered}
              showInfo={showInfo}
              setHovered={setHovered}
              setShowInfo={setShowInfo}
            />
          ))
        ) : (
          <NoResults query={searchTerm} />
        )}

        {searchTerm === "" && <Footer />}
      </div>
    </div>
  );
}
