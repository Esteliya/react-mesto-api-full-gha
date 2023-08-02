// Ошибка авторизации. Передача неверных данных:email, password, token(jwt)
class ErrorAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = ErrorAuth;
