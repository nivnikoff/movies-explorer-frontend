import './SavedMovies.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { SHORTMOVIE } from '../../utils/constants';

function SavedMovies(props) {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [lastFavoriteSearchQuery, setLastFavoriteSearchQuery] = useState('');
  const [lastFavoriteTumblerStatus, setLastFavoriteTumblerStatus] = useState(false);

  const [searchedMovies, setSearchedMovies] = useState([]);

  function handleSearchMovies(searchQuery, tumblerStatus) {
    setIsSearching(true);

    setLastFavoriteSearchQuery(searchQuery);
    setLastFavoriteTumblerStatus(tumblerStatus);

    let filterResults;

    filterResults = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => {
      return movie.nameRU
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
    });
    localStorage.setItem('filteredFavoriteMovies', JSON.stringify(filterResults));
    renderMovies(tumblerStatus);
    setIsSearching(false);
  }

  function renderMovies(tumbler) {
    if (localStorage.filteredFavoriteMovies) {
      const filteredFavoriteMovies = JSON.parse(localStorage.getItem('filteredFavoriteMovies'));
      if (tumbler) {
        const shortFilteredFavoriteMovies = filteredFavoriteMovies.filter((movie) => movie.duration <= SHORTMOVIE);
        setSearchedMovies(shortFilteredFavoriteMovies);
        if (shortFilteredFavoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      } else {
        setSearchedMovies(filteredFavoriteMovies);
        if (filteredFavoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      }
    } else {
      const favoriteMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (tumbler) {
        const shortFavoriteMovies = favoriteMovies.filter((movie) => movie.duration <= SHORTMOVIE);
        setSearchedMovies(shortFavoriteMovies);
        if (shortFavoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      } else {
        setSearchedMovies(favoriteMovies);
        if (favoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      }
    }
  }

  function handleTumblerChange() {
    setLastFavoriteTumblerStatus(lastFavoriteTumblerStatus => {
      renderMovies(!lastFavoriteTumblerStatus);
      return !lastFavoriteTumblerStatus
    });
  }

  function handleDelete(movie) {
    const movieId = movie._id;
    mainApi.deleteMovie(movieId)
      .then(() => {
        const updatedFavoriteMovies = favoriteMovies.filter((favoriteMovie) => favoriteMovie._id !== movie._id);
        localStorage.setItem('savedMovies', JSON.stringify(updatedFavoriteMovies));
        setFavoriteMovies(updatedFavoriteMovies);
        renderMovies(lastFavoriteTumblerStatus);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    mainApi.getMovies()
      .then((res)=> {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        setSearchedMovies(res);
        setFavoriteMovies(res);
        localStorage.removeItem('filteredFavoriteMovies');
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header loggedIn = {props.isLoggedIn}/>
      <main className="savedMovies">
        <SearchForm
          lastTumbler={lastFavoriteTumblerStatus}
          lastSearchQuery={lastFavoriteSearchQuery}
          onSubmit={handleSearchMovies}
          onTumblerChange={handleTumblerChange}
        />
        <Preloader
          isSearching={isSearching}
          searchNoResult={searchNoResult}
        /> 
        <MoviesCardList 
          movies={searchedMovies}
          onDelete={handleDelete}
        />
      </main>
      <Footer/>
    </>
  )
}

export default SavedMovies;