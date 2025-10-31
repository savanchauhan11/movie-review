import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaStar, FaHeart, FaRegHeart, FaTrash, FaEdit } from "react-icons/fa";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null); // reviewId if editing
  const [loading, setLoading] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { token, user } = useAuth();

  const authConfig = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchMovie();
    fetchReviews();
    }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Fetch movie error:", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/movies/${id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
    }
  };

  if (!movie) return <div className="text-white p-6">Loading...</div>;

  const handleFavoriteClick = () => {
    if (isFavorite(movie._id)) removeFavorite(movie._id);
    else addFavorite(movie);
  };

  const resetReviewForm = () => {
    setReviewText("");
    setReviewRating(0);
    setEditing(null);
  };

  const handleReviewSubmit = async () => {
    if (!token) {
      alert("Please login to post a review.");
      return;
    }
    if (!reviewText || reviewRating === 0) {
      alert("Please enter a comment and select a rating!");
      return;
    }
    try {
      setLoading(true);
      if (editing) {
        await axios.put(
          `http://localhost:5000/api/movies/${id}/reviews/${editing}`,
          { rating: reviewRating, comment: reviewText },
          authConfig
        );
        alert("Review updated!");
      } else {
        await axios.post(
          `http://localhost:5000/api/movies/${id}/reviews`,
          { rating: reviewRating, comment: reviewText },
          authConfig
        );
        alert("Review submitted!");
      }
      resetReviewForm();
      await fetchReviews();
      await fetchMovie();
    } catch (err) {
      console.error("Review submit error:", err);
      alert(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (r) => {
    setEditing(r._id);
    setReviewRating(r.rating);
    setReviewText(r.comment);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!token) {
      alert("Please login to delete reviews.");
      return;
    }
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/movies/${id}/reviews/${reviewId}`,
        authConfig
      );
      await fetchReviews();
      await fetchMovie();
    } catch (err) {
      console.error("Delete review error:", err);
      alert("Could not delete review");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white relative">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={`http://localhost:5000${movie.posterUrl}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-6">
        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-6 items start">
          <div className="relative flex-shrink-0 w-full md:w-1/3 rounded-xl overflow-hidden shadow-2xl h-[450px] md:h-[600px]">
            <img
              src={`http://localhost:5000${movie.posterUrl}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:w-2/3 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="uppercase text-4xl sm:text-5xl font-extrabold">
                {movie.title}
              </h1>

              <button
                onClick={handleFavoriteClick}
                className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-full hover:bg-gray-800 transition"
              >
                {isFavorite(movie._id) ? (
                  <FaHeart className="text-yellow-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>

            <p className="uppercase text-gray-300 mb-2 text-lg">
              {movie.genre} • {movie.year}
            </p>
            <p className="text-gray-400 mb-6">
              Directed by{" "}
              <span className="uppercase text-white">{movie.director}</span>
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">{movie.description}</p>

            <div className="flex items-center gap-2 text-yellow-400 text-xl font-semibold mb-8">
              <FaStar /> <span>{movie.rating ?? 0}</span>
              {/* <span className="text-sm text-gray-400 ml-2">
                ({movie.ratingCount ?? 0} reviews)
              </span> */}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">{editing ? "Edit Review" : "Write a Review"}</h2>

              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      reviewRating >= star ? "text-yellow-400" : "text-gray-500"
                    }`}
                    onClick={() => setReviewRating(star)}
                  />
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleReviewSubmit}
                  disabled={loading}
                  className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-400"
                >
                  {editing ? "Update Review" : "Submit Review"}
                </button>
                {editing && (
                  <button
                    onClick={resetReviewForm}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
              {reviews.length === 0 ? (
                <p className="text-gray-400">No reviews yet — be the first to drop truth bombs.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {reviews.map((r) => (
                    <div key={r._id} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong>{r.username}</strong>
                            <div className="flex items-center text-yellow-400 ml-3">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <FaStar key={i} />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">
                            {new Date(r.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          {(user && (user._id === r.user || user.isAdmin)) && (
                            <>
                              <button onClick={() => handleEditClick(r)} className="text-yellow-500">
                                <FaEdit />
                              </button>
                              <button onClick={() => handleDeleteReview(r._id)} className="text-red-500">
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-gray-200">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
