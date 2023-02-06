import './Movies.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';

function Movies(props) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState(JSON.parse(localStorage.getItem("searchQuery")));
  
  const [searchedMovies, setSearchedMovies] = useState([]);
  // const [shortsTumblerOn, setShortsTumblerOn] = useState(false);

  // const [savedMovies, setSavedMovies] = useState([]);

  function handleSearchMovies(searchQuery) {
    let filterResults;
    setIsSearching(true);
    setLastSearchQuery(searchQuery);
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    if (!localStorage.movies) {
      moviesApi.getMovies()
        .then((res)=> {
          localStorage.setItem('movies', JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
          setSearchFailed(true);
        });
    }
    filterResults = JSON.parse(localStorage.getItem('movies')).filter((movie) => {
      return movie.description // уточнить в Пачке, где лучше искать ключевые слова - в названиях фильмов или в описании
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
          // if (shortsTumblerOn) {
          //   const shortMovies = filterResults.filter(
          //     (movie) => movie.duration <= 40
          //   );
          //   setSearchedMovies(shortMovies);
          //   if (shortMovies.length === 0) {
          //     setSearchNoResult(true);
          //   }
          // } else {
          //   setSearchedMovies(filterResults);
          //   if (filterResults.length === 0) {
          //     setSearchNoResult(true);
          //   }
          // }
    localStorage.setItem("filteredMovies", JSON.stringify(filterResults));
    setSearchedMovies(filterResults);
    if (filterResults.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      setIsSearching(false);
      setSearchedMovies(filterResults);
  }
  
  const [addMoviesBtnActive, setAddMoviesBtnActive] = useState(false);
  
  // const [moviesNumber, setMoviesNumber] = useState(() => {
  //   if (window.innerWidth <= 480) {
  //     return 5;
  //   } else if (window.innerWidth <= 768) {
  //     return 8;
  //   } else if (window.innerWidth > 768) {
  //     return 12;
  //   }
  // });
  // const [moviesToAdd, setMoviesToAdd] = useState(() => {
  //   if (window.innerWidth <= 768) {
  //     return 2;
  //   } else if (window.innerWidth > 768) {
  //     return 3;
  //   }
  // });
  
  return (
    <>
      <Header loggedIn = {props.isLoggedIn} />
      <main className="movies">
        <SearchForm
          lastTumbler={false}
          lastSearchQuery={lastSearchQuery}
          onSubmit={handleSearchMovies}
        />
        <Preloader
          isSearching={isSearching}
          searchNoResult={searchNoResult}
          searchFailed={searchFailed}
        /> 
        <MoviesCardList movies={searchedMovies}/>
        <div className="movies__btn-container">
          <button 
            type="button"
            name="more"
            // onClick={showMoreMovies}
            className={`movies__more-btn ${addMoviesBtnActive ? 'movies__more-btn_active' : ''}`} 
          >Ещё</button>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Movies;