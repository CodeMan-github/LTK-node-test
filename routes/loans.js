import express from 'express';
import {
  getAllLoans,
  getSingleLoan,
  addLoan,
  updateBorrower,
  deleteBorrower,
  deleteLoan,
} from '../controllers/loans.js';

const router = express.Router();

router.get("/", getAllLoans);
router.get("/:loanId", getSingleLoan);
router.post("/", addLoan);
router.put("/:loanId/:pairId", updateBorrower);
router.delete("/:loanId/:pairId", deleteBorrower);
router.delete("/:loanId", deleteLoan);

export default router;
