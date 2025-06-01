import React from 'react'
import { Link } from 'react-router-dom'

const FooterRight = () => {
  return (
    <div className='footer_right_container'>
        <div>
            <p>Adres</p>
            <Link to={''}>1002-10, Siheung 1(il)-dong, Geumcheon-gu, Seoul</Link>
        </div>
        <div>
            <p>Əlaqə nömrəsi</p>
             <Link to={''}>+82-2-905-7586</Link>
        </div>
    </div>
  )
}

export default FooterRight