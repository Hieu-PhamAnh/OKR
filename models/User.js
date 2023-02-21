const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String, min: 8 },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String },
    phone: { type: String, default: "" },
    dob: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
