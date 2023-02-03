import "./MoviesCard.css";
import React, {useState} from 'react';
import { useLocation, Link } from 'react-router-dom';

function MoviesCard(props) {
  const [isFavorite, setFavorite] = useState(false);
  function handleFavoriteToogle() {
    setFavorite(!isFavorite);
  }
  const { pathname } = useLocation();
  const saveBtnClassName = (`movie__save-btn ${isFavorite ? 'movie__save-btn_favorite' : ''}`);

  const formatDuration = (minutes) => {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    return hour ? `${hour}ч ${min}м` : `${min}м`;
  };

  return(
    <li className="movie">
      <Link className="movie__link" to={{pathname: `${props.trailer}`}} target="_blank">
        <img className="movie__img" src={props.image} alt={props.nameRU}/>
      </Link>
      <div className="movie__info-container">
        <div className="movie__info">
          <h2 className="movie__title">{props.nameRU}</h2>
          <p className="movie__duration">{formatDuration(props.duration)}</p>
        </div>
        {pathname === '/movies' ? (
            <button className={saveBtnClassName} type="button" onClick={handleFavoriteToogle}/>
          ) : (
            <button className="movie__delete-btn" type="button"/>
          )}
      </div>
    </li>
  )
}

export default MoviesCard;
