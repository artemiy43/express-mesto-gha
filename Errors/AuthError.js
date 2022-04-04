class AuthError extends Error {
  constructor(message = 'Неверные данные') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = AuthError;
