import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import SalesTableHead from '../../components/admin/salesTableHead/SalesTableHead'
import SalesTableEnd from '../../components/admin/salesTableEnd/SalesTableEnd'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import "./css/sales.css"
import { useSelector } from 'react-redux'
import SaleDeleteModal from '../../components/admin/modals/SaleDeleteModal'
import { useNavigate } from 'react-router-dom'

const Sales = () => {
  const {saleUpdateModal}=useSelector(state=>state.sales)
   const navigate = useNavigate()

  const handleClick = () => {
    navigate("/sales-products-select")
  }
  return (
    <AdminLayout adminHeader="Məhsul satışı" dashboardSearch={false}>
        {/* <SalesTableHead/> */}
        <AdminBigComponentHeader adminHeader={"Satış cədvəli"} hideShowBtn={true} buttonContent="Yeni satış əlave et" onClick={handleClick}/>
        <SalesTableEnd/>
        {saleUpdateModal && <SaleDeleteModal/>}
    </AdminLayout>
  )
}

export default Sales