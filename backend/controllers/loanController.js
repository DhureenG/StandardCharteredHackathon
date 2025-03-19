const Loan = require("../models/loanModel");

const evaluateLoan = (applicant) => {
  const { age, income, employmentType, creditScore } = applicant;

  if (age < 21 || age > 60) {
    return { status: "Rejected", reason: "Applicant age must be between 21-60 years." };
  }
  if (income < 20000) {
    return { status: "Rejected", reason: "Income below ₹20,000/month." };
  }
  if (!["Salaried", "Self-Employed"].includes(employmentType)) {
    return { status: "Rejected", reason: "Employment type must be Salaried or Self-Employed." };
  }
  if (creditScore < 650) {
    return { status: "More Info Needed", reason: "Low credit score. Further review required." };
  }

  return { status: "Approved", reason: "" };
};

const applyLoan = async (req, res) => {
  try {
    const { userId, name, age, income, employmentType, creditScore } = req.body;

    if (!userId || !name || !age || !income || !employmentType || !creditScore) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = evaluateLoan({ age, income, employmentType, creditScore });

    const loanApplication = new Loan({
      userId,
      name,
      age,
      income,
      employmentType,
      creditScore,
      status: result.status,
      rejectionReason: result.reason,
    });

    await loanApplication.save();
    res.status(200).json({ message: "Loan application processed", result });
  } catch (error) {
    res.status(500).json({ message: "Error processing loan application", error: error.message });
  }
};

module.exports = { applyLoan };