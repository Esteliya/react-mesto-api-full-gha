// Ошибка несуществующей страницы: 404 с котиком
class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = ErrorNotFound;
