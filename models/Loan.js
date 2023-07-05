import mongoose from 'mongoose';

const loanSchema = mongoose.Schema(
  {
    loanId: {
      type: Number,
      required: true,
    },
    borrowers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
