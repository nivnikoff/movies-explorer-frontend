import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import React, { useState } from 'react';

function MoviesCardList(props) {
  const movies = props.movies;
  const [isLoading, setLoading] = useState(false);

  return (
    <section className="moviesCardList">
      {isLoading ? (
        <Preloader/>
      ) : (
        <ul className="moviesCardList__list">
          {movies.map((movie) => {
            return(
              <MoviesCard
                key={movie.id}
                image={`https://api.nomoreparties.co/${movie.image.url}`}
                nameRU={movie.nameRU}
                duration={movie.duration}
                trailer={movie.trailerLink}
              />
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
