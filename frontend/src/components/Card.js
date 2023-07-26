function Card(props) {
    const { card, onCardClick, currentUser, onCardLike, onCardDelete } = props;

    //открываем zoom-popup по клику на картинку
    function handleCardClick() {
        onCardClick(card);
        /* console.log(`currentUser._id: ${currentUser._id}`);
        console.log(`card: ${card}`);
        console.log(`card.owner._id: ${card.owner._id}`);
        console.log(`есть мой id?: ${currentUser._id === card.owner._id}`);
        console.log(`card.likes: ${card.likes}`);
        console.log(`typeof card.likes: ${typeof card.likes}`); */
    }

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = (card.owner._id || card.owner) === currentUser._id;
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i === currentUser._id);


    //const isLiked = card.owner._id === currentUser._id;

/*     function arrLikes() {
        const arr = card.likes
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id === currentUser._id) {
                return true;
            }
        }
        return false;
    }
    const isLiked = arrLikes; */


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