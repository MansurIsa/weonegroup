import React from 'react'
import Img from "../../../../assets/images/service.jpg"

const ServiceTopCard = () => {
  return (
    <div className='service_top_card' style={{background: `url(${Img})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
        <div className="service_top_card_shadow">
            <h3>Avtomobil Ehtiyat Hissələrinin İxracı</h3>
        </div>
    </div>
  )
}

export default ServiceTopCard