const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static for index.html
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", {
  useNewUrlParser: true,
});

// GET excercise
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// POST new exercise
app.post("/api/workouts", (req, res) => {
  db.Workout.create({});

});

// GET workouts
app.get("/api/workouts", (req, res) => {
  console.log("Hello World");
});

// GET stats
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
