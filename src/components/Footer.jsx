import React from 'react'
import './Footer.css'
import logo from '../logo.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='bottom'>
                    <img src={logo} alt='logo' className='h-14'/>
                    <p className='font-semibold mt-4 mb-4 text-xl'>Egészségügyi Központ</p>
                    <p className="text-base">Minden jog fenntartva © 2023</p>
                    <p className="text-base">Fejlesztő: Iszak Péter</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
