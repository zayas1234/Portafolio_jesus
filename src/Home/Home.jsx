import React from 'react'
import Hero from '../componets/Hero/Hero'
import About from '../componets/About/About'
import Skills from '../componets/Skills/Skills'
import Portfolio from '../componets/Portfolio/Portfolio'
import ContactForm from '../componets/ContacForm/ContactForm'
import Footer from '../componets/Footer/Footer'


function Home() {
  return (
    <div className="home">
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Home