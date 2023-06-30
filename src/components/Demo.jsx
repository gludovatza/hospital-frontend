import React from 'react'
import './Demo.css'

const Demo = () => {
    return (
        <div className='demo' id='demo'>
            <div className='container'>
                <div className='col-1'>
                    <p>Lorem ipsum</p>
                    <p>Dolor sit amet</p>
                    <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam eu risus eget lectus sodales egestas sit amet ut nibh.</p>
                    <button className='button'>UGRÁS A WEBSHOPRA</button>
                </div>
                <div className='col-2'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/m_QhY1aABsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}

export default Demo
