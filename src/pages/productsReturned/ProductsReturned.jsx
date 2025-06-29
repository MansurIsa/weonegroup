import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import ProductsReturnedEnd from '../../components/admin/productsReturnedEnd/ProductsReturnedEnd'

const ProductsReturned = () => {
  return (
    <AdminLayout adminHeader="Məhsullar">
         <AdminBigComponentHeader adminHeader={"Geri qaytarılanların  cədvəli"} />
         <ProductsReturnedEnd/>
    </AdminLayout>
  )
}

export default ProductsReturned