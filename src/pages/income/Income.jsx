import React from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import IncomeTableHead from '../../components/admin/income/IncomeTableHead'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import IncomeTableEnd from '../../components/admin/income/IncomeTableEnd'
import { useDispatch, useSelector } from 'react-redux'
import { handleIncomeAddPaymentModal } from '../../redux/slices/admin/incomeSlices'
import IncomeAddPaymentModal from '../../components/admin/modals/IncomeAddPaymentModal'

const Income = () => {
  const dispatch=useDispatch()
  const handleClick = () => {
    dispatch(handleIncomeAddPaymentModal())
  }

  const {incomeAddPaymentModal}=useSelector(state=>state.income)
  return (
    <AdminLayout adminHeader="Kassa">
      <IncomeTableHead />
      <AdminBigComponentHeader adminHeader={"Ödəniş cədvəli"} hideShowBtn={true} buttonContent="Ödəniş əlave et" onClick={handleClick} />
      <SearchInpMain/>
      <IncomeTableEnd/>
      {incomeAddPaymentModal && <IncomeAddPaymentModal/>}
    </AdminLayout>
  )
}

export default Income