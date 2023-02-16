import './Movies.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';
import { SHORTMOVIE, MOVIES_GRID } from '../../utils/constants';

function Movies(props) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState(() => {
    if (localStorage.lastSearchQuery) { 
      return JSON.parse(localStorage.getItem('lastSearchQuery'));
    } else { 
      return '';
    }});
  const [lastTumblerStatus, setLastTumblerStatus] = useState(() => {
    if (localStorage.lastTumblerStatus) { 
      return JSON.parse(localStorage.getItem('lastTumblerStatus'));
    } else { 
      localStorage.setItem('lastTumblerStatus', false);
      return false;
    }});

  const [searchedMovies, setSearchedMovies] = useState([]);

  const { desktop, tablet, mobile } = MOVIES_GRID;
  const [moviesNumber, setMoviesNumber] = useState(() => {
    if (window.innerWidth <= mobile.width) {
      return mobile.moviesNumber;
    } else if (window.innerWidth <= tablet.width) {
      return tablet.moviesNumber;
    } else if (window.innerWidth > tablet.width) {
      return desktop.moviesNumber;
    }
  });

  const [addMoviesBtnActive, setAddMoviesBtnActive] = useState(false);
  const [moviesToAdd, setMoviesToAdd] = useState(() => {
    if (window.innerWidth <= tablet.width) {
      return tablet.moviesToAdd;
    } else if (window.innerWidth > tablet.width) {
      return desktop.moviesToAdd;
    }
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () =>
      setTimeout(() => {
        setWidth(window.innerWidth);
      }, 1000)
    );
  }, []);

  useEffect(() => {
    if (window.innerWidth <= mobile.width) {
      setMoviesNumber(mobile.moviesNumber);
      setMoviesToAdd(mobile.moviesToAdd);
    } else if (window.innerWidth <= tablet.width) {
      setMoviesNumber(tablet.moviesNumber);
      setMoviesToAdd(tablet.moviesToAdd);
    } else if (window.innerWidth > tablet.width) {
      setMoviesNumber(desktop.moviesNumber);
      setMoviesToAdd(desktop.moviesToAdd);
    };
  }, [width]);

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
          return movie.nameRU
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());
        });
        localStorage.setItem('filteredMovies', JSON.stringify(filterResults));
        renderMovies(tumblerStatus, moviesNumber);
        setIsSearching(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchFailed(true);
      });
    } else { 
      filterResults = JSON.parse(localStorage.getItem('movies')).filter((movie) => {
        return movie.nameRU
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
      });
      localStorage.setItem('filteredMovies', JSON.stringify(filterResults));
      renderMovies(tumblerStatus, moviesNumber);
      setIsSearching(false);
    }
  }

  function renderMovies(tumbler, moviesNumber) {
    if (localStorage.filteredMovies) {
    const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
    if (tumbler) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= SHORTMOVIE);
      if (shortMovies.length > moviesNumber) { setAddMoviesBtnActive(true) } else { setAddMoviesBtnActive(false) };
      setSearchedMovies(shortMovies.slice(0, moviesNumber));
      if (shortMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
    } else {
      if (filteredMovies.length > moviesNumber) { setAddMoviesBtnActive(true) } else { setAddMoviesBtnActive(false) };
      setSearchedMovies(filteredMovies.slice(0, moviesNumber));
      if (filteredMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
    }
  }
  }

  function handleTumblerChange() {
    if (localStorage.filteredMovies) {
      setLastTumblerStatus(lastTumblerStatus => {
        renderMovies(!lastTumblerStatus, moviesNumber);
        localStorage.setItem('lastTumblerStatus', JSON.stringify(!lastTumblerStatus));
        return !lastTumblerStatus
      });
    } else {
      setLastTumblerStatus(lastTumblerStatus => {
        localStorage.setItem('lastTumblerStatus', JSON.stringify(!lastTumblerStatus));
        return !lastTumblerStatus
      });
    }
  }

  function showMoreMovies() {
    const newMoviesNumber = moviesNumber + moviesToAdd;
    setMoviesNumber(moviesNumber => {
      renderMovies(lastTumblerStatus, newMoviesNumber);
      localStorage.setItem('moviesNumber', JSON.stringify(newMoviesNumber));
      return newMoviesNumber
    });
  }

  useEffect(() => {
    if (localStorage.movies) {
      setMoviesNumber(moviesNumber => {
        if (localStorage.moviesNumber) {
          const renderMoviesNumber = JSON.parse(localStorage.getItem('moviesNumber'));
          renderMovies(lastTumblerStatus, renderMoviesNumber);
          return renderMoviesNumber;
        } else {
          renderMovies(lastTumblerStatus, moviesNumber);
          return moviesNumber;
        }
      })
    }
  }, [lastTumblerStatus, moviesNumber]);

  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    if (localStorage.savedMovies) { 
      return JSON.parse(localStorage.getItem('savedMovies'));
    } else { 
      return [];
    }});
  useEffect(() => {
    mainApi.getMovies()
      .then((res)=> {
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLike(movie) {
    mainApi.createMovie(movie)
      .then((favoriteMovie) => {
        const updatedFavoriteMovies = [...favoriteMovies, favoriteMovie];
        setFavoriteMovies(updatedFavoriteMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedFavoriteMovies));
      })
      .catch((err) => console.log(err));
  }

  function handleUnlike(movie) {
    const movieToDelete = favoriteMovies.find((favoriteMovie) => favoriteMovie.movieId === movie.id);
    const movieId = movieToDelete._id;
    mainApi.deleteMovie(movieId)
      .then(() => {
        const updatedFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie.movieId !== movie.id);
        setFavoriteMovies(updatedFavoriteMovies);
        localStorage.setItem('savedMovies', JSON.stringify(updatedFavoriteMovies));
      })
      .catch((err) => console.log(err));
  }
  
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
        <MoviesCardList 
          movies={searchedMovies}
          onLike={handleLike}
          onUnlike={handleUnlike}
        />
        <div className="movies__btn-container">
          <button 
            type="button"
            name="more"
            className={`movies__more-btn ${addMoviesBtnActive ? 'movies__more-btn_active' : ''}`} 
            onClick={showMoreMovies}
          >Ещё</button>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default Movies;