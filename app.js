const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const {
  login, createUser,
} = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/Logger');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./Errors/NotFoundError');
const { createUserCheck, loginCheck } = require('./middlewares/JoiCheck');

const { PORT = 3000 } = process.env;

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://mesto.artem43.student.nomoredomains.xyz/',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use(cors);
app.use(requestLogger);
app.post('/signin', loginCheck, login);
app.post('/signup', createUserCheck, createUser);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use(errorLogger);
app.use(errors());

app.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorHandler);

app.listen(PORT);
