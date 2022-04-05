const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { createCardCheck, cardIdCheck } = require('../middlewares/JoiCheck');

router.get('/cards', getCards);
router.delete('/cards/:cardId', cardIdCheck, deleteCard);
router.post('/cards', createCardCheck, createCard);
router.put('/cards/:cardId/likes', cardIdCheck, likeCard);
router.delete('/cards/:cardId/likes', cardIdCheck, dislikeCard);

module.exports = router;
