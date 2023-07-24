//массив карточек из коробки
const initialCards = [
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1660489121766-55708d62b800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80'
  },
  {
    name: 'Салтинский водопад',
    link: 'https://images.unsplash.com/photo-1665235482670-460c531bdbea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1634745186518-db2e653372c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1619417606952-552a15237367?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Озеро Рица',
    link: 'https://images.unsplash.com/photo-1665883185678-ba092ce12f38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Ай-Петри',
    link: 'https://images.unsplash.com/photo-1630094466385-a9a7b8596ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
];

const selectors = {
  formSelector: '.edit-form',//форма
  inputSelector: '.edit-form__personalia',//инпут в форме
  buttonSelector: '.save-button',//кнопка сохранения
  disabledButtonSelector: 'save-button-disabled',//неактивная кнопка
  inputErrorSelector: 'input-error',//нижнее подчеркивание инпута
  spanErrorSelector: 'edit-form__personalia-error_active',//активная строка ошибки
  }

  //ЭКСПОРТ
 export { initialCards, selectors };
