import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Register() {
  const [userName, setUserName] = useState("Константин");
  const [userEmail, setUSerEmail] = useState("pochta@yandex.ru");

  return (
    <main className="register">
      <div className="register__header">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип Movies Explorer"></img>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form">
        <fieldset className="register__form-item">
          <label className="register__form-item-title">Имя</label>
          <input className="register__form-input" type="text" defaultValue={userName} required />
          <span className="register__form-error">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="register__form-item">
          <label className="register__form-item-title">E-mail</label>
          <input className="register__form-input" type="email" defaultValue={userEmail} required />
          <span className="register__form-error">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="register__form-item">
          <label className="register__form-item-title">Пароль</label>
          <input className="register__form-input register__form-input_error" type="password" defaultValue="••••••••••••••" required />
          <span className="register__form-error register__form-error_active">Что-то пошло не так...</span>
        </fieldset>
      </form>
      <div className="register__footer">
        <button className="register__btn" type="submit">Зарегестрироваться</button>
        <div className="register__link-container">
          <p className="register__link-text">Уже зарегестрированы?</p>
          <Link className="register__link" to="/signin">Войти</Link>
        </div>
      </div>
    </main>
  )
}

export default Register;