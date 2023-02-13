import './PageNotFound.css';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
const history = useHistory();

  return (
    <div className="not-found">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__link" onClick={history.goBack}>Назад</button>
    </div>
  );
};

export default PageNotFound;