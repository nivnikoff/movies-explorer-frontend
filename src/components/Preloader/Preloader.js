import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
  if (props.searchNoResult || props.searchFailed || props.isSearching) {
  return (
    <div className="preloader">
      <span className={`preloader__message ${props.searchNoResult ? "preloader__message_noResult" : ""}`}>
        Ничего не найдено
      </span>
      <span className={`preloader__message ${props.searchFailed ? "preloader__message_searchFailed" : ""}`}>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
      </span>
      <div className={`preloader__container ${props.isSearching ? "preloader__container_active" : ""}`}>
        <span className="preloader__round"/>
      </div>
    </div>
  )
  }
};

export default Preloader
