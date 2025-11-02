import "./Hero.css"
import foto from "../../assets/foto.png"

const Hero = () => {
  return (
    <div className="hero" id="hero">
    <div className="text-container">
      <span>Hola soy,</span>
      <h1>Jesus Vasquez</h1>
      <p>Soy un joven apasionado por la programacion tanto de frontend como de backend,tambien soy muy fan de los videojuegos y la tecnologia.</p>
        <a href="https://w.app/umznpe"
        target="_blank"
        className="btn"
        >Contáctame</a>
      </div>

      <div className="image-container">
        <div className="circle-bg"></div>
        <img src={foto} alt="foto"/>
      </div>
    </div>
  )
}

export default Hero