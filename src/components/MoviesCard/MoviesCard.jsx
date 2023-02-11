import "./MoviesCard.css";
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function MoviesCard(props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const saveBtnClassName = (`movie__save-btn ${isFavorite ? 'movie__save-btn_favorite' : ''}`);
  const thisMovie = props.thisMovie;
  const { pathname } = useLocation();

  function handleLikeClick() {
    const like = () => {
      setIsFavorite(true);
      props.onLike(thisMovie);
    };
    
    const unlike = () => {
      setIsFavorite(false);
      props.onUnlike(thisMovie);
    };

    isFavorite ? unlike() : like();
  }

  function handleDeleteClick() {
    setIsFavorite(false);
    props.onDelete(thisMovie);
  }

  const likeCheck = () => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    if (savedMovies) {
      if (!isFavorite) {
        const movie = savedMovies.find((favoriteMovie) => favoriteMovie.movieId === thisMovie.id);
        if (movie) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    }
  };
  useEffect(() => {
    likeCheck();
  });

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
            <button className={saveBtnClassName} type="button" onClick={handleLikeClick}/>
          ) : (
            <button className="movie__delete-btn" type="button" onClick={handleDeleteClick}/>
          )}
      </div>
    </li>
  )
}

export default MoviesCard;
