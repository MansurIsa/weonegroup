import React from 'react'
import AboutCounterCard from './AboutCounterCard'
import "../css/about.css";

const AboutCounter = () => {
  return (
    <div className='about_counter_container'>
        <AboutCounterCard/>
        <AboutCounterCard/>
        <AboutCounterCard/>
    </div>
  )
}

export default AboutCounter