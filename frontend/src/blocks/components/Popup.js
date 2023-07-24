export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);// селектор попапа
    this._closeButton = this._popup.querySelector('.close-button');//кнопка закрытия
  }
  //открытие попапа +
  open() {
    this._popup.classList.add('popup_open');//добавили класс
  }
  //закрытие попапа +
  close() {
    this._popup.classList.remove('popup_open');//удалили класс
  }
  //закрываем по нажатию Esc +
  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close ();
    }
  }
  //слушатель
  setEventListeners () {
    //слушатель кнопки "Закрыть"
    this._closeButton.addEventListener('click', () => {
      this.close();//клик по кнопке Закрыть
  });
  //слушатель оверлея
  this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close ();
      };
    });
    //слушатель Esc
    document.addEventListener('keydown', this._handleEscClose);
}
}
