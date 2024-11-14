const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Datebase Connected`))
    .catch((error) => console.log(error.message));
};

module.exports = connectDB;
