import "./Footer.css"

const Footer = () => {

    const currentYear = new Date().getFullYear();
  return (
     <footer className="footer">
        <hr />
        <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/zayas1234" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
            </a>
        </div>

        <p>Copyright {currentYear} © edukuk.dev - Todos los derechos reservados.</p>
     </footer>
  )
}

export default Footer