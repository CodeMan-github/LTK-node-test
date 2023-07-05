import Loan from '../models/Loan.js';

/**
 * Get all loans
 * @param {*} req 
 * @param {*} res contains array of loans
 */
export const getAllLoans = async (req, res) => {
  const loans = await Loan.find();
  res.status(200).json({ success: true, data: loans });
};

/**
 * Get a single loan
 * @param {*} req contains loanId
 * @param {*} res contains a loan
 */
export const getSingleLoan = async (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loan = await Loan.findOne({ loanId });
  res.status(200).json({ success: true, data: loan });
};

/**
 * Add a loan
 * @param {*} req contains array of borrowers
 * @param {*} res contains a loan created
 */
export const addLoan = async (req, res) => {
  const ary = req.body;

  // Input Validation
  if (!Array.isArray(ary)) {
    res.status(400).json({ error: "Bad Request" });
  }
  if (ary.findIndex((ele) => !ele.firstName || !ele.lastName || !ele.phone) > -1) {
    res.status(400).json({ error: 'Bad Request' });
  }

  const loanId = Date.now();
  const borrowers = ary.map((ele, index) => {
    return {
      pairId: index,
      firstName: ele.firstName,
      lastName: ele.lastName,
      phone: ele.phone,
    };
  });
  const newLoan = new Loan({
    loanId,
    borrowers,
  });
  await newLoan.save();

  res.status(201).json({ success: true, data: newLoan });
};

/**
 * Update the borrower
 * @param {*} req contains borrower info
 * @param {*} res contains loan updated
 */
export const updateBorrower = async (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);
  const { firstName, lastName, phone } = req.body;
  const loan = await Loan.findOne({ loanId });
  const index = loan.borrowers.findIndex((ele) => ele.pairId === pairId);
  if (index === -1) {
    res.status(400).json({ error: 'Bad Request' });
  }

  loan.borrowers[index] = { pairId, firstName, lastName, phone };
  await loan.save();

  res.status(200).json({ success: true, data: loan });
};

/**
 * Delete the borrower
 * @param {*} req contains loanId, pairId of borrower to delete
 * @param {*} res contains loan
 */
export const deleteBorrower = async (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const pairId = parseInt(req.params.pairId);
  const loan = await Loan.findOne({ loanId });
  const index = loan.borrowers.findIndex((ele) => ele.pairId === pairId);
  if (index === -1) {
    res.status(400).json({ error: 'Bad Request' });
  }

  loan.borrowers = loan.borrowers.filter((ele) => ele.pairId !== pairId);
  await loan.save();

  res.status(200).json({ success: true, data: loan });
};

/**
 * Delete the loan
 * @param {*} req contains loanId to delete
 * @param {*} res contains loan deleted
 */
export const deleteLoan = async (req, res) => {
  const loanId = parseInt(req.params.loanId);
  const loan = await Loan.deleteOne({ loanId });
  res.status(200).json({ success: true, data: loan });
};
