const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Movie = require("../models/Movie"); 
const Review = require("../models/Review");
const auth = require("../middleware/auth");

async function recalcMovieRating(movieId) {
  const agg = await Review.aggregate([
    { $match: { movie: new mongoose.Types.ObjectId(movieId) } },
    {
      $group: {
        _id: "$movie",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (agg.length > 0) {
    await Movie.findByIdAndUpdate(movieId, {
      rating: Number(agg[0].avgRating.toFixed(1)),
      ratingCount: agg[0].count,
    });
  } else {
    // no reviews
    await Movie.findByIdAndUpdate(movieId, { rating: 0, ratingCount: 0 });
  }
}

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const saved = await newMovie.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Movie not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/reviews", async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ movie: id })
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:id/reviews", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    if (!rating || !comment) return res.status(400).json({ message: "Rating and comment required" });

    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const existing = await Review.findOne({ movie: id, user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: "You already reviewed this movie. Edit your review instead." });
    }

    const review = new Review({
      movie: id,
      user: req.user._id,
      username: req.user.name || req.user.email || "User",
      rating,
      comment,
    });

    await review.save();
    await recalcMovieRating(id);

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id/reviews/:reviewId", auth, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (String(review.movie) !== id) return res.status(400).json({ message: "Movie mismatch" });

    if (String(review.user) !== String(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();
    await recalcMovieRating(id);

    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id/reviews/:reviewId", auth, async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (String(review.movie) !== id) return res.status(400).json({ message: "Movie mismatch" });

    if (String(review.user) !== String(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Review.findByIdAndDelete(reviewId);
    await recalcMovieRating(id);

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
