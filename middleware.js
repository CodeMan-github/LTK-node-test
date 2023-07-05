import { STATUS_CODES } from 'http';

export const handleError = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (!err.statusCode) console.error(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = STATUS_CODES[statusCode] || 'Internal Error';
  res.status(statusCode).json({ error: errorMessage });
};

export const notFound = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};
