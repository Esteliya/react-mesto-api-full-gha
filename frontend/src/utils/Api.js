import { apiSetting } from './customize.js';

class Api {
  constructor(data) {
    this._url = data.url;//основная строка url из customize
    //this._headers = data.headers;//заголовок fetch из customize
  }
  //проверяем ответ сервера
  _checkResponse(res) {
    if (res.ok) {//если все ок
      return res.json();//вернули данные (объект)
    } else {
      Promise.reject(res.status);//завершаем действия с ошибкой
    }
  }

  //запрос проверки ответа
  _request(urlEndpoint, options) {
    //debugger;
    return fetch(`${this._url}${urlEndpoint}`, options)
      .then(this._checkResponse)
  }

  //запрашиваем данные
  getUserInfo() {
    return this._request('/users/me', {
      //headers: this._headers,
      credentials: 'include',
    })
  }

  //отправляем данные пользователя
  patchUserInfo(data) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      //headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  //запрашиваем массив карточек с сервера
  getArrCards() {
    return this._request('/cards', {
      //headers: this._headers,
      credentials: 'include',
    })
  }

  //создаем карточку пользователя -> отправляем данные на серввер
  postUserCard(data) {//ждем объект
    //debugger;
    return this._request('/cards', {
      method: 'POST',
      credentials: 'include',
      //headers: this._headers,
      body: JSON.stringify(
        data,
      )
    })
  }

  //удаляем карточку
  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      //headers: this._headers,
    })
  }

  //отправляем аватарку на сервер
  patchAvatar(avatar) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      //headers: this._headers,
      body: JSON.stringify(avatar),
    })
  }

  //добавляем лайк карточке
  putLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      //headers: this._headers,
    })
  }

  //удаляем лайк карточки
  deleteLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      //headers: this._headers,
    })
  }
}

//экземпляр класса Api с данными
const api = new Api(apiSetting);
//ЭКСПОРТ
export default api;
//export { Api };
