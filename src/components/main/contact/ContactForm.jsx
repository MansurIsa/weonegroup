import React from 'react'
import "./css/contactForm.css";

const ContactForm = () => {
    return (
        <div className='contact_form'>
            <div className="contact_form_container project_container">
                <p>Bizimlə əməkdaşlığa başlayın</p>
                <form>
                    <div className='firstname_lastname_form'>
                        <div>
                            <label htmlFor="">Ad</label>
                            <input placeholder='Adınızı daxil edin' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Soyad</label>
                            <input placeholder='Soyadınızı daxil edin' type="text" />
                        </div>
                    </div>
                    <div className='email_phone_textarea_form'>
                        <div className='email_phone_form'>
                            <div>
                                <label htmlFor="">Email</label>
                                <input placeholder='Email adresinizi daxil edin' type="email" />
                            </div>
                            <div>
                                <label htmlFor="">Telefon nömrəsi </label>
                                <input placeholder='Mobil nömrənizi daxil edin' type="tel" />
                            </div>
                        </div>
                        <div className='textarea_label_form'>
                            <label htmlFor="">Qeyd</label>
                            <textarea rows={7} name="" id="" placeholder='Qeydlərinizi yazın...'></textarea>
                        </div>
                    </div>
                    <button>Göndər</button>
                </form>
            </div>

        </div>
    )
}

export default ContactForm