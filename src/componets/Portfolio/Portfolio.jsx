import "./Portfolio.css"
import Bot_telegram from "../../assets/Bot_telegram.png"
import CarFix from "../../assets/CarFix.png"    

const portfolioItems = [
    {
        id: 1,
        image: Bot_telegram, 
        title: "Plataforma",
        description: "Desarrollado con python, flask",
        
    }, 
    {
        id: 2,
        image: CarFix,
        title: "Pagina de venta de repuestos",
        description: "Desarrollado con TypeScript ,Javascript, python y css.", 
        
    }, 
  
]
 

const Portfolio = () => {
  return (
    <div className="portfolio" id="portfolio">
        <h1>Portafolio</h1>
        <div className="portfolio-container">
            {portfolioItems.map((item) => (
                <div className="portfolio-card" key={item.id}>
                    <img src={item.image} alt={item.title} className="portfolio-image" />
                    <div className="portfolio-content">
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <a href={item.demoLink} target="_blank" rel="noopener norererrer" className="demo-button">
                            Ver demo
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Portfolio