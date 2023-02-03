import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import {savedMovies} from '../../utils/utils';

function SavedMovies(props) {
  return (
    <>
      <Header loggedIn = {props.isLoggedIn}/>
      <main className="savedMovies">
        <SearchForm/>
        <MoviesCardList movies={savedMovies}/>
      </main>
      <Footer/>
    </>
  )
}

export default SavedMovies;