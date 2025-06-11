import React, { useState } from 'react';
import './css/nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="burger" onClick={() => setIsOpen(prev => !prev)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav_list ${isOpen ? 'open' : ''}`}>
        <li><Link to="/">Ana səhifə</Link></li>
        <li><Link to="/about">Haqqımızda</Link></li>
        <li><Link to="/services">Xidmətlərimiz</Link></li>
        <li><Link to="/products">Məhsullar</Link></li>
        <li><Link to="/contact">Bizimlə əlaqə</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
