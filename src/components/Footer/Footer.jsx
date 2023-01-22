import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__container">
        <p className="footer__copyright">&copy; 2023</p>
        <nav className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/nivnikoff" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
