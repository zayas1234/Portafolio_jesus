import "../Navbar/Navbar.css"
import logo_light from "../../assets/logo_light.png"
import logo_dark from "../../assets/logo_dark.png"
import { useContext, useState } from "react"
import { ThemeContext } from "../../ThemeContext/ThemeContex" 
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import BlogModal from "../Blog/BlogModal"


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const handleScoll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({behavior: "smooth", block: "start" })
    }
    setMenuOpen(false)
  }

  return (
    <nav>
      <img src={theme === "light" ? logo_light : logo_dark} alt="logo" className="logo" />
        <ul className={menuOpen ? "active" : ""}>
            <li><a href="#" onClick={(e)=> handleScoll(e, "hero")} >Home</a></li>
            <li><a href="#about"  onClick={(e)=> handleScoll(e, "about")} >Sobre mi</a></li>
            <li><a href="skills"  onClick={(e)=> handleScoll(e, "skills")}  >Habilidades</a></li>
            <li><a href="#portfolio"  onClick={(e)=> handleScoll(e, "portfolio")}  >Portafolio</a></li>
            <li><a href="#contact"  onClick={(e)=> handleScoll(e, "contact")}  >Contacto</a></li>
            <li>
            <button
                className="nav-btn"
                onClick={() => {
                  setBlogOpen(true);
                  setMenuOpen(false); 
                }}
              >
                Noticias
              </button>
            </li>
              
           
            

            <i className="fa-solid fa-xmark"onClick={()=> setMenuOpen(false)}></i>
      </ul>

      <ThemeToggle />

      <i className="fa-solid fa-bars" onClick={() => setMenuOpen(true)}></i>
      <BlogModal open={blogOpen} onClose={() => setBlogOpen(false)} />
    </nav>
  )
}

export default Navbar