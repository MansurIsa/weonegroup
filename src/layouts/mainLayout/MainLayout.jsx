import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const MainLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <main>{children}</main>
        <Footer/>
    </div>
  )
}

export default MainLayout