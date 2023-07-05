import tape from 'tape';
import jsonist from 'jsonist';
import getportsync from 'get-port-sync';
import server from './index.js';

const port = process.env.PORT || getportsync();
const endpoint = `http://localhost:${port}`;

tape('get all loans', function (t) {
  const url = `${endpoint}/loans`;

  jsonist.get(url, (err, body) => {
    if (err) t.error(err);

    t.ok(body.success, 'should be able to get the loans');
    t.end();
  });
});

tape('create a loan, get the loan, update the borrower, delete the borrower, delete the loan', function (t) {
  const url = `${endpoint}/loans`;
  const borrowers = [
    { firstName: "John", lastName: "Doe", phone: "12345678" },
    { firstName: "Jane", lastName: "Doe", phone: "87654321" },
  ];

  // Create a loan
  jsonist.post(url, borrowers, (err, body) => {
    if (err) t.error(err);

    const { loanId } = body.data;
    const { pairId } = body.data.borrowers[0];
    t.ok(body.success, 'should be able to create a loan');

    // Get a loan
    jsonist.get(`${url}/${loanId}`, (err, body) => {
      if (err) t.error(err);

      t.equal(body.data.loanId, loanId);

      // Update the borrower
      const data = { firstName: "Aida", lastName: "Bugg", phone: "22222222" };
      jsonist.put(`${url}/${loanId}/${pairId}`, data, (err, body) => {
        if (err) t.error(err);

        const borrower = body.data.borrowers.find((ele) => ele.pairId === pairId);
        t.equal(borrower.firstName, "Aida");

        // Delete the borrower
        jsonist.delete(`${url}/${loanId}/${pairId}`, (err, body) => {
          if (err) t.error(err);

          const index = body.data.borrowers.findIndex((ele) => ele.pairId === pairId);
          t.equal(index, -1);

          // Delete the loan
          jsonist.delete(`${url}/${loanId}`, (err, body) => {
            if (err) t.error(err);

            t.ok(body.success, 'should be able to delete the loan');
            t.end();
          });
        });
      });
    });
  });
});
