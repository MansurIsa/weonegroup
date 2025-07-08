import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import CustomerFactureHeader from '../../components/admin/customerFactureHeader/CustomerFactureHeader';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import CustomerFactureEnd from '../../components/admin/customerFactureHeader/CustomerFactureEnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFactureList, getUsersList } from '../../actions/loginAction/loginAction';

const CustomerMovementFacture = () => {
  const dispatch = useDispatch();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getCustomerFactureList()); // bütün fakturaları çək
  }, [dispatch]);

  const { usersList, customerFactureList } = useSelector(state => state.login);

  // Filtrləmə qaydası:
  const filteredFactures = customerFactureList?.filter(item => {
    const matchesCustomer = selectedCustomerId ? item.customer.id === parseInt(selectedCustomerId) : true;
    const matchesSearch = item.product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCustomer && matchesSearch;
  });

  return (
    <AdminLayout adminHeaderHide={true}>
      <CustomerFactureHeader
        usersList={usersList}
        selectedCustomerId={selectedCustomerId}
        setSelectedCustomerId={setSelectedCustomerId}
      />
      <SearchInpMain onSearch={setSearchTerm} />
      <CustomerFactureEnd factureList={filteredFactures} />
    </AdminLayout>
  );
};

export default CustomerMovementFacture;
