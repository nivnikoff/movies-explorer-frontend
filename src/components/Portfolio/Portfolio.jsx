import './Portfolio.css';
import arrow from '../../images/link-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/nivnikoff/how-to-learn">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="How to learn"></img>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/nivnikoff/russian-travel">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="Russian Travel"></img>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://nivnikoff.nomoredomains.club">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img className="portfolio__link-img" src={arrow} alt="Mesto"></img>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;