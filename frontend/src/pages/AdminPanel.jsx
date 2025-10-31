import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    year: "",
    rating: "",
    director: "",
    description: "",
    posterUrl: "",
  });

  const { token, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!token) return <div>Please log in to access Admin Panel</div>;

  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const fetchMovies = () => {
    axios
      .get("http://localhost:5000/api/movies", config)
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Fetch movies error:", err));
  };

  useEffect(() => {
    if (token) fetchMovies();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form:", form);

      if (form._id) {
        const res = await axios.put(
          `http://localhost:5000/api/movies/${form._id}`,
          form,
          config
        );
        console.log("Update response:", res.data);
      } else {

        const res = await axios.post(
          "http://localhost:5000/api/movies",
          form,
          config
        );
        console.log("Insert response:", res.data);
      }

      setForm({
        title: "",
        year: "",
        rating: "",
        director: "",
        description: "",
        posterUrl: "",
      });

      fetchMovies();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/movies/${id}`,
        config
      );
      console.log("Delete response:", res.data);
      fetchMovies();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (movie) => {
    setForm({ ...movie });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6">
        <Navbar onSearch={() => {}} />
        <h1 className="text-2xl text-center sm:text-xl font-bold mb-6 mt-6">
          ADMIN PANEL
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-xl shadow-md mb-8 flex flex-col sm:flex-wrap gap-4"
        >
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            placeholder="Rating"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            placeholder="Director"
            value={form.director}
            onChange={(e) => setForm({ ...form, director: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            placeholder="Poster URL"
            value={form.posterUrl}
            onChange={(e) => setForm({ ...form, posterUrl: e.target.value })}
            className="px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors duration-300"
          >
            {form._id ? "Update Movie" : "Add Movie"}
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  POSTER
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  TITLE
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  YEAR
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  RATING
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  DIRECTOR
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  DESCRIPTION
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr
                  key={movie._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition"
                >
                  <td className="py-2 px-4">
                    <img
                      src={`http://localhost:5000${movie.posterUrl}`}
                      alt={movie.title}
                      className="w-16 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{movie.title}</td>
                  <td className="py-2 px-4">{movie.year}</td>
                  <td className="py-2 px-4">{movie.rating}</td>
                  <td className="py-2 px-4">{movie.director}</td>
                  <td className="py-2 px-4">{movie.description}</td>
                  <td className="py-2 px-4 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(movie)}
                      className="text-yellow-500 hover:text-yellow-400"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
