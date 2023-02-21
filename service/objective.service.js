const Objective = require("../models/Objective");
const KeyResult = require("../models/KR");
const KR = require("../models/KR");

const updateProgress = async (Objective) => {
  const pipeline = [
    {
      $match: {
        objective_id: Objective._id,
      },
    },
  ];
  const listKR = await KeyResult.aggregate(pipeline);
  if (listKR.length) {
    // console.log(listKR);
    let sum = 0;
    for (let KR of listKR) {
      sum += KR.progress;
    }
    Objective.progress = Number(sum / listKR.length).toFixed(2);
  } else {
    Objective.progress = 0;
  }
  await Objective.save();
};

module.exports = { updateProgress };
