const router = require("express").Router();
const path = require("path");

// GET fitness tracker homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../public"));
});

// GET excercise
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/exercise.html"));
});

// GET stats
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/../public/stats.html"));
});


module.exports = router;
