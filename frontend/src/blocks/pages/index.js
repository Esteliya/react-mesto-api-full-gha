//КНОПКИ
const editButton = document.querySelector('.edit-button');//кнопка редактирования профиля
const addButton = document.querySelector('.add-button');//кнопка добавления карточки

//СЕКЦИИ И БЛОКИ НА СТРАНИЦЕ
//профиль на странице
const cards = document.querySelector('.cards')//блок с карточками
//ПОПАПЫ
//попап редактирования профиля
const nameEdit = document.getElementById('firstname');//инпут имя профиля
const profEdit = document.getElementById('profession');//инпут профессия
const editForm = document.querySelector('.edit-form-profile');//форма заполнения попапа

//попап добавления карточки
const inputNameAddCardPopup = document.getElementById('name-card');//поле заполнения названия карточки
const inputLinkAddCardPopup = document.getElementById('images');//поле заполнения ссылки img
const formAddCardPopup = document.querySelector('.edit-form-add-card');//форма с инпутами

//ИМПОРТ
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, selectors } from "../components/customize.js";
import  Section  from "../components/Section.js";
import  PopupWithForm  from "../components/PopupWithForm.js";
import  PopupWithImage  from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";


//ВАЛИДАЦИЯ
//валидация формы редактирования профиля
const validatorEditProfile = new FormValidator(selectors, editForm);
validatorEditProfile.enableValidation();

//валидация формы создания карточки
const validatorformAddCard = new FormValidator(selectors, formAddCardPopup);
validatorformAddCard.enableValidation();


//открываем попап редактирования профиля. Вызываем в слушателе кнопки редактирования.
const popupEditProfile = () => {
  const defaultUserData = userProfile.getUserInfo();//данные по умолчанию (ловим из профиля)
  //переносим данные в инпуты формы
  nameEdit.value = defaultUserData.userName;//в инпут имени дефолтное имя
  profEdit.value = defaultUserData.userAbout;//в инпут профессии дефолтную профессиию
  validatorEditProfile.removeValidationErrors();//сбрасываем ошибки
  popupFormProfile.open();//открыли попап редактирования профиля
}

//ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
const userProfile = new UserInfo({
  nameSelector: ".profile__user-firstname",//html-строка имени профиля
  aboutSelector: ".profile__user-profession",//html-строка профессии
});

//передаем в профиль данные из формы. Вызываем при создании попапа.
const handleFormSubmitEdit = (data)=> {
  userProfile.setUserInfo({
    userName: data.firstname,//инпут имени
    userAbout: data.profession,//инпут профессии
  });
}

//СОЗДАЕМ КАРТОЧКИ

//создание карточки
function createCard (data) {
  const newCard = new Card(data, '#templite-card', () => {
    popupZoomImage.open(data);
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

//карточки из массива
const defaultCard = new Section (
  {
    items: initialCards,
    renderer: (item) => {
      const newCards = createCard (item);
      defaultCard.addItem(newCards);//вставляем карточки на страницу
    }
  },
  '.cards')
  defaultCard.rendererItems();

//отрисовка карточки в DOM
const renderCard = (data) => {
  cards.prepend(createCard(data));
};

// создаем карточку пользователя
const addUserCard = () => {
  const cardItem = {
    name: inputNameAddCardPopup.value,
    link: inputLinkAddCardPopup.value,
  };
  renderCard(cardItem);
}

//ПОПАПЫ
//попап редактирования профиля
const popupFormProfile = new PopupWithForm ('.profile-popup', handleFormSubmitEdit);
popupFormProfile.setEventListeners();
//попап добавления пользовательской карточки
const popupAddCard = new PopupWithForm ('.add-card-popup', addUserCard);
popupAddCard.setEventListeners();
const popupZoomImage = new PopupWithImage('.zoom-img-popap');
popupZoomImage.setEventListeners();

//СЛУШАТЕЛИ
//открываем попап редактирования профиля
editButton.addEventListener('click', popupEditProfile);//открываем попап редактирования профиля
//открываем попап добавления пользовательской карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorformAddCard.removeValidationErrors();
});
