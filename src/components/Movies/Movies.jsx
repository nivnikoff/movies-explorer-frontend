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
  const [lastSearchQuery, setLastSearchQuery] = useState(JSON.parse(localStorage.getItem("lastSearchQuery")));
  const [lastTumblerStatus, setLastTumblerStatus] = useState(false);
  
  const [searchedMovies, setSearchedMovies] = useState([]);

  // const [savedMovies, setSavedMovies] = useState([]);

  function handleSearchMovies(searchQuery, tumblerStatus) {
    setIsSearching(true);

    setLastSearchQuery(searchQuery);
    localStorage.setItem('lastSearchQuery', JSON.stringify(searchQuery));
    setLastTumblerStatus(tumblerStatus);
    localStorage.setItem('lastTumblerStatus', JSON.stringify(tumblerStatus));

    let filterResults;

    if (!localStorage.movies) {
      moviesApi.getMovies()
      .then((res)=> {
        localStorage.setItem('movies', JSON.stringify(res));
        filterResults = res.filter((movie) => {
          return movie.description
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());
        });
        localStorage.setItem('filteredMovies', JSON.stringify(filterResults));
        renderMovies(tumblerStatus);
        setIsSearching(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchFailed(true);
      });
    } else { 
      filterResults = JSON.parse(localStorage.getItem('movies')).filter((movie) => {
        return movie.description
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      });
      localStorage.setItem('filteredMovies', JSON.stringify(filterResults));
      renderMovies(tumblerStatus);
      setIsSearching(false);
    }
  }

  function renderMovies(tumbler) {
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (tumbler) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= 40);
      setSearchedMovies(shortMovies);
      if (shortMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
    } else {
      setSearchedMovies(filteredMovies);
      if (filteredMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
    }
  }

  function handleTumblerChange() {
    setLastTumblerStatus(lastTumblerStatus => {
      renderMovies(!lastTumblerStatus);
      return !lastTumblerStatus
    });
    localStorage.setItem('lastTumblerStatus', JSON.stringify(lastTumblerStatus));
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
          lastTumbler={lastTumblerStatus}
          lastSearchQuery={lastSearchQuery}
          onSubmit={handleSearchMovies}
          onTumblerChange={handleTumblerChange}
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