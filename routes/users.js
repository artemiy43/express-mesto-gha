const router = require('express').Router();
const {
  getUsers, createUser, findUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', findUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfileUser);
router.patch('/users/me/avatar', updateAvatarUser);
module.exports = router;
