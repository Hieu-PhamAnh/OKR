const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const KRSchema = new Schema(
  {
    due_date: { type: String, default: "" },
    start_date: { type: String, default: "" },
    mentor: { type: String, default: "" },
    progress: { type: Number, default: 0 },
    step: { type: String, default: "" },
    target: { type: Number, default: 0 },
    title: { type: String, default: "" },
    objective_id: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

const KR = mongoose.model("KR", KRSchema);
module.exports = KR;
