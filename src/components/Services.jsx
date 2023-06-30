import React from 'react'
import szakorvosi from './images/szakorvosi.jpg'
import borgyogyaszat from './images/borgyogyaszat.jpg'
import eletmod from './images/eletmod.jpg'
import gyermekgyogyaszat from './images/gyermekgyogyaszat.jpg'
import gyogytorna from './images/gyogytorna.jpg'
import laborvizsgalat from './images/laborvizsgalat.jpg'
import terapia from './images/terapia.jpg'
import ultrahang from './images/ultrahang.jpg'
import './Services.css'

const Services = () => {
    return (
        <div className='services' id='services'>
            <div className='container'>
                <h1 className='font-bold'>Szolgáltatások</h1>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={szakorvosi} alt="Vizsgálat" />
                        <div className="details">
                            <h2>Szakorvosi vizsgálatok</h2>
                            <p>Az orvosaink által végzett szakszerű vizsgálatok segítségével átfogó képet kaphat az adott eset állapotáról és lehetséges megoldási javaslatairól.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={borgyogyaszat} alt="fdm print nyomtatás" />
                        <div className="details">
                            <h2>Bőrgyógyászati vizsgálat</h2>
                            <p>Bőrprobléma esetén tapasztalt bőrgyógyászaink segítségével azonosítjuk a probléma okát és ajánlunk megfelelő kezelést.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={terapia} alt="lézergravírozás" />
                        <div className="details">
                            <h2>Speciális kezelések és terápiák</h2>
                            <p>A kezelések során ápolóink magas színvonalú ellátást nyújtanak, hogy segítsenek Önnek megőrizni egészségét és javítani jólétét.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={gyermekgyogyaszat} alt="lézergravírozás" />
                        <div className="details">
                            <h2>Gyermekgyógyászat</h2>
                            <p>Gyermekorvosaink újszülött kortól kezdve segítenek az egészségük megőrzésében és a rendellenességek gyógyításában.</p>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='card'>
                        <img src={gyogytorna} alt="3d scan" />
                        <div className="details">
                            <h2>Gyógytorna és<br />masszázs</h2>
                            <p>Fizioterapeutáink és masszőreink segítségével javíthatja mozgásszervi funkcióit és enyhíthet fájdalmain.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={eletmod} alt="cad tervezés" />
                        <div className="details">
                            <h2>Életmód tanácsadás</h2>
                            <p>Dietetikusunk segítséget nyújt Önnek, hogyan érezze magát jobban  a bőrében, legyen energikusabb és egészségesebb.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={laborvizsgalat} alt="3d nyomtató beállítás javítás" />
                        <div className="details">
                            <h2>Laborvizsgálatok</h2>
                            <p>A laborvizsgálatok során számos információhoz juthatunk szervezetünkkel kapcsolatban, így lehetőségünk van felismerni a különböző betegségeket.</p>
                        </div>
                    </div>
                    <div className='card'>
                        <img src={ultrahang} alt="3d nyomtató beállítás javítás" />
                        <div className="details">
                            <h2>Ultrahang és<br />röntgen vizsgálatok</h2>
                            <p>A modern képalkotó eljárásokkal fájdalommentesen mérjük fel a páciens egészségügyi állapotát.</p>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <a href='/login' className='button'>Foglaljon időpontot</a>
                </div>


            </div>
        </div>
    )
}

export default Services
