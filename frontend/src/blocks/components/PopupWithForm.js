//ИМПОРТ
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
    super(popupSelector);//родителя
    this._submitForm = submitForm;//ждем коллбэк отправки формы
    this._form = this._popup.querySelector('.edit-form');//форма попапа
    this._inputs = Array.from(this._form.querySelectorAll('.edit-form__personalia'))//массив инпутов
    this._button = this._form.querySelector('.save-button');//кнопка сохранить
  }

  //получаем значения инпутов
  _getInputValues() {
    const inputElement = {};
    this._inputs.forEach((input) => {
      inputElement[input.name] = input.value;
    });
    return inputElement;//получили значение полей
  }

  close() {
    super.close();//родителя
    this._form.reset();//сбрасываем данные формы
  }

  setEventListeners () {
    super.setEventListeners();
    //слушаем форму
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
}
}
