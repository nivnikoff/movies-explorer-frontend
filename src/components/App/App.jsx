import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import React, { useState, useCallback, useEffect } from 'react';
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
import { SERVER_MESSAGE } from '../../utils/constants';

function App() {
  // Состояние пользователя
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('isLoggedIn')));
  // Состояния регистрации
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
  const [registerMessageSuccess, setRegisterMessageSuccess] = useState('');
  const [registerMessageFail, setRegisterMessageFail] = useState('');
  // Состояния авторизации
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [loginMessageSuccess, setLoginMessageSuccess] = useState('');
  const [loginMessageFail, setLoginMessageFail] = useState('');
  // Состояния редактирования профиля
  const [isEditSuccessful, setIsEditSuccessful] = useState(false);
  const [editMessageSuccess, setEditMessageSuccess] = useState('');
  const [editMessageFail, setEditMessageFail] = useState('');
  // Переменная для хука useHistory
  const history = useHistory();
  // Проверка токена
  const handleCheckToken = useCallback(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'));
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((res) => {
          const { _id, name, email } = res;
          setCurrentUser({ _id, name, email });
        })
        .catch((err) => {
          console.log(err);
          handleLogOut()
        })
    }
  }, []);
  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);
  // Состояние и переменные запросов
  const [isLoading, setIsLoading] = useState(false);
  const { register, login, edit } = SERVER_MESSAGE;
  // Обработка регистрации
  function handleRegister(data) {
    setIsLoading(true);
    mainApi.register(data)
      .then(() => {
        handleLogin(data);
        setIsRegisterSuccessful(true);
        setRegisterMessageSuccess(register.success);
        setIsLoading(false);
        setTimeout(() => setRegisterMessageSuccess(''), 5000);
      })
      .catch((err) => {
        console.log(err);
        setIsRegisterSuccessful(false);
        setRegisterMessageFail(register.fail);
        setIsLoading(false);
        setTimeout(() => setRegisterMessageSuccess(''), 5000);
      })
  }
  // Обработка входа
  function handleLogin(data) {
    setIsLoading(true);
    mainApi.login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('isLoggedIn', true);
          handleCheckToken();
          setIsLoginSuccessful(true);
          setLoginMessageSuccess(login.success);
          setIsLoading(false);
          setTimeout(() => setLoginMessageSuccess(''), 5000);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoginSuccessful(false);
        setLoginMessageFail(login.fail);
        setIsLoading(false);
        setTimeout(() => setLoginMessageSuccess(''), 5000);
      })
  }
  // Обработка выхода
  function handleLogOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({
      _id: '',
      name: '',
      email: '',
    });
  }
  // Обработка редактирования профиля 
  function handleEditProfile({ name, email }) {
    setIsLoading(true);
    mainApi.editUser(name, email)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setIsEditSuccessful(true);
        setEditMessageSuccess(edit.success);
        setIsLoading(false);
        setTimeout(() => setEditMessageSuccess(''), 5000);
      })
      .catch(err => {
        console.log(err);
        setIsEditSuccessful(false);
        setEditMessageFail(edit.fail);
        setIsLoading(false);
        setTimeout(() => setEditMessageFail(''), 5000);
      })
  }
  // Разметка страницы
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">

        <Switch>

          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn}/>
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
            onEdit={handleEditProfile}
            handleLogout={handleLogOut}
            isEditSuccessful={isEditSuccessful}
            editMessageSuccess={editMessageSuccess}
            editMessageFail={editMessageFail}
            isLoading={isLoading}
          />
          <Route path="/signup">
            {!isLoggedIn 
              ? <Register 
                onRegister={handleRegister} 
                isLoading={isLoading}
                isRegisterSuccessful={isRegisterSuccessful}
                registerMessageSuccess={registerMessageSuccess}
                registerMessageFail={registerMessageFail}
              /> 
              : <Redirect to="/" />
            }
          </Route>
          <Route path="/signin">
            {!isLoggedIn 
              ? <Login 
                onLogin={handleLogin} 
                isLoading={isLoading}
                isLoginSuccessful={isLoginSuccessful}
                loginMessageSuccess={loginMessageSuccess}
                loginMessageFail={loginMessageFail}
              /> 
              : <Redirect to="/" />
            }
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
