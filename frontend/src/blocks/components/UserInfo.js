export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this.userName = document.querySelector(nameSelector);//имя пользователя
    this.userAbout = document.querySelector(aboutSelector);//поле о себе
  }

  //вернем данные пользователя (для заполнения формы)
  getUserInfo() {
    return {
      userName: this.userName.textContent,//имя пользователя
      userAbout: this.userAbout.textContent,//о пользователе
    };
  }

  //создает новые данне пользователя (получаем из формы)
  setUserInfo({userName, userAbout}) {
    this.userName.textContent = userName;//передаем имя
    this.userAbout.textContent = userAbout;//передаем данные о пользователе
  }
}
