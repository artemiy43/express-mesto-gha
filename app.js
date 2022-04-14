const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const cors = require('cors');
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

const allowedCors = [
  'https://mesto.artem43.student.nomoredomains.xyz/',
  'http://mesto.artem43.student.nomoredomains.xyz/',
  'localhost:3000/',
];

app.use((req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  // const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', requestHeaders);
  }
  next();
});

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
