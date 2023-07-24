function Card(props) {
    const { card, onCardClick, currentUser, onCardLike, onCardDelete } = props;

    //открываем zoom-popup по клику на картинку
    function handleCardClick() {
        onCardClick(card);
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = card.owner._id === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //класс кнопки лайка
    const cardLikeButtonClassName = (
        `button-like ${isLiked && 'button-like_activ'}`
    );
    //класс кнопки удаления
    const cardDeleteButtonClassName = (
        `button-remove ${isOwner && ' button-remove_show'}`
    );

    //ставим лайк карточке 
    function handleLike() {
        onCardLike(card);
        //console.log(card);
    }

    //удаляем карточку
    function handleDeleteClick() {
        onCardDelete(card);
    }


    return (
        <article className="card">
            <div className="card__image" style={{ backgroundImage: `url(${card.link})` }}
                onClick={handleCardClick} />
            <div className="card__name">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like">
                    <button type="button" aria-label="Мне нравится." className={cardLikeButtonClassName} onClick={handleLike} />
                    <span className="card__like-counter">{card.likes.length}</span>
                </div>
            </div>
            <button type="button" aria-label="Удалить." className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
        </article>
    )
}

export default Card;