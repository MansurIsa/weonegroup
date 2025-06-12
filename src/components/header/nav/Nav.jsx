import React from 'react';
import './css/nav.css';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <nav>
      <ul className={`nav_list`}>
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
