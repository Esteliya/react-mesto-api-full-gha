import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose, onAddPlace } = props;


    //переменые полей имени и о себе пользователя
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }


    //отправка данных вверх
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    //используем данные, полученные из api выше
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    //валидация: переменные состояния ???

    //класс стилей ошибки инпута
    const activError = 'name-card-error edit-form__personalia-error'

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            btnText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                type="text"
                required
                minLength="2" maxLength="30"
                id="name-card"
                name="name"
                placeholder="Название"
                className="edit-form__personalia"
                onChange={handleNameChange}
                value={name} />
            <span className={activError}>Ошибка</span>
            <input
                type="url"
                required
                id="images"
                name="link"
                placeholder="Ссылка на картинку"
                className="edit-form__personalia"
                onChange={handleLinkChange}
                value={link} />
            <span className={activError}>Ошибка</span>
        </ PopupWithForm>
    )
}

export default AddPlacePopup;