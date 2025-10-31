const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: Number,
    rating: Number,
    director: String,
    description: String,
    posterUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", movieSchema, "movies");
