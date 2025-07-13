const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Shebla API is running 🚀");
});

app.use("/users", require("./routes/user"));
app.use("/admins", require("./routes/admin"));

module.exports = app;