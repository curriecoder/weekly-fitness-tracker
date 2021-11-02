const router = require("express").Router();
const db = require("../models");

// GET all workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({});
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET workouts in range
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      // Add fields to track totals in range
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST new workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// PUT new exercise
router.put("/api/workouts/:id", (req, res) => {
  // locate workout with matching id
  db.Workout.findOneAndUpdate(
    { _id: req.params.id },
    {
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

module.exports = router;
