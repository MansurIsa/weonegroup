import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import SalesTableHead from '../../components/admin/salesTableHead/SalesTableHead'
import SalesTableEnd from '../../components/admin/salesTableEnd/SalesTableEnd'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'

const Sales = () => {
  return (
    <AdminLayout adminHeader="Məhsul satışı" dashboardSearch={true}>
        <SalesTableHead/>
        <AdminBigComponentHeader adminHeader={"Satış cədvəli"} />
        <SalesTableEnd/>
    </AdminLayout>
  )
}

export default Sales