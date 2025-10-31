const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function isAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });
    if (!user.isAdmin) return res.status(403).json({ message: "Not authorized" });

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = isAdmin;
