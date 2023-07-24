class FormValidator {
  constructor(data, formElement) {
  this._formElement = formElement;//получаемая форма
  //принимаем на вход селекторы объекта валидации
  this._data = data,//объект с селекторами (форма, инпут, проч. настройки)
  this._inputs = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));//массив инпутов
  this._button = this._formElement.querySelector(this._data.buttonSelector);//кнопка сохранить
};

//показаем ошибку (добавляем класс)
_showInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);//поиск через id элемента
  inputElement.classList.add(this._data.inputErrorSelector);//добавили красное подчеркивание
  errorElement.textContent = inputElement.validationMessage;//текст ошибки - стандартная валидация
  errorElement.classList.add(this._data.spanErrorSelector);//показываем ошибку
};

//скрываем ошибку (удаляем класс)
_hideInputError = (inputElement) => {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._data.inputErrorSelector);//убираем подчеркивание
  errorElement.classList.remove(this._data.spanErrorSelector);//скрываем блок с ошибкой
  errorElement.textContent = '';
};

// Проверяем валидность полей
_checkInputValidity = (inputElement) => {
  if (!inputElement.validity.valid) {
    // Поле не проходит валидацию - показываем ошибку
    this._showInputError(inputElement);
  } else {
    // Поле проходит валидацию - скрываем ошибку
    this._hideInputError(inputElement);
  }
};

//копка не работает
disabledButton = (data) => {
  this._button.disabled = 'true';
  this._button.classList.add(data.disabledButtonSelector);
}

//кнопка работает
_deleteDisabledButton = (data) => {
  this._button.disabled = '';
  this._button.classList.remove(data.disabledButtonSelector);
}

//проверяем поля на валидность
_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
   return !inputElement.validity.valid;
 });
}

//блокируем/разблокируем кнопку Сохранить/Создать после проверки на валидность инпутов
_toggleButtonState = (inputList) => {
  if(this._hasInvalidInput(inputList)) {
   this.disabledButton (this._data);
  } else {
    this._deleteDisabledButton (this._data);
}
}

//валидация полей ввода
_setEventListeners = (inputList) => {
  this._toggleButtonState(inputList);
  this._inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList);
    });
  });
};

//очищаем форму от ошибок
removeValidationErrors = () => {
  this._inputs.forEach((inputElement) => {
    this._hideInputError(inputElement);
    });
    this.disabledButton (this._data);
  }
  //запускаем валидацию форм
enableValidation = () => {
  this._setEventListeners(this._inputs);
}
}

//ЭКСПОРТ
export { FormValidator };
