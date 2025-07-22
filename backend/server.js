const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const PORT = 5000 || process.env.PORT;


const programRoutes = require("./router/Router.js"); // adjust path
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//middleware to parse to json
app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: process.env.FRONDEND,
  credentials: true
}));
//app.use(cors());

app.use("/api", programRoutes);

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
0;
