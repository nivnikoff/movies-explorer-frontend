import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={logo} alt="Логотип Movies Explorer"></img>
      </Link>
      <div className="navigation__container">
        <div className="navigation__links">
          <Link className="navigation__link navigation__link_movies" to="/movies">
            Фильмы
          </Link>
          <Link className="navigation__link navigation__link_saved" to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </div>
        <Link className="navigation__link navigation__link_profile" to="/profile">
          Аккаунт
        </Link>
      </div>
    </nav>
  )
}

export default Navigation;