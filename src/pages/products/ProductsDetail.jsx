import React from 'react'
import MainLayout from '../../layouts/mainLayout/MainLayout'
import { useParams } from 'react-router-dom'
import ProductDetailContainer from '../../components/main/productDetail/ProductDetailContainer'

const ProductsDetail = () => {
    const {id}=useParams()

  return (
     <MainLayout>
        <ProductDetailContainer/>
     </MainLayout>
  )
}

export default ProductsDetail