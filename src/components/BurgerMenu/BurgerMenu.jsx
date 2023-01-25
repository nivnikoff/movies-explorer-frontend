import './BurgerMenu.css';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleMenu = () => setShowMenu(!showMenu);
  const { pathname } = useLocation();

  return (
    <nav className="burger">
      <button className="burger__btn-menu" type="button" onClick={handleToggleMenu}/>
      <div className={`burger__container ${showMenu ? 'burger__container_visible' : ''}`}>
        <div className="burger__sidebar">
        <button className="burger__btn-close" type="button" onClick={handleToggleMenu}></button>
          <div className="burger__list">
            <div className="burger__links">
              <Link to="/" className="burger__link">Главная</Link>
              <Link to="/movies" className={`burger__link ${pathname === '/movies' ? 'burger__link_current' : ''}`}>Фильмы</Link>
              <Link to="/saved-movies" className={`burger__link ${pathname === '/saved-movies' ? 'burger__link_current' : ''}`}>Сохранённые фильмы</Link>
            </div>
            <Link to="/profile" className="burger__link burger__link_profile">Аккаунт</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BurgerMenu;