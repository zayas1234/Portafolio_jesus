import { useContext } from "react"
import { ThemeContext } from "../../ThemeContext/ThemeContex"
import "../ThemeToggle/ThemeToggle.css"

const ThemeToggle = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
  return (

    <button className="theme-toggle-button" onClick={toggleTheme}>
     
     <i className={theme === "light" ? "fas fa-moon" : "fas fa-sun"}></i>
    </button>
  )
}

export default ThemeToggle