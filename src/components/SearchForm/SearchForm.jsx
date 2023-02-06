import './SearchForm.css';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const [searchQuery, setSearchQuery] = useState(props.lastSearchQuery);
  const [tumblerStatus, setTumblerStatus] = useState(false);

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleTumblerChange() {
    setTumblerStatus(!tumblerStatus);
    
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(searchQuery);
  }

  useEffect(() => {
    setTumblerStatus(props.lastTumbler);
    setSearchQuery(props.lastSearchQuery);
  }, [props.lastTumbler, props.lastSearchQuery]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__bar">
            <input 
              name="searchQuery"
              type="search"
              placeholder="Фильм"
              value={searchQuery || ''}
              onChange={handleChange}
              className="search__input"
              required
            />
            <button className="search__btn" type="submit">Найти</button>
        </div>
        <div className="search__switch">
            <label className="search__toggle">
              <input 
                name="tumbler"
                type="checkbox"
                checked={tumblerStatus}
                onChange={handleTumblerChange}
                className="search__checkbox" 
              />
              <span className="search__checkbox-img"/>
            </label>
            <p className="search__checkbox-text">Короткометражки</p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;