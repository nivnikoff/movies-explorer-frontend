import './Header.css';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <header className="header">
          <Navigation/>
        </header>
      ) : (
        <header className="header header_landing">
          <div className="header__container">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип Movies Explorer"></img>
            </Link>
            <div className="header__links">
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
              <Link className="header__link header__link_btn" to="/signin">
                Войти
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header;
