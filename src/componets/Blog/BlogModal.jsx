import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { fetchNews } from "../../api/exampleService"
import "./BlogModal.css"

const BlogModal = ({ open, onClose }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setError(null)
    fetchNews(4)
      .then((data) => {
        setArticles(data.articles || [])
        setLoading(false)
      })
      .catch(() => {
        setError("No se pudieron cargar las noticias")
        setLoading(false)
      })
  }, [open])

  if (!open) return null

  const modal = (
    <div className="blog-overlay" onClick={onClose}>
      <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">×</button>
        <h3>Noticias</h3>

        {loading && <p className="muted">Cargando...</p>}
        {error && <p className="error">{error}</p>}

        <ul className="posts-list">
          {articles.map((a) => (
            <li key={a.id} className="post-card">
              {a.image && <img src={a.image} alt={a.title} className="post-image" />}
              <h4>{a.title}</h4>
              <p>{a.description}</p>
              <div className="post-footer">
                <small className="muted">{new Date(a.publishedAt).toLocaleString()}</small>
                <button
                  className="nav-btn"
                  onClick={() => window.open(a.url, "_blank", "noopener,noreferrer")}
                  aria-label={`Leer ${a.title}`}
                >
                  Leer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

export default BlogModal