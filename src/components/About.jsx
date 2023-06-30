import React from 'react'
import logos from '/logos.jpg'
import { Link } from 'react-scroll'
import './About.css'

const About = () => {
    return (
        <div className='about' id='about'>
            <div className='container'>
                <img src={logos} alt='Rólunk' />
                <div className='col-2'>
                    <h1 className='font-bold'>Rólunk</h1>
                    <span className='line'></span>
                    <p>Célunk, hogy segítsünk Önnek megőrizni egészségét, javítani fizikai és mentális állapotát és megfelelő orvosi ellátást biztosítani az esetleges betegségek esetén.</p>
                    <p className='secondary'>Szakdolgozói csapatunk nagy figyelmet fordít arra, hogy minden betegünket az egyéni igényeknek megfelelően kezeljük, és széles skálájú egészségügyi szolgáltatásokat kínáljunk.
                        Az általunk nyújtott szolgáltatások közé tartoznak a szakorvosi rendelések, laboratóriumi vizsgálatok, diagnosztikai képalkotó eljárások és rehabilitációs programok.</p>
                    <div className='button'>
                        <a href='/login'>Foglaljon időpontot</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default About
