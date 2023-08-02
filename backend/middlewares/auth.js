const jwt = require('jsonwebtoken');
const ErrorAuth  = require('../errors/ErrorAuth');// 401

// достаем секретный ключ в отдельной env переменной, либо альтернативный, если нет .env
const { JWT_SECRET = 'test-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    // секретный ключ — перенесли в .env
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    //res.status(401).send({ message: err.message });
    next(new ErrorAuth('Доступ к запрашиваемому ресурсу закрыт. Требуется аутентификация.'));
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
