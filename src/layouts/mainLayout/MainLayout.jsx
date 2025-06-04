import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import FixedProducts from '../../components/fixedProducts/FixedProducts'

const MainLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <main>{children}</main>
        <FixedProducts/>
        <Footer/>
    </div>
  )
}

export default MainLayout