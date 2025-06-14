import React from 'react'

const AboutCounterCard = ({data}) => {
  return (
    <div className='about_counter_card'>
        <span>{data?.value}</span>
        <p>{data?.name}</p>
    </div>
  )
}

export default AboutCounterCard