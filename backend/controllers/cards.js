const Card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');// 404
const ErrorForbidden = require('../errors/ErrorForbidden');// 403
const ErrorAuth = require('../errors/ErrorAuth');// 401
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400
const ErrorConflict = require('../errors/ErrorConflict');// 409

// создаем карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;// id пользователя

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// запрашиваем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

// удаляем карточку по id
const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => next(new ErrorNotFound('Карточка не найдена')))
    .then((card) => {
      // карточка пользователя?
      // нет - удаление невозможно
      if (req.user._id !== card.owner.toString()) {
        next(new ErrorForbidden('У вас нет прав на удалениие данной карточки'));
      } else {
        // если да, то удаляем карточку
        Card.findByIdAndRemove(id)
          .then(() => {
            res.send({ message: 'Карточка успешно удалена' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// ставим лайк карточке
const likeCard = (req, res, next) => {
  const { id } = req.params;
  const idUser = req.user._id;
  Card.findByIdAndUpdate(id, { $addToSet: { likes: [idUser] } }, { new: true })
    .orFail(() => next(new ErrorNotFound('Карточка не найдена')))
    .then((card) => {
      if (!card) {
        next(new ErrorNotFound('Карточка с указанным id не существует'));
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// удаляем лайк карточки
const deleteLikeCard = (req, res, next) => {
  const { id } = req.params;
  const idUser = req.user._id;
  Card.findByIdAndUpdate(id, { $pull: { likes: idUser } }, { new: true })
    .orFail(() => next(new ErrorNotFound('Карточка не найдена')))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// экспорт
module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  deleteLikeCard,
};
