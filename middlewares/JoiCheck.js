const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const urlExample = /(http|https):\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%._\\+~#?&//=]*)/;

const createUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.message('It is not Email');
      }
      return value;
    }),
    password: Joi.string().required(),
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
    password: Joi.string().required(),
  }),
});

const updateProfileUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const updateAvatarUserCheck = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
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
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helper) => {
      if (!urlExample.test(value)) {
        return helper.message('It is not url');
      }
      return value;
    }),
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
