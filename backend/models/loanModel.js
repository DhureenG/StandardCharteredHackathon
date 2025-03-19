const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  age: Number,
  income: Number,
  employmentType: String, // "Salaried" or "Self-Employed"
  creditScore: Number,
  status: { type: String, enum: ["Approved", "Rejected", "More Info Needed"], default: "More Info Needed" },
  rejectionReason: { type: String, default: "" },
});

module.exports = mongoose.model("Loan", loanSchema);