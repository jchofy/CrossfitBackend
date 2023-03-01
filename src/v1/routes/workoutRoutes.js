const express = require("express");
const workoutControler = require("../../controllers/workoutControllers");

const router = express.Router();

 router.get("/", workoutControler.getAllWorkouts);
 router.get("/:workoutId", workoutControler.getOneWorkout);
 router.post("/", workoutControler.createNewWorkouts);
 router.patch("/:workoutId", workoutControler.updateOneWorkouts);
 router.delete("/:workoutId", workoutControler.deleteOneWorkouts);

module.exports = router;