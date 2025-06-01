import React from 'react'
import "./css/logo.css"
import { Link } from 'react-router-dom'
import LogoImg from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <Link to={''}>
          <img src={LogoImg} alt="" />
        </Link>
    )
}

export default Logo