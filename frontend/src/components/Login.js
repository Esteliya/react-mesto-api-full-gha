import React from 'react';
import Authorization from './Authorization'

function Login(props) {
    //бросаем данные для обработки выше
    const { handleDataForm, setCurrentRoute } = props;

    React.useEffect(() => {
        setCurrentRoute("/sign-in");
        //console.log(setCurrentRoute);
    }, [setCurrentRoute]);

    return (
        <Authorization
            title="Вход"
            name="login"
            button="Войти"
            handleDataForm={handleDataForm}>
        </Authorization>
    )
}
export default Login;