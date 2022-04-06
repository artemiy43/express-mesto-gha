const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const AuthError = require('../Errors/AuthError');

const urlExample = /(http|https):\/\/(www\.)?[-a-zA-Z0-9]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%._\\+~#?&//=]*)/;
// @:%._\\+~#=
const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Исследователь',
  },
  avatar: { // у пользователя есть возраст
    type: String, // имя — это строка
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: { // опишем свойство validate
      validator(v) { // validator - функция проверки данных. v - значение свойства age
        if (!urlExample.test(v)) {
          return false;
        }
        return v;
      },
      message: 'It is not URL', // когда validator вернёт false, будет использовано это сообщение
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        // return Promise.reject(new Error('Неправильные почта или парольь'));
        throw new AuthError();
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // return Promise.reject(new Error('Неправильные почта или парольmmm'));
            throw new AuthError();
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
