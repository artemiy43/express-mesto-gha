const errorHandler = (err, req, res) => {
  const status = err.statusCode || 500;
  res
    .status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : err.message,
      err,
    });

  if (err.code === 11000) {
    res.status(409).send({
      message: err.message,
      err,
    });
  }
};

module.exports = errorHandler;
