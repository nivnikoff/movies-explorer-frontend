import './SavedMovies.css';
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';

function SavedMovies(props) {
  useEffect(() => {
    mainApi.getMovies()
      .then((res)=> {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        renderMovies(lastFavoriteSearchQuery);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  const [searchNoResult, setSearchNoResult] = useState(false);
  const [lastFavoriteSearchQuery, setLastFavoriteSearchQuery] = useState(() => {
    if (localStorage.lastSearchQuery) { 
      return JSON.parse(localStorage.getItem('lastFavoriteSearchQuery'));
    } else { 
      return '';
    }});
  const [lastFavoriteTumblerStatus, setLastFavoriteTumblerStatus] = useState(() => {
    if (localStorage.lastTumblerStatus) { 
      return JSON.parse(localStorage.getItem('lastFavoriteTumblerStatus'));
    } else { 
      return false;
    }});

  const [searchedMovies, setSearchedMovies] = useState([]);

  function handleSearchMovies(searchQuery, tumblerStatus) {
    setIsSearching(true);

    setLastFavoriteSearchQuery(searchQuery);
    localStorage.setItem('lastFavoriteSearchQuery', JSON.stringify(searchQuery));
    setLastFavoriteTumblerStatus(tumblerStatus);
    localStorage.setItem('lastFavoriteTumblerStatus', JSON.stringify(tumblerStatus));

    let filterResults;

    filterResults = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => {
      return movie.description
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
        const shortFilteredFavoriteMovies = filteredFavoriteMovies.filter((movie) => movie.duration <= 40);
        setSearchedMovies(shortFilteredFavoriteMovies);
        if (shortFilteredFavoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      } else {
        setSearchedMovies(filteredFavoriteMovies);
        if (filteredFavoriteMovies.length === 0) { setSearchNoResult(true) } else { setSearchNoResult(false) };
      }
    } else {
      const favoriteMovies = JSON.parse(localStorage.getItem('savedMovies'));
      if (tumbler) {
        const shortFavoriteMovies = favoriteMovies.filter((movie) => movie.duration <= 40);
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
      localStorage.setItem('lastFavoriteTumblerStatus', JSON.stringify(!lastFavoriteTumblerStatus));
      return !lastFavoriteTumblerStatus
    });
  }

  function handleDelete(movie) {
    
  }

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