// Ошибка некорректных данных: поля пользователя/ карточки
class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ErrorBadRequest;
