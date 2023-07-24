//настройки api
const apiSetting = {
  //url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  url: 'http://localhost:3000',
  headers: {
    //authorization: '524c1b7c-bb91-4dd5-95f2-6bf707a74ceb',
    'Content-Type': 'application/json'
  },
};

//ЭКСПОРТ
export {
  apiSetting,
};
