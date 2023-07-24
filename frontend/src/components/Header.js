import React from 'react';
import { Link } from "react-router-dom";
import headerLogo from '../images/logo-mesto.svg';//лого Место

function Header(props) {
    const { email, loggedIn, currentRoute, handleExitProfile } = props;

    const [headerData, setHeaderData] = React.useState({});

    React.useEffect(() => {

        switch (currentRoute) {
            case "/":
                //console.log('мы на главной странице');
                setHeaderData({
                    name: 'Выход',
                    link: '/sign-in'
                })
                //console.log(loggedIn);
                break
            case "/sign-up":
                //console.log('мы на странице регистрации');
                setHeaderData({
                    name: 'Вход',
                    link: '/sign-in'
                })
                //console.log(loggedIn);
                break
            case "/sign-in":
                //console.log('мы на странице авторизации');
                setHeaderData({
                    name: 'Регистрация',
                    link: '/sign-up'
                })
                //console.log(loggedIn);
                break
            default:
                //console.log('мы на странице 404');
                setHeaderData({
                    name: 'На главную',
                    link: '/'
                })
                //console.log(loggedIn);
                break
        }
    }, [currentRoute])


    return (
        <header className="header">
            <img
                src={headerLogo}
                alt="Логотип Место."
                className="logo" />
            <nav className='header__menu'>
                {loggedIn ? <p className="header__email">{email}</p> : ''}
                <Link className="header__link"
                    to={headerData.link || ''}
                    onClick={headerData.name === "Выход" ? handleExitProfile : null}>
                    {headerData.name}
                </Link>

            </nav>
        </header>
    )
}
export default Header;