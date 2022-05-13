import React from 'react';
import logo from '../images/logomesto.svg';
import { Link } from 'react-router-dom';

function Header({
    name,
    menu,
    link,
    email,
    signOut
}) {

    return (
        <header className="header">
            <img className="logo" alt="логотип" src={logo}/>
            <div className={`header__menu header__menu_type_${name}`}>
               <h1 className="header__email">{email}</h1>
               <Link onClick={signOut} to={link} className={`header__link header__link_type_${name}`}>{menu}</Link>
            </div>
        </header>
    );
};

export default Header
