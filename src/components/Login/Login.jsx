import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValdation';

function Login(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userEmail: "",
    userPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onLogin({
        email: values.userEmail,
        password: values.userPassword,
      });
    }
  };

  return (
    <main className="login">
      <div className="login__header">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип Movies Explorer"></img>
        </Link>
        <h2 className="login__title">Рады видеть!</h2>
      </div>
      <form className="login__form" onSubmit={handleSubmit}>
        <fieldset className="login__form-item">
          <label className="login__form-item-title">E-mail</label>
          <input 
            name="userEmail"
            type="email"
            placeholder="Введите email"
            value={values.email}
            onChange={handleChange}
            className={`login__form-input ${errors.userEmail ? 'login__form-input_error' : ''}`} 
            required 
          />
          <span className="login__form-error">{errors.userEmail}</span>
        </fieldset>
        <fieldset className="login__form-item">
          <label className="login__form-item-title">Пароль</label>
          <input 
            name="userPassword"
            type="password" 
            placeholder="Введите пароль"
            minLength="8"
            value={values.password}
            onChange={handleChange}
            className={`login__form-input ${errors.userPassword ? 'login__form-input_error' : ''}`} 
            required 
          />
          <span className="login__form-error">{errors.userPassword}</span>
        </fieldset>
      
      <div className="login__footer">
      <button 
          className="login__btn" 
          type="submit"
          disabled={!isValid}
        >Войти</button>
        <div className="login__link-container">
          <p className="login__link-text">Ещё не зарегестрированы?</p>
          <Link className="login__link" to="/signup">Регистрация</Link>
        </div>
      </div>
      </form>
    </main>
  )
}

export default Login;