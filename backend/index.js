require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes"); 
const adminRoutes = require("./routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

app.use("/api/movies", movieRoutes);
app.use("/posters", express.static("public/posters"));
app.use("/banners", express.static("public/banners"));
app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
