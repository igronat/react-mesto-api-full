import React, { useState } from 'react';
import Header from './Header';
import { Link} from 'react-router-dom';

function Register({ handleRegister}) {

    const [data, setData] = useState({ 
        email: '', 
        password: ''
    });
    const {email, password} = data;
   
    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value 
        });
    };

    function handleSubmit(e){
        e.preventDefault();
        const { email, password } = data;
        handleRegister(email, password)
          
    };

    return (
        <>
        <Header 
        menu='Войти'
        link='/signin'
        />
        
        <main className="content content__form">
            
        <form className="form" onSubmit={handleSubmit}>
          <p className="form__header">Регистрация</p>
          <input required id="email" value={email} onChange={handleChange} name="email" type="email" placeholder='Email' className="form__input"/>
          <input required id="password" value={password} onChange={handleChange} name="password" type="password" placeholder='Пароль' className="form__input"/>
          <button type="submit" className="form__button" >Зарегистрироваться</button>
        </form>
        <div className="signup">
          <p className='signup__text'>Уже зарегистрированы?</p>
          <Link to="/signin" className="signup__text signup__link">Войти</Link>
        </div>

        </main>
        
        </>
    )
};

export default Register