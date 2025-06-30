import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import SalesProductsFacturaHeader from '../../components/admin/salesProductsFactura/SalesProductsFacturaHeader'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import SalesProductsFacturaEnd from '../../components/admin/salesProductsFactura/SalesProductsFacturaEnd'
import CustomerFactureHeader from '../../components/admin/customerFactureHeader/CustomerFactureHeader'
import CustomerFactureEnd from '../../components/admin/customerFactureHeader/CustomerFactureEnd'

const CustomerMovementFacture = () => {
  return (
    <AdminLayout adminHeaderHide={true}>
        <CustomerFactureHeader/>
        <SearchInpMain/>
        <CustomerFactureEnd/>
    </AdminLayout>
  )
}

export default CustomerMovementFacture