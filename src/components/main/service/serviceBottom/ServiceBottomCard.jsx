import React from 'react'
import Img from "../../../../assets/images/serviceBottom.png"

const ServiceBottomCard = () => {
    return (
        <div className='service_bottom_card'>
            <div className="service_bottom_card_left">
                <h3>Əməkdaşlıq etdiyiniz brendlər və tərəfdaşlar</h3>
                <p>Hal-hazırda müxtəlif beynəlxalq avtomobil ehtiyat hissələri istehsalçıları ilə əməkdaşlıq edirik. Məqsədimiz – dünya səviyyəli texnologiyanı Azərbaycan bazarına təqdim etməkdir.</p>
            </div>
            <img src={Img} alt="" />
        </div>
    )
}

export default ServiceBottomCard