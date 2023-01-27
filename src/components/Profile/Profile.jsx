import './Profile.css';
import React, { useState } from 'react'; 
import Header from '../Header/Header';

function Profile() {
  const [userName, setUserName] = useState("Константин");
  const [userEmail, setUSerEmail] = useState("pochta@yandex.ru");

  return (
    <>
      <Header loggedIn = {true} />
      <main className="profile">
        <h2 className="profile__header">Привет, {userName}!</h2>
        <form className="profile__inputs">
          <fieldset className="profile__container profile__container_name">
            <label className="profile__input-name">Имя</label>
            <input className="profile__input" defaultValue={userName} required />
          </fieldset>
          <fieldset className="profile__container profile__container_email">
            <label className="profile__input-name">E-mail</label>
            <input className="profile__input" defaultValue={userEmail} required />
          </fieldset>
        </form>
        <div className="profile__buttons">
          <button className="profile__btn profile__btn_edit">Редактировать</button>
          <button className="profile__btn profile__btn_logout">Выйти из аккаунта</button>
        </div>
      </main>
    </>
  )
}

export default Profile;
