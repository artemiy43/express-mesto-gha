const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUsers, findUser, updateProfileUser, updateAvatarUser, getUserInfo,
} = require('../controllers/users');

const { updateProfileUserCheck, updateAvatarUserCheck, findUserCheck } = require('../middlewares/JoiCheck');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', findUserCheck, findUser);
router.patch('/users/me', updateProfileUserCheck, updateProfileUser);
router.patch('/users/me/avatar', updateAvatarUserCheck, updateAvatarUser);
module.exports = router;
