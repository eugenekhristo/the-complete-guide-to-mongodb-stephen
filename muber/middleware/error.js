module.exports = (error, req, res, next) => {
  res
    .status(500)
    .json({ status: 'error', message: `Server error: ${error.message}` });
};
