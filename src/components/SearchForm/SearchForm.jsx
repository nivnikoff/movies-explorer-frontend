import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__bar">
            <input className="search__input" type="search" placeholder="Фильм" required/>
            <button className="search__btn" type="submit">Найти</button>
        </div>
        <div className="search__switch">
            <label className="search__toggle">
              <input className="search__checkbox" type="checkbox"/>
              <span className="search__checkbox-img"/>
            </label>
            <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;