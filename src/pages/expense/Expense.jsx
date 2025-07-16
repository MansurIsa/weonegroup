import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleExpenseAddPaymentModal
} from '../../redux/slices/admin/incomeSlices';
import ExpenseAddPaymentModal from '../../components/admin/modals/ExpenseAddPaymentModal';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader';
import ExpenseTableHead from '../../components/admin/expense/ExpenseTableHead';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import ExpenseTableEnd from '../../components/admin/expense/ExpenseTableEnd';
import { getExpenseList } from '../../actions/incomeAction/incomeAction';
import ExpenseDeletePaymentModal from '../../components/admin/modals/ExpenseDeletePaymentModal';
import ExpenseUpdatePaymentModal from '../../components/admin/modals/ExpenseUpdatePaymentModal';

const Expense = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getExpenseList());
  }, [dispatch]);

  const { expenseList, expenseAddPaymentModal,expenseDeletePaymentModal,expenseUpdatePaymentModal } = useSelector(state => state.income);

  // 🔍 Filtered list — yalnız adı uyğun gələnlər
  const filteredExpenseList = expenseList?.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout adminHeader="Kassa">
      {/* <ExpenseTableHead /> */}
      <AdminBigComponentHeader
        adminHeader="Xərc cədvəli"
        hideShowBtn={true}
        buttonContent="Xərc əlavə et"
        onClick={() => dispatch(handleExpenseAddPaymentModal())}
      />
      <SearchInpMain onSearch={setSearchTerm} />
      <ExpenseTableEnd expenseList={filteredExpenseList} />
      {expenseAddPaymentModal && <ExpenseAddPaymentModal />}
      {expenseDeletePaymentModal && <ExpenseDeletePaymentModal/>}
      {expenseUpdatePaymentModal && <ExpenseUpdatePaymentModal/>}
    </AdminLayout>
  );
};

export default Expense;
