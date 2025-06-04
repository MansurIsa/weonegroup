import React from 'react'
import AboutSuperiorsCard from './AboutSuperiorsCard'
import "../css/about.css";

const AboutSuperiors = () => {
  return (
    <div className='about_superiors_container project_container'>
        <AboutSuperiorsCard/>
        <AboutSuperiorsCard/>
        <AboutSuperiorsCard/>
    </div>
  )
}

export default AboutSuperiors