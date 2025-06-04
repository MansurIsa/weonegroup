import React from 'react'
import "./css/aboutBanner.css"
import Img from "../../../assets/images/aboutBanner.jpg"

const AboutBanner = () => {
  return (
    <div className='about_banner_container'>
        <div className='about_banner_left'>
            <h1>Performansa Sadiq Brend</h1>
            <p>Biz, WEONE məhsullarının Azərbaycandakı rəsmi distribyutoru olaraq, avtomobil ehtiyat hissələri sahəsində yüksək keyfiyyət və güvən təklif edirik. Məqsədimiz, müştərilərimizə uzunmüddətli və dayanıqlı xidmət təqdim etməkdir.</p>
            <button>İndi Alın</button>
        </div>
        <div style={{background: `url(${Img})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left", height: "100%", width: "50%"}} className="about_banner_right">

        </div>
    </div>
  )
}

export default AboutBanner