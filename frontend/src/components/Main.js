import React from 'react';
import Card from './Card.js';
import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, setCurrentRoute } = props;

    const currentUser = useContext(CurrentUserContext);

    React.useEffect(() => {
        setCurrentRoute("/");
    }, []);

    return (
        <main>
            <section
                aria-label="Профиль пользователя"
                className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-block">
                        <img
                            src={currentUser.avatar} alt="Аватар профиля."
                            className="profile__avatar"
                            onClick={onEditAvatar} />
                    </div>
                    <div className="profile__data">
                        <div className="profile__user-name">
                            <h1 className="profile__user-firstname">{currentUser.name}</h1>
                            <button
                                type="button"
                                aria-label="Редактировать профиль."
                                className="edit-button "
                                onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__user-profession">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Добавить фотографию."
                    className="add-button"
                    onClick={onAddPlace} />
            </section>

            <section
                aria-label="Фотографии пользователя"
                className="cards">
                {cards.map((card) => {
                    return (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            currentUser={currentUser}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                        //console.log(card)
                    )
                })}
            </section>
        </main>
    )
}
export default Main;