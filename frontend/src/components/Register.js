import React from 'react';
import Authorization from './Authorization'

function Register(props) {
    //бросаем данные для обработки выше
    const { handleDataForm, setCurrentRoute } = props;

    React.useEffect(() => {
        setCurrentRoute("/sign-up");
    }, [setCurrentRoute]);

    return (
        <Authorization
            title="Регистрация"
            name="register"
            button="Зарегистрироваться"
            handleDataForm={handleDataForm}>
            <p className="authorization__question">Уже зарегистрированы?
                <a href="/sign-in" name="Войти" className="authorization__question_link"> Войти</a>
            </p>
        </Authorization>
    )
}
export default Register;