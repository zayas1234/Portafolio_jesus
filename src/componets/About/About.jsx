import "./About.css"
import foto from "../../assets/foto.png"

const About = () => {
  return (
     <div className="about-details" id="about">
        <div className="circle-bg"></div>
        <img src={foto} alt="sobre mi" />
        <div className="about-infos">
            <h1>Sobre mí</h1>
            <p className="description">
                Soy desarrollador web aprendiz y me estoy especializando en JavaScript, ReactJS y Html y Css.
                Me gusta crear cosas nuevas y aun mas experimentar con ellas, me gusta aprender cosas nuevas y me
                gusta trabajar en equipo para lograr nuevos objetivos.
            </p>
            <div className="experience-section">
                <div className="experience">
                    <i className="fas fa-plus"></i>
                    <span>1</span>
                    <p>Años de experiencia</p>
                </div>
                <div className="experience">
                    <i className="fas fa-plus"></i>
                    <span>2</span>
                    <p>Proyectos realizados</p>
                </div>
                <div className="experience">
                    <i className="fas fa-plus"></i>
                    <span>1</span>
                    <p>Trabajos profesionales</p>
                </div>
            </div>
        </div>
     </div>
  )
}

export default About