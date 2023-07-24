import React from 'react';
import { Link } from "react-router-dom";
import notFound from '../images/404-error.png'

function NotFound() {

    return (
        <div className='not-found'>
            <img className='not-found__image' src={notFound} alt="Ошибка 404" />
            <Link to="/" name="на главную страницу" className='not-found__link' >Вернуться на главную страницу</Link>
        </div>
    )
}
export default NotFound;