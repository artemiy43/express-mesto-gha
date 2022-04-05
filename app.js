const express = require('express');

const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const validator = require('validator');
const {
  login, createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { createUserCheck, loginCheck } = require('./middlewares/JoiCheck');

const { PORT = 3000 } = process.env;

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.post('/signin', loginCheck, login);
app.post('/signup', createUserCheck, createUser);

app.use(auth);

app.use('/', require('./routes/users'));

app.use('/', require('./routes/cards'));

app.use(errors());

app.use(errorHandler);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
