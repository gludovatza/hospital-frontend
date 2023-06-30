import React from 'react'
import './Home.css'
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from 'react-scroll'

const Home = () => {
    return (
        <div className='container'>
            <div className='home' id='home'>
                <div className='content'>
                    <h1>Egészségügyi</h1>
                    <h2 className='font-bold'>központ</h2>
                </div>
            </div>
            <Link to='about' smooth={true} duration={700} offset={20} className='triangle'>
                <ChevronDownIcon className="icon" />
            </Link>
        </div>
    )
}

export default Home
