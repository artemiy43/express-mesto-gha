class ErrorConflict extends Error {
  constructor(message = 'Произошёл конфликт') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ErrorConflict;
