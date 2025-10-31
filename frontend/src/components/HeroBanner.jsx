import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroBanner({ movies }) {
  const [current, setCurrent] = useState(0);
  const length = movies.length;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [length]);

  if (!Array.isArray(movies) || movies.length === 0) return null;

  return (
    <div
      className="relative w-full h-96 md:h-[500px] lg:h-[600px] mb-8 mt-4 overflow-hidden rounded-xl shadow-lg"
      onClick={() => navigate(`/movie/${movies[current]._id}`)}
    >
      {movies.map((movie, index) => {
        const isActive = index === current;

        return (
          <div
            key={movie._id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            
            <img
              src={`http://localhost:5000${movie.banner}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-xl"
            />

            
            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/100 via-transparent to-black/60 pointer-events-none"></div>
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)",
              }}
            ></div>

            
            <div
              className={`absolute bottom-10 left-10 p-4 rounded z-20 transform transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 translate-y-0 delay-200"
                  : "opacity-0 translate-y-5 delay-0"
              }`}
            >
              <h2 className="uppercase text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {movie.title}
              </h2>
              <p className="text-white mt-2 hidden md:block max-w-xl drop-shadow-md">
                {movie.description?.length > 150
                  ? movie.description.slice(0, 150) + "..."
                  : movie.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
