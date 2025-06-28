import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import ProductTableHead from '../../components/admin/productTableHead/ProductTableHead'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import ProductsTableEnd from '../../components/admin/productsTableEnd/ProductsTableEnd'

const ProductsTable = () => {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate("/new-products")
  }
  return (
    <AdminLayout adminHeader="Məhsullar">
        <ProductTableHead/>
        <AdminBigComponentHeader adminHeader={"Məhsul cədvəli"} hideShowBtn={true} buttonContent="Yeni məhsul əlave et" onClick={handleClick}/>
        <SearchInpMain/>
        <ProductsTableEnd/>
    </AdminLayout>
  )
}

export default ProductsTable