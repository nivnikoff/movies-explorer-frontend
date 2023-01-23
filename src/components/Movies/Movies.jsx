import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import {movies} from '../../utils/utils';

function Movies() {
  return (
    <>
      <Header loggedIn = {true} />
      <main className="movies">
        <SearchForm/>
        <MoviesCardList movies={movies}/>
      </main>
      <Footer/>
    </>
  )
}

export default Movies;