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
  // Состояние любимых фильмов
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  // Состояния поиска
  const [isSearching, setIsSearching] = useState(false);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [lastFavoriteSearchQuery, setLastFavoriteSearchQuery] = useState('');
  const [lastFavoriteTumblerStatus, setLastFavoriteTumblerStatus] = useState(false);
  // Состояние отображаемых фильмов
  const [searchedMovies, setSearchedMovies] = useState([]);
  // Обработчик поиска
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
  // Отображение карточек фильмов
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
  // Обработчик переключения тумблера
  function handleTumblerChange() {
    setLastFavoriteTumblerStatus(lastFavoriteTumblerStatus => {
      renderMovies(!lastFavoriteTumblerStatus);
      return !lastFavoriteTumblerStatus
    });
  }
  // Обработчик удаления фильма
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
  // Загрузка информации о любимых фильмах
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