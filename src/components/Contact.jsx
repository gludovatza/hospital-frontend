import React, { useRef, useState } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {

    const form = useRef();
    const [disabled, setDisabled] = useState(false);
    const [message, setMessage] = useState("");
    let send = true;

    const sendEmail = (e) => {
        if (send) {
            send = false;
            e.preventDefault();
            setDisabled(true);
            setMessage("Küldés folyamatban...");

            emailjs.sendForm('service_nx2twmi', 'template_hytr6tr', form.current, '7RvRiJyTmfqCFnocI')
                .then(() => {
                    setMessage("Köszönjük megkeresését,\nhamarosan válaszolunk Önnek!");
                    setDisabled(false);
                    send = true;
                }, (error) => {
                    console.log(error.text);
                    setMessage("A küldés során hiba történt. Kérjük, próbálja meg később, vagy vegye fel velünk a kapcsolatot telefonon vagy e-mailben!");
                    setDisabled(false);
                    send = true;
                });
        }
    };

    return (
        <div className='contact' id='contact'>
            <div className='background'>
                <div className="content">
                    <h1 className='font-bold'>Kapcsolat</h1>
                    <span className='line'></span>
                    <p>Információt kérne szolgáltatásainkkal kapcsolatban?</p>
                    <p>Nem tudja, melyik kezelést vegye igénybe?</p>
                    <p>Vegye fel velünk a kapcsolatot!</p>

                    <form ref={form} onSubmit={sendEmail}>
                        <label>Név</label>
                        <input className="bg-gray-100" type="text" name="name" placeholder="Név" required />
                        <label>E-mail cím</label>
                        <input className="bg-gray-100" type="text" name="email" placeholder="E-mail cím" required />
                        <label>Üzenet</label>
                        <textarea className="bg-gray-100" name="message" placeholder="Üzenet" required></textarea>
                        <input disabled={disabled} className="button mb-0" type="submit" value="Küldés" />
                        {message ?
                            <span className='text-center mt-5 font-semibold'>
                                {message}
                            </span> : null
                        }
                    </form>

                    <p className='mb-3'>További elérhetőségeink:</p>
                    <div className='info'>
                        <div>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <a href="mailto:kozpontegeszsegugyi@gmail.com" className='pl-2 pr-0 py-0'>kozpontegeszsegugyi@gmail.com</a>
                        </div>
                        <div className='phone'>
                            <div>
                                <FontAwesomeIcon icon={faPhone} />
                                <a href="tel:06123456789" className='pl-2 pr-0 py-0'>+36123456789</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
