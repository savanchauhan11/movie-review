import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieCard({ movie, isHovered, isInfoShown, onHover }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite(movie._id)) removeFavorite(movie._id);
    else addFavorite(movie);
  };

  return (
    <div
      className={`relative cursor-pointer overflow-hidden rounded-lg shadow-lg transform transition-transform duration-200 ease-out aspect-[2/3] w-[200px] flex-shrink-0 ${
        isHovered ? "scale-105" : "scale-100"
      }`}
      onMouseEnter={() => onHover(movie._id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => navigate(`/movie/${movie._id}`)}
    >
      <img
        src={`http://localhost:5000${movie.posterUrl}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      <div
        className={`absolute inset-0 bg-black text-white p-4 flex flex-col justify-end transition-opacity duration-300 ease-in-out ${
          isInfoShown ? "bg-opacity-70 opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-gray-800 p-2 rounded-full hover:bg-yellow-600 transition"
        >
          {isFavorite(movie._id) ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
        </button>

        <h2 className="uppercase text-lg font-bold">{movie.title}</h2>
        <p className="text-sm">{movie.year}</p>
        <p className="text-sm">{movie.director}</p>
      </div>
    </div>
  );
}
