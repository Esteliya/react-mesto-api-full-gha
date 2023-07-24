import React from 'react';

function Authorization(props) {
    const { title, name, button, children, handleDataForm } = props;


    // переменные состояния email и password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Обработчики изменения инпута
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    //ПРОБНАЯ КАСТОМНАЯ ВАЛИДАЦИЯ
    const [formValidity, setFormValidity] = React.useState({
        emailValid: false,
        passwordValid: false
    });
    //деструктурируем
    const { emailValid, passwordValid } = formValidity;
    //проверим, был ли инпут активным 
    const [emailTouch, setEmailTouch] = React.useState(false);
    const [passwordTouch, setPasswordTouch] = React.useState(false);

    function handleInputTouch(e) {
        switch (e.target.name) {
            case "email":
                setEmailTouch(true)
                break
            case "password":
                setPasswordTouch(true)
                break
        }
    }

    //дизейбл кнопки 
    const isSubmitDisabled = !emailValid || !passwordValid;
    const buttonDisabled = !isSubmitDisabled ? "authorization__button" : "authorization__button_disabled";


    //обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        //запишем и передадим данные инпутов 
        const data = {};
        data.email = email;
        data.password = password;
        handleDataForm(data);
    }

    React.useEffect(() => {
        const isEmailFilled = email.length > 6;
        const isPasswordFilled = password.length > 5;
        setFormValidity({
            emailValid: isEmailFilled,
            passwordValid: isPasswordFilled
        });
    }, [email, password, setFormValidity])



    return (
        <div className='authorization'>
            <h2 className="authorization__title">{title}</h2>
            <form name={name} method="post" onSubmit={handleSubmit}>
                <input
                    className="authorization__input"
                    type="email"
                    id="email"
                    required
                    name="email"
                    placeholder="Email"
                    value={email || ''}
                    onChange={handleChangeEmail}
                    onBlur={(e) => { handleInputTouch(e) }} />
                {(emailTouch && !emailValid) && <span className="authorization__input-error">Укажите свой email</span>}
                <input
                    className="authorization__input"
                    type="password"
                    id="password"
                    required
                    minLength="5" maxLength="20"
                    name="password"
                    placeholder="Пароль"
                    value={password || ''}
                    onChange={handleChangePassword}
                    onBlur={(e) => { handleInputTouch(e) }}
                />
                {(passwordTouch && !passwordValid) && <span className="authorization__input-error">Введите пароль</span>}
                <button disabled={isSubmitDisabled} type="submit" className={buttonDisabled}>{button}</button>
                {children}
            </form>
        </div>
    )
}
export default Authorization;