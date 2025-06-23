import React from 'react'
import DashboardFirstCard from './DashboardFirstCard'
import "./css/dashboardFirst.css"

const DashboardFirst = () => {
  return (
    <div className='dashboard_first_container admin_container'>
        <DashboardFirstCard/>
        <DashboardFirstCard/>
        <DashboardFirstCard/>
        <DashboardFirstCard/>
    </div>
  )
}

export default DashboardFirst