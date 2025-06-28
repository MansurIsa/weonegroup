import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import { useNavigate } from 'react-router-dom'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import WarehouseProducts from '../../components/admin/warehouseEnd/WarehouseProducts'

const Warehouse = () => {
  const navigate=useNavigate()

  const handleClick=()=>{
    navigate("/new-warehouse")
  }
  return (
    <AdminLayout adminHeader="Anbar">
         <AdminBigComponentHeader adminHeader={"Anbardakı məhsullar"} hideShowBtn={true} buttonContent="Yeni məhsul əlave et" onClick={handleClick}/>
         <SearchInpMain/>
        <WarehouseProducts/>


    </AdminLayout>
  )
}

export default Warehouse