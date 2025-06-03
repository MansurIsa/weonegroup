import React from 'react'
import { Link } from 'react-router-dom'
import HomeSecondSectionCard from './HomeSecondSectionCard'
import "./css/homeFirstSecond.css"

const HomeSecondSection = () => {
    return (
        <div className='home_second_section project_container'>
            <Link to={''}>Hamısına bax
                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8H18.5" stroke="#FFC900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12 15L19 8L12 1" stroke="#FFC900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </Link>
            <div className="home_second_section_container">
                <HomeSecondSectionCard/>
                <HomeSecondSectionCard/>
                <HomeSecondSectionCard/>
            </div>
        </div>
    )
}

export default HomeSecondSection