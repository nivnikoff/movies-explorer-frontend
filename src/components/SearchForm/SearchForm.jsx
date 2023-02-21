import './SearchForm.css';
import { useEffect, useState } from 'react';

function SearchForm(props) {
  const [searchQuery, setSearchQuery] = useState(props.lastSearchQuery);
  const [tumblerStatus, setTumblerStatus] = useState(props.lastTumbler);

  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(searchQuery, tumblerStatus);
  }

  useEffect(() => {
    setTumblerStatus(props.lastTumbler);
  }, [props.lastTumbler]);

  useEffect(() => {
    setSearchQuery(props.lastSearchQuery);
  }, [props.lastSearchQuery]);

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
                onChange={props.onTumblerChange}
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