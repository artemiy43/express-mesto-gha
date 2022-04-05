const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const createUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Не указан пароль',
      'string.min': 'Пароль слишком короткий',
    }),
  }),
});

const loginCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
    password: Joi.string().required().min(8).messages({
      'any.required': 'Не указан пароль',
      'string.min': 'Пароль слишком короткий',
    }),
  }),
});

const updateProfileUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    Name: Joi.string().min(2).max(30),
    About: Joi.string().min(2).max(30),
  }),
});

const updateAvatarUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

const findUserCheck = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().hex(),
  }),
});

const cardIdCheck = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex(),
  }),
});

const createCardCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Не указан название карточки',
        'string.min': 'Название слишком короткое',
        'string.max': 'Название слишком длинное',
      }),
    link: Joi.string(),
  }),
});

module.exports = {
  createUserCheck,
  loginCheck,
  updateProfileUserCheck,
  updateAvatarUserCheck,
  findUserCheck,
  cardIdCheck,
  createCardCheck,
};
