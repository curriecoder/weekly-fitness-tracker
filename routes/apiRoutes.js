const express = require("express");
const router = require("express").Router();

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

// GET workouts
router.get("/api/workouts", (req, res) => {
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
router.put("/api/workouts/:id", (req, res) => {
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
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });

});

module.exports = router;