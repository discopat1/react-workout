const router = require("express").Router();
const exerciseListController = require("../../controllers/exerciseListController");

// Matches with "/api/exercises"
router.route("/")
  .get(exerciseListController.findAll)

router.post("/suggestedExercise", exerciseListController.suggestedExercise)
module.exports = router;