const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const loanRoutes = require("./routes/loanRoutes");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Digital Loan Application API");
});

app.use("/api/loan", loanRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));