import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import IncomeTableHead from '../../components/admin/income/IncomeTableHead';
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import IncomeTableEnd from '../../components/admin/income/IncomeTableEnd';
import { useDispatch, useSelector } from 'react-redux';
import { handleIncomeAddPaymentModal } from '../../redux/slices/admin/incomeSlices';
import IncomeAddPaymentModal from '../../components/admin/modals/IncomeAddPaymentModal';
import { getPaymentList } from '../../actions/incomeAction/incomeAction';

const Income = () => {
  const dispatch = useDispatch();
  const [filteredPayments, setFilteredPayments] = useState([]);

  const { incomeAddPaymentModal, paymentList } = useSelector(state => state.income);

  useEffect(() => {
    dispatch(getPaymentList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPayments(paymentList); // ilk olaraq hamısını göstər
  }, [paymentList]);

  const handleClick = () => {
    dispatch(handleIncomeAddPaymentModal());
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = paymentList.filter(payment => {
      const customer = payment.customer || {};
      return (
        customer.username?.toLowerCase().includes(lowerQuery) ||
        customer.first_name?.toLowerCase().includes(lowerQuery) ||
        customer.last_name?.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredPayments(filtered);
  };

  return (
    <AdminLayout adminHeader="Kassa">
      <IncomeTableHead />
      <AdminBigComponentHeader
        adminHeader="Ödəniş cədvəli"
        hideShowBtn={true}
        buttonContent="Ödəniş əlavə et"
        onClick={handleClick}
      />
      <SearchInpMain onSearch={handleSearch} />
      <IncomeTableEnd paymentList={filteredPayments} />
      {incomeAddPaymentModal && <IncomeAddPaymentModal />}
    </AdminLayout>
  );
};

export default Income;
