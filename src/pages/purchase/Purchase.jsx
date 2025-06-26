import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import DashboardFirst from '../../components/admin/dashboard/dashboardFirst/DashboardFirst'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import PurchaseEnd from '../../components/admin/purchaseEnd/PurchaseEnd'
import { useNavigate } from 'react-router-dom'

const Purchase = () => {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate("/new-purchase")
  }
  return (
    <AdminLayout adminHeader="Məhsul alışı">
        <DashboardFirst/>
         <AdminBigComponentHeader adminHeader={"Alınmış Məhsulların Cədvəli"} hideShowBtn={true} buttonContent="Yeni alış əlave et" onClick={handleClick}/>
         <PurchaseEnd/>
    </AdminLayout>
  )
}

export default Purchase