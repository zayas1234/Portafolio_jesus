import "./ContactForm.css"

const ContactForm = () => {
  return (
        <div className="contact" id="contact">
            <h1>Contacto</h1>
            <div className="contact-container">
                <div className="contact-info">
                   <div className="info-content">
                   <i className="fas fa-usercircle icon"></i>
                    <h2>INFORMACIÓN DE CONTACTO</h2>
                    <p>
                        <i className="fas fa-envelope"></i>
                        jesusvasquez4567@gmail.com
                    </p>
                    <p>
                        <i className="fas fa-phone"></i>
                        +58 (0424) 33 44 086
                    </p>
                   </div>
                </div>

                <div className="contact-form">
                    <h2>Envía tu Mensaje</h2>
                    <form action="https://formsubmit.co/jesusvasquez4567@gmail.com" method="POST">
                        <input type="text" name="name" placeholder="Nombres" required />
                        <input type="email" name="email" placeholder="Correo Electronico" required />
                        <textarea name="message"  placeholder="Mensajer" required></textarea>
                        <button type="submit">Enviar Mensaje</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ContactForm

