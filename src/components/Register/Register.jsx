import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../UseFormWithValidation/UseFormWithValdation';

function Register(props) {
  const { values, isValid, handleChange, errors } = useFormWithValidation({
    userName: "",
    userEmail: "",
    userPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.onRegister({
        name: values.userName,
        email: values.userEmail,
        password: values.userPassword,
      });
    } 
  }

  return (
    <main className="register">
      <div className="register__header">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип Movies Explorer"/>
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
      </div>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__form-item">
          <label className="register__form-item-title">Имя</label>
          <input 
            name="userName"
            type="text"
            placeholder="Введите имя"
            minLength="2"
            maxLength="30"
            pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
            value={values.name}
            onChange={handleChange}
            className={`register__form-input ${errors.userName ? 'register__form-input_error' : ''}`} 
            required 
          />
          <span className="register__form-error">{errors.userName}</span>
        </fieldset>
        <fieldset className="register__form-item">
          <label className="register__form-item-title">E-mail</label>
          <input 
            name="userEmail"
            type="email"
            placeholder="Введите email"
            pattern='^.+@.+\..+$'
            value={values.email}
            onChange={handleChange}
            className={`register__form-input ${errors.userEmail ? 'register__form-input_error' : ''}`} 
            required 
          />
          <span className="register__form-error">{errors.userEmail}</span>
        </fieldset>
        <fieldset className="register__form-item">
          <label className="register__form-item-title">Пароль</label>
          <input 
            name="userPassword"
            type="password" 
            placeholder="Придумайте пароль (не менее 8 символов)"
            minLength="8"
            value={values.password}
            onChange={(e) => handleChange(e)}
            className={`register__form-input ${errors.userPassword ? 'register__form-input_error' : ''}`} 
            required 
          />
          <span className="register__form-error">{errors.userPassword}</span>
        </fieldset>
      
      <div className="register__footer">
        <button 
          className="register__btn" 
          type="submit"
          disabled={!isValid}
        >Зарегестрироваться</button>
        <div className="register__link-container">
          <p className="register__link-text">Уже зарегестрированы?</p>
          <Link className="register__link" to="/signin">Войти</Link>
        </div>
      </div>
      </form>
    </main>
  )
}

export default Register;