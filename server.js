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

// GET stats
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// GET workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      dbWorkout.forEach((workout) => {
        let total = 0;
        workout.exercises.forEach((event) => {
          total += event.duration;
        });
        wokout.totalDuration = total;
      });
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// PUT new exercise
app.put("/api/workouts/:id", (req, res) => {
  // locate workout with matching id
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
      // increment body.duration
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST new workout
app.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get workouts in range
app.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
