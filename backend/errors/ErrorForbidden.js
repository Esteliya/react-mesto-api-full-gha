//  Ошибка: доступ к запрошенному ресурсу запрещен
class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ErrorForbidden;
