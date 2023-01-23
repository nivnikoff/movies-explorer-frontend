import "./MoviesCard.css";
import React, {useState} from 'react';

function MoviesCard(props) {
  const [isFavorite, setFavorite] = useState(false);
  function handleFavoriteToogle() {
    setFavorite(!isFavorite);
  }
  const saveBtnClassName = (`movie__save-btn ${isFavorite ? 'movie__save-btn_favorite' : ''}`);

  return(
    <li className="movie">
      <img className="movie__img" src={props.image} alt={props.nameRU}/>
      <div className="movie__info-container">
        <div className="movie__info">
          <h2 className="movie__title">{props.nameRU}</h2>
          <button className={saveBtnClassName} type="button" onClick={handleFavoriteToogle}/>
        </div>
        <p className="movie__duration">{props.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;
