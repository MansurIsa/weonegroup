import React from 'react'
import { Link } from 'react-router-dom'
import "./css/burgerMenu.css"

const BurgerMenu = () => {
    return (
        <div className='burger_menu_container'>
            <ul className="burger_list">
                <li><Link to="/">Ana səhifə</Link></li>
                <li><Link to="/about">Haqqımızda</Link></li>
                <li><Link to="/services">Xidmətlərimiz</Link></li>
                <li><Link to="/products">Məhsullar</Link></li>
                <li><Link to="/contact">Bizimlə əlaqə</Link></li>
            </ul>
        </div>
    )
}

export default BurgerMenu