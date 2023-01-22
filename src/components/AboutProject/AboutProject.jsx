import './AboutProject.css';

function AboutProject() {
  return (
    <section className="project" id="aboutProject">
      <h2 className="project__title">О проекте</h2>
      <ul className="project__description">
        <li className="project__description-info">
          <h3 className="project__description-title">Дипломный проект включал 5 этапов</h3>
          <p className="project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project__description-info">
          <h3 className="project__description-title">На выполнение диплома ушло 5 недель</h3>
          <p className="project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project__timeline">
        <div className="project__timeline_backend">
          <p className="project__timeline-duration project__timeline-duration_green">1 неделя</p>
          <p className="project__timeline-title">Back-end</p>
        </div>

        <div className="project__timeline_frontend">
          <p className="project__timeline-duration project__timeline-duration_grey">4 недели</p>
          <p className="project__timeline-title">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
