import React from 'react'
import "../css/service.css"
import ServiceTopCard from './ServiceTopCard'

const ServiceTopContainer = () => {
  return (
    <div className='service_top_parent_container project_container'>
        <p>Land Rover, Audi, BMW, Mercedes-Benz, Porsche və Koreya istehsalı avtomobillərin mühərrik və asqı hissələri üzrə ixrac yönümlü xidmətlər. Brend inkişafına sadiq qalaraq, OEM standartlarına uyğun məhsullar təqdim edirik.</p>
        <div className="service_top_container">
            <ServiceTopCard/>
            <ServiceTopCard/>
            <ServiceTopCard/>
        </div>
    </div>
  )
}

export default ServiceTopContainer