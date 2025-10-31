import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6">
        <Navbar />
        <h1 className="text-3xl font-bold mb-6">Your Favorites</h1>

        {favorites.length === 0 ? (
          <p className="text-gray-400">No favorites added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                isHovered={false}
                isInfoShown={true}
                onHover={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
