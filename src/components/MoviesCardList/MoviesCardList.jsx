import './MoviesCardList.css';
import React, { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  const movies = props.movies;
  const [isLoading, setLoading] = useState(false);
  const handlePreloader = () => {
    setLoading(true);
  };

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {movies.map((movie) => {
          return(
            <MoviesCard
              key={movie._id}
              image={movie.image}
              nameRU={movie.nameRU}
              duration={movie.duration}
            />
          )
        })}
      </ul>
      {isLoading ? (
        <Preloader />
        ) : (
          <div className="moviesCardList__btn-container">
            <button className="moviesCardList__more-btn" type="button" name="more" onClick={handlePreloader}>Ещё</button>
          </div>
        )
      }
    </section>
  )
}

export default MoviesCardList;
