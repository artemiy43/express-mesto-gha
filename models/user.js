const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');

// const UnauthorizedError = require('../Errors/UnauthorizedError');

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
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
//   return this.findOne({ email })
//     .then((user) => {
//       if (!user) {
//         // return Promise.reject(new Error('Неправильные почта или парольь'));
//         throw new UnauthorizedError();
//       }

//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             // return Promise.reject(new Error('Неправильные почта или парольmmm'));
//             throw new UnauthorizedError();
//           }

//           return user;
//         });
//     });
// };
module.exports = mongoose.model('user', userSchema);
