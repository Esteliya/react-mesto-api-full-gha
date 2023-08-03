const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorAuth = require('../errors/ErrorAuth');// 401
const ErrorNotFound = require('../errors/ErrorNotFound');// 404
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400
const ErrorConflict = require('../errors/ErrorConflict');// 409
// достаем секретный ключ в отдельной env переменной, либо альтернативный, если нет .env
const { JWT_SECRET = 'test-secret' } = process.env;

// контроллер аутентификации
const login = (req, res, next) => {
  const { email, password } = req.body;
  // console.log(JWT_SECRET);
  User.findOne({ email })
    .orFail(() => next(new ErrorAuth('Пользователя с таким email или паролем не существует')))
    // если email существует в базе —> пользователь в переменной user
    .then((user) => {
      // проверяем пароль
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // если валидный пароль —> создадим jwt токен на 7 дней
            const token = jwt.sign(
              { _id: user._id },
              // секретный ключ — перенесли в .env
              JWT_SECRET,
              // токен на 7 дней
              { expiresIn: '7d' },
            );
            // записываем токен в httpOnly кук —> отправляем на фронт пользователя
            res.status(200).cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              sameSite: 'None',
              secure: true,
              httpOnly: true,
            }).send(user);
            // console.log(token);
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  User.findOne({ email })
  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else if (err.code === 11000) {
        next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

// заправшиваем авторизированного пользователя
const getAuthUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// выходим из аккаунта
const getLogout = (req, res, next) => {
  res
    .status(202).clearCookie('jwt', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
    })
    .send('cookie cleared');
  next();
};

// запрашиваем список всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

// запрашиваем пользователя по id
const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Пользователя с указанным id не существует'));
      } else {
        next(err);
      }
    });
};

// обновляем данные пользователя
const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ErrorBadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

// обновляем аватар пользователя
const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(() => next(new ErrorNotFound('Ошибка валидации')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ErrorBadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getAuthUser,
  getUser,
  updateUser,
  updateAvatar,
  login,
  getLogout,
};
