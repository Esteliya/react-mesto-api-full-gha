function ImagePopup(props) {
  const { card, onClose } = props;

  const popupClass = card._id ? ('popup popup_darck zoom-img-popup popup_open') : ('popup popup_darck zoom-img-popup');

  return (
    <div className={popupClass}>
      <div className="popup__card">
        <div className="popup__user-photo">
          <img className="popup__photo" alt={card.name} src={card.link} />
          <button type="button" onClick={onClose} aria-label="Закрыть." className="popup__close-button" id="close-img-card" />
          <h2 className="popup__photo-title">{card.name}</h2>
        </div>
      </div>
    </div>
  )
}
export default ImagePopup;