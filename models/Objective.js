const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objSchema = new Schema(
  {
    due_date: { type: String, default: "" },
    start_date: { type: String, default: "" },
    mentor: { type: String, default: "" },
    progress: { type: Number, default: 0 },
    reason: { type: String, default: "" },
    target: { type: Number, default: 0 },
    title: { type: String, default: "" },
    type: { type: String, default: "" },
    user_id: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const Objective = mongoose.model("Objective", objSchema);
module.exports = Objective;
