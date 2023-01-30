import { Route, Switch } from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  // состояние пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Switch>

          <Route exact path="/">
            <Main/>
          </Route>
          <ProtectedRoute 
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
          />
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>

        </Switch>
      
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
