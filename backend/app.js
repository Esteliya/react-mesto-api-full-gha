// подключаем переменные окружения
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// порт + БД в отдельной env переменной
// создаем новую БД, т.к. не отрабатывает проверка email на уникальность. Теперь ок.
const {
  NODE_ENV = 'development',
  DB_PRODUCTION,
  PORT = 3000,
  // DB_URL = 'mongodb://localhost:27017/mestodb_new',
  DB_URL = 'mongodb://127.0.0.1:27017/mestodb_new',
} = process.env;

const app = express();

const corsOptions = {
  origin: [
    'https://avroradis.students.nomoredomains.xyz',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  // фронт
  // origin: 'http://localhost:3001',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// защищаем приложение, применяя библиотеку Helmet (установка: npm i helmet)
app.use(helmet());

// роуты
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');

// дружим
mongoose.connect(NODE_ENV === 'production' ? DB_PRODUCTION : DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  family: 4,
});

// ПАРСЕРЫ
// извлекаем тело ответа
app.use(bodyParser.json());
// подключаем cookie-parser (анализирует cookie и записывает данные в req.cookies)
app.use(cookieParser());
// подключаем логгер запросов
app.use(requestLogger);

// роут краш-теста
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роут авторизации
app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
// роут регистрации
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
    }),
  }),
  createUser,
);

// аутентификация. Мидлвар сработает на роуты ниже (защищаем пользователей и карточки).
app.use(auth);

// слушаем роуты
app.use('/users', usersRouter);
app.use('/cards', cardRouter);

app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
