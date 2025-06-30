import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import CustomerTableHead from '../../components/admin/customerTableHead/CustomerTableHead'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import CustomerTableEnd from '../../components/admin/customerTableHead/CustomerTableEnd'

const Customers = () => {
    const navigate=useNavigate()

  const handleClick=()=>{
    navigate("/new-customer")
  }
  return (
    <AdminLayout adminHeader="Müştərilər">
        <CustomerTableHead/>
         <AdminBigComponentHeader adminHeader={"Müştəri məlumatları"} hideShowBtn={true} buttonContent="Yeni müştəri əlave et" onClick={handleClick}/>
         <SearchInpMain/>
         <CustomerTableEnd/>
    </AdminLayout>
  )
}

export default Customers