import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <Header loggedIn = {props.isLoggedIn} />
      <main className="movies">
        <SearchForm/>
        <MoviesCardList movies={props.movies}/>
        <div className="movies__btn-container">
          <button className="movies__more-btn" type="button" name="more">Ещё</button>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Movies;