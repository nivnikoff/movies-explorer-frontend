import { Route, Switch, useHistory } from 'react-router-dom';
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
import { mainApi } from '../../utils/MainApi';

function App() {
  // состояние пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Переменная для хука useHistory
  const history = useHistory();
  // Обработка регистрации
  function handleRegister(data) {
    mainApi.register(data)
      .then(() => {
        handleLogin(data);
      })
      .catch(err => console.log(err))
  }
  // Обработка входа
  function handleLogin(data) {
    mainApi.login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/movies');
        }
      })
      .catch(err => console.log(err))
  }

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
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}/>
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
