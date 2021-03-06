const db = require("../models");

// Defining methods for the exerciseListController
module.exports = {
  findAll: function(req, res) {
    db.ExerciseList
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  suggestedExercise: function(req, res) {
    db.SelfAssess.create(req.body).then(function(dblifting) {
      // Multiply body weight by incremental number depending on the number of repetions
      console.log("===========", req.body)
      const maxReps = {
          pushups: req.body.pushups,
          squats: req.body.squats
      };
      const bodyweight = req.body.weight;
      const pushupBodyweight = req.body.weight * 0.64;
      let multiplier;
      let pushupMax;
      let squatMax;

      function pushupMultiplier() {
          if (maxReps.pushups === 1) {
              multiplier = 1;
          } else if (maxReps.pushups === 0) {
              multiplier = 0.75;
          } else {
              multiplier = ((maxReps.pushups - 1) * 0.04) + 1
          };
          pushupMax = pushupBodyweight * multiplier;
      };


      function squatMultiplier() {
          if (maxReps.squats === 1) {
              multiplier = 1;
          } else if (maxReps.squats === 0) {
              multiplier = 0.75;
          } else {
              multiplier = ((maxReps.squats - 1) * 0.03) + 1
          };
          squatMax = bodyweight * multiplier;
      };
      pushupMultiplier();
      squatMultiplier();

      const oneRepObj = {
          Bench: pushupMax,
          Squat: squatMax
      };
      console.log("------------", oneRepObj);
      
  res.json(oneRepObj);
    
    })
  }
  }