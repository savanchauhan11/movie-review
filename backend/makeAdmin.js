const mongoose = require("mongoose");
const User = require("./models/User"); 
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    const email = "savan@email.com"; 

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      process.exit();
    }

    user.isAdmin = true;
    await user.save();
    console.log("User is now an admin");

    process.exit();
  })
  .catch((err) => console.error(err));
