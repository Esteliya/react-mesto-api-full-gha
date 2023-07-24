import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const { isOpen, onClose, onUpdateAvatar } = props;

    const ref = React.useRef();

    //отправка данных вверх
    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            btnText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                type="url"
                required
                id="avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                className="edit-form__personalia"
                ref={ref} />
            <span className="avatar-error edit-form__personalia-error" />
        </ PopupWithForm>
    )
}

export default EditAvatarPopup;