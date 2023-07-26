import React from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound'
import InfoTooltip from './InfoTooltip'
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import * as auth from '../utils/Auth';

function App() {
  const navigate = useNavigate();
  const location = useLocation();//будем следить за роутами

  //контекст логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  //контекст данных пользователя - email
  const [userEmail, setUserEmail] = React.useState('');

  //контекст карточек
  const [cards, setCards] = React.useState([]);

  //попап редактирования профиля
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);

  //попап редактирования аватара профиля
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  //попап добавления карточки
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //открываем zoom-попап 
  const [selectedCard, setSelectedCard] = React.useState({});


  //контекст роутов сайта 
  const [currentRoute, setCurrentRoute] = React.useState('');

  //деструктурировали и забрали только email
  const handleLogin = ({ email }) => {
    setLoggedIn(true);//залогинились (правда)
    //console.log(email);
    //console.log(data.email);
    //console.log(data);
    //console.log(data.data);
    //console.log(data.password);
    //setUserInfo({ data });
    setUserEmail(email)
  }
  //контекст попапа оповещения хода регистрации
  const [showInfoToolTip, setShowInfoToolTip] = React.useState(false)

  //контекст результата отправки запроса к api (для попапа InfoTooltip)
  const [result, setResult] = React.useState(false);

  //контекст текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  //текст попапа  оповещения хода регистрации
  const textInfoTooltip = result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  React.useEffect(() => {
    tockenCheck();//проверяем наличие токена
  }, []);

  //запрашиваем данные о пользователе с сервера 
  function getUserData() {
    //console.log('запросили данные пользователя');
    api.getUserInfo()//запрашиваем данные пользователя
      .then((userData) => {
        setCurrentUser(userData);//выводим на страницу данные профиля
        //console.log(userData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //КАРТОЧКИ
  //запрашиваем данные карточек с сервера 
  function getCards() {
    //console.log('запросили данные карточек');
    api.getArrCards()
      .then((cardsData) => {
        //console.log('запросили данные карточек');
        setCards(cardsData);//выводим на страницу карточки
        //console.log(cardsData);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //ставим лайк 
  function handleCardLike(card) {
    //debugger;
    //console.log('ставим лайк карточке');
    //console.log(card);
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      console.log('лайк');
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        //ловим вероятную ошибку
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    } else {
      console.log('дизлайк');
      //debugger;
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        //ловим вероятную ошибку
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    }
  }

  //удаляем карточку
  function handleCardDelete(card) {
    //console.log('удаляем карточку');
    //console.log(card);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      //ловим вероятную ошибку
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
    //console.log(`удалили карточку ${card._id}`);
  }

  //ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
  //редактирование пользователя
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleUpdateUser(userData) {
    api.patchUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }


  //рредактирование аватара профиля
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleUpdateAvatar(avatar) {
    console.log(avatar);
    api.patchAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //ПОПАПЫ
  //добавление новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleAddPlaceSubmit(place) {
    //console.log(place);//все ок. Объект {name: '', link: ''}
    api.postUserCard(place)
      //изменения карточек
      .then((newCard) => {
        //console.log(newCard);
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      //если ошибка в запросе api
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //открывает zoom-попап
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //закрываем все попапы по крестику
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setShowInfoToolTip(false)
  }

  //ФУНКИОНАЛ СТРАНИЦ НЕАВТОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ
  //регистрируем пользователя
  function handleRegister(data) {
    const { email, password } = data;
    auth.register(email, password)
      .then(() => {
        //console.log(data)
        //alert('Регистрация прошла успешно')//работает 
        setResult(true)
        setShowInfoToolTip(true)
        //переходим к авторизации пользователя
        navigate('/sign-in', {
          replace: true
        })
      })
      .catch((err) => {
        //console.log('ОШИБКА РЕГИСТРАЦИИ')
        console.error(`Ошибка: ${err}`);
        setResult(false)
        setShowInfoToolTip(true)
      })
  }

  //авторизируем пользователя 
  function handleAutorization(data) {
    const { email, password } = data;
    /* const dataAuthUser = {//сохранили в объект данные из полей при авторизации —> используем после успешной авторизации
      email: email,
      password: password
    }; */
    //console.log(dataAuthUser);
    auth.authorize(email, password)
      .then((data) => {
        //console.log(data);
        //alert('Авторизация прошла успешно')

        //getCards();
        //handleLogin(data);//после успешной авторизации передаем данные авторизировавшегося пользователя дальше

        tockenCheck();
        /* if (data.token) {
          //console.log('получаем токен');
          localStorage.setItem('jwt', data.token);
          //console.log('записали данные токена в localStorage');
          getCards();
          handleLogin(dataAuthUser);//после успешной авторизации передаем данные авторизировавшегося пользователя дальше
          //console.log(dataAuthUser);
          tockenCheck();
        } */
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  //проверяем наличие токена в localStorage
  function tockenCheck() {
    auth.checkToken()
      .then(user => {
        //console.log('сравнили токен - есть');
        setLoggedIn(true);
        getUserData();//запросили данные пользователя
        getCards();//запросили данные карточек с сервера
        handleLogin(user);
        //console.log(location);
        const path = location.pathname;
        //console.log(path);
        switch (path) {//навигируем существующие роуты на карточки при авторизации, иначе 404 страница
          case "/":
            navigate('/');
            break;
          case "/sign-in":
            navigate('/');
            break;
          case "/sign-up":
            navigate('/');
            break;
          default:
        }
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });

    //const jwt = localStorage.getItem('jwt');

    /* if (jwt) {
      auth.checkToken(jwt)
        .then(user => {
          //console.log('сравнили токен - есть');
          setLoggedIn(true);
          getUserData();//запросили данные пользователя
          getCards();//запросили данные карточек с сервера
          handleLogin(user.data);
          //console.log(location);
          const path = location.pathname;
          //console.log(path);
          switch (path) {//навигируем существующие роуты на карточки при авторизации, иначе 404 страница
            case "/":
              navigate('/');
              break
            case "/sign-in":
              navigate('/');
              break
            case "/sign-up":
              navigate('/');
              break
          }

        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
    } else {
      setLoggedIn(false);
    } */

  }

  //удаляем токен - для кнопки ВЫХОД
  function handleExitProfile() {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem("jwt");
      navigate("/sign-in");//перебрасываем на авторизацию - есть в link в Header 
      setLoggedIn(false);//незалогинен
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          loggedIn={loggedIn}
          currentRoute={currentRoute}
          handleExitProfile={handleExitProfile}
        />
        <Routes>

          <Route exact path='/' element={!loggedIn ? <Navigate to='/sign-up' /> : <ProtectedRoute
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            setCurrentRoute={setCurrentRoute}
            element={Main} />} replace />

          <Route exact path='/sign-up' element={<Register handleDataForm={handleRegister} setCurrentRoute={setCurrentRoute} />} />
          <Route exact path='/sign-in' element={<Login handleDataForm={handleAutorization} setCurrentRoute={setCurrentRoute} />} />
          <Route path='*' element={<NotFound />} replace />

        </Routes>

        {loggedIn && <Footer />}

        <InfoTooltip
          isOpen={showInfoToolTip}
          onClose={closeAllPopups}
          res={result}
          text={textInfoTooltip}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name='delete-card' title='Вы уверены?' btnText='Да' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
