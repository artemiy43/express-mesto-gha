const router = require('express').Router();
const {
  getUsers, findUser, updateProfileUser, updateAvatarUser, getUserInfo,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:userId', findUser);
router.patch('/users/me', updateProfileUser);
router.patch('/users/me/avatar', updateAvatarUser);
module.exports = router;
