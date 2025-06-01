import React from 'react'
import "./css/footer.css"
import Logo from '../header/logo/Logo'
import FooterLeft from './footerLeft/FooterLeft'
import FooterRight from './footerRight/FooterRight'

const Footer = () => {
  return (
    <footer>
        <div className="footer_container project_container">
            <Logo/>
            <div className="footer_middle_container">
                <FooterLeft/>
                <FooterRight/>
            </div>
            <p className='copyright'>© 2025 | Bütün hüquqlar qorunur</p>
        </div>
        

    </footer>
  )
}

export default Footer