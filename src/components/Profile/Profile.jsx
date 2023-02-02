import './Profile.css';
import React, { useContext, useState, useRef, useEffect } from 'react'; 
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValdation';

function Profile(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues } = useFormWithValidation();

  useEffect(() => {
    setValues({
      userName: currentUser.name,
      userEmail: currentUser.email,
    });
  }, [setValues, currentUser.name, currentUser.email]);

  const btnEditStatus = isValid && (values.userName !== currentUser.name || values.userEmail !== currentUser.email);

  function handleSubmit(e) {
    e.preventDefault();
    props.onEdit({ 
      name: values.userName,
      email: values.userEmail 
    });
  }

  return (
    <>
      <Header loggedIn = {props.isLoggedIn} />
      <main className="profile">
        <h2 className="profile__header">Привет, {currentUser.name}!</h2>
        <form className="profile__inputs" onSubmit={handleSubmit}>
          <fieldset className="profile__container profile__container_name">
            <label className="profile__input-name">Имя</label>
            <input 
              name="userName"
              type="text"
              placeholder="Введите имя"
              value={values.userName || ""}
              minLength="2"
              maxLength="30"
              pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
              onChange={handleChange}
              className="profile__input" 
              required 
            />
          </fieldset>
          <fieldset className="profile__container profile__container_email">
            <label className="profile__input-name">E-mail</label>
            <input 
              name="userEmail"
              type="email"
              placeholder="Введите email"
              value={values.userEmail || ""}
              onChange={handleChange}
              className="profile__input"
              required 
            />
          </fieldset>
        <div className="profile__buttons">
          <button 
            type="submit"
            className="profile__btn profile__btn_edit" 
            disabled={!btnEditStatus}
          >Редактировать</button>
          <button 
            className="profile__btn profile__btn_logout"
            onClick={props.handleLogout}
          >Выйти из аккаунта</button>
        </div>
        </form>
      </main>
    </>
  )
}

export default Profile;
