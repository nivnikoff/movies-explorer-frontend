import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const movies = props.movies;
  const { pathname } = useLocation();

  return (
    <section className="moviesCardList">
      {pathname === '/movies' ? (
        <ul className="moviesCardList__list">
          {movies.map((movie) => {
            return(
              <MoviesCard
                thisMovie={movie}
                onLike={props.onLike}
                onUnlike={props.onUnlike}
                key={movie.id}
                image={`https://api.nomoreparties.co/${movie.image.url}`}
                nameRU={movie.nameRU}
                duration={movie.duration}
                trailer={movie.trailerLink}
              />
            )
          })}
        </ul>
      ) : (
        <ul className="moviesCardList__list">
          {movies.map((movie) => {
            return(
              <MoviesCard
                thisMovie={movie}
                onDelete={props.onDelete}
                key={movie._id}
                image={movie.image}
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
