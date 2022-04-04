const jwt = require('jsonwebtoken');

const AuthError = require('../Errors/AuthError');
const ForbiddenError = require('../Errors/ForbiddenError');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = function Auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ForbiddenError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};
