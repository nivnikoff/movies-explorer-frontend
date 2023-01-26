import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Login() {
  const [userName, setUserName] = useState("Константин");
  const [userEmail, setUSerEmail] = useState("pochta@yandex.ru");

  return (
    <main className="login">
      <div className="login__header">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип Movies Explorer"></img>
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <form className="login__form">
        <fieldset className="login__form-item">
          <label className="login__form-item-title">E-mail</label>
          <input className="login__form-input" type="email" defaultValue={userEmail} required />
          <span className="login__form-error">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="login__form-item">
          <label className="login__form-item-title">Пароль</label>
          <input className="login__form-input" type="password" defaultValue="" required />
          <span className="login__form-error">Что-то пошло не так...</span>
        </fieldset>
      </form>
      <div className="login__footer">
        <button className="login__btn" type="submit">Войти</button>
        <div className="login__link-container">
          <p className="login__link-text">Ещё не зарегестрированы?</p>
          <Link className="login__link" to="/signup">Регистрация</Link>
        </div>
      </div>
    </main>
  )
}

export default Login;