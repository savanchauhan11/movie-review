const express = require("express");
const Movie = require("../models/Movie");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

router.post("/movies", isAdmin, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/movies/:id", isAdmin, async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/movies/:id", isAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
