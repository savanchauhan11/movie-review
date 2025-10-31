import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

export default function MovieRow({
  genre,
  movies,
  hovered,
  showInfo,
  setHovered,
  setShowInfo,
}) {
  const scrollRef = useRef(null);
  const [hoverRow, setHoverRow] = useState(false);

  const scrollLeft = () =>
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });

  const canScrollLeft = () => scrollRef.current?.scrollLeft > 0;

  const canScrollRight = () =>
    scrollRef.current
      ? scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
        scrollRef.current.scrollWidth - 1
      : false;

  return (
    <div
      className="mb-10 relative"
      onMouseEnter={() => setHoverRow(true)}
      onMouseLeave={() => setHoverRow(false)}
    >
      <h2 className="text-xl uppercase font-bold mb-4 pl-4 border-b border-gray-700 pb-2">
        {genre}
      </h2>

      {hoverRow && canScrollLeft() && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-yellow-600 transition"
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {hoverRow && canScrollRight() && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-yellow-600 transition"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isHovered={hovered === movie._id}
            isInfoShown={showInfo === movie._id}
            onHover={setHovered}
          />
        ))}
      </div>
    </div>
  );
}
