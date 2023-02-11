import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const movies = props.movies;

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
        {movies.map((movie) => {
          return(
            <MoviesCard
              thisMovie={movie}
              onLike={props.onLike}
              onUnlike={props.onUnlike}
              onDelete={props.onDelete}
              key={movie.id}
              image={`https://api.nomoreparties.co/${movie.image.url}`}
              nameRU={movie.nameRU}
              duration={movie.duration}
              trailer={movie.trailerLink}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default MoviesCardList;
