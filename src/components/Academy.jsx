import React from 'react'
import background from './images/ujvideo.mp4'
import './Academy.css'

const Home = () => {
    return (
        <div className='academy'>
            <video src={background} autoPlay muted loop playsInline/>
            <div className='content'>
                <h2>Fejlesztés alatt...</h2>
                <a className="button" href='/xtrude'>
                    Vissza a főoldalra
                </a>
            </div>
        </div>
    )
}

export default Home
