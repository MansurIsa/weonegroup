import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import SalesTableHead from '../../components/admin/salesTableHead/SalesTableHead'
import SalesTableEnd from '../../components/admin/salesTableEnd/SalesTableEnd'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import "./css/sales.css"
import { useSelector } from 'react-redux'
import SaleDeleteModal from '../../components/admin/modals/SaleDeleteModal'
import { useNavigate } from 'react-router-dom'
import SaleDeleteModalComp from '../../components/admin/modals/SaleDeleteModalComp'

const Sales = () => {

   const navigate = useNavigate()

  const handleClick = () => {
    navigate("/sales-products-select")
  }
  const {saleDeleteModal}=useSelector(state=>state.sales)
  return (
    <AdminLayout adminHeader="Məhsul satışı" dashboardSearch={false}>
        {/* <SalesTableHead/> */}
        <AdminBigComponentHeader adminHeader={"Satış cədvəli"} hideShowBtn={true} buttonContent="Yeni satış əlave et" onClick={handleClick}/>
        <SalesTableEnd/>
        {saleDeleteModal && <SaleDeleteModalComp/>}
      
    </AdminLayout>
  )
}

export default Sales