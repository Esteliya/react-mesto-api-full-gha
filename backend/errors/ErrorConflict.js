// Ошибка введенных данных: конфликт запроса и сущестующих на сервере данных
class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = ErrorConflict;