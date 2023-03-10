import './Portfolio.css';
import arrow from '../../images/link-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://github.com/nivnikoff/how-to-learn" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="How to learn"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://nivnikoff.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img className="portfolio__link-img" src={arrow} alt="Russian Travel"/>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://nivnikoff.nomoredomains.club" target="_blank" rel="noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img className="portfolio__link-img" src={arrow} alt="Mesto"/>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;