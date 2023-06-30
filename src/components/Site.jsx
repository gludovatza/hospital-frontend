import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Services from './Services'
import Contact from './Contact'
import Footer from './Footer'
import '.././index.css'
import '.././tailwind.css'

function Site() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default Site;
