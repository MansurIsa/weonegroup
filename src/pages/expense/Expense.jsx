import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import ExpenseTableEnd from '../../components/admin/expense/ExpenseTableEnd'
import ExpenseTableHead from '../../components/admin/expense/ExpenseTableHead'

const Expense = () => {
  return (
    <AdminLayout adminHeader="Kassa">
      <ExpenseTableHead/>
        <SearchInpMain/>
        <ExpenseTableEnd/>
    </AdminLayout>
  )
}

export default Expense