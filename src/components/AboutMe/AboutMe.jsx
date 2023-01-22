import './AboutMe.css';
import studentImg from '../../images/student.jpg';
import { student } from '../../utils/utils';

function AboutMe() {
  return (
    <section className="student" id="aboutMe">
      <h2 className="student__title">Студент</h2>
      <div className="student__content">
        <div className="student__info">
          <div className="sudent__bio">
            <h3 className="student__name">{student.name}</h3>
            <p className="student__description">{student.description}, {student.age}</p>
            <p className="student__about">{student.about}</p>
          </div>
          <a className="student__link" href="https://github.com/nivnikoff">Github</a>
        </div>
        <img className="student__avatar" src={studentImg} alt="Константин Нивников"></img>
      </div>
    </section>
  )
}

export default AboutMe;
