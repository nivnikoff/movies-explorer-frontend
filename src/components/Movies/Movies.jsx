import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
// import MoviesCardList from '../MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
  return (
    <>
      <Header loggedIn = {true} />
      <main className="movies">
        <SearchForm/>
        {/* <MoviesCardList/> */}
      </main>
      <Footer/>
    </>
  )
}

export default Movies;