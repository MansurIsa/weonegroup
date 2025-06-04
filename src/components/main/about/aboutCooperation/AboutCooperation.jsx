import React from 'react'
import Img from "../../../../assets/images/aboutCooperation.jpg"

const AboutCooperation = () => {
    return (
        <div className='about_cooperation'>
            <div className="about_cooperation_container project_container">
                <div className="about_cooperation_left">
                    <h3>Əməkdaşlıq etmək istəyirsiniz?</h3>
                    <p>Komandamız sizinlə tanış olmağa və əməkdaşlığa hazırdır.</p>
                    <button>Bizimlə əlaqə saxla</button>
                </div>
                <div className="about_cooperation_right" style={{ background: `url(${Img})`, backgroundSize: "cover", backgroundPosition: "center", width: "50%", height: "340px" }}>

                </div>
            </div>

        </div>
    )
}

export default AboutCooperation