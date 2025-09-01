import React, { useEffect, useRef, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import CustomerTableHead from '../../components/admin/customerTableHead/CustomerTableHead';
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader';
import { useNavigate } from 'react-router-dom';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import CustomerTableEnd from '../../components/admin/customerTableHead/CustomerTableEnd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList } from '../../actions/loginAction/loginAction';
import CustomerDeleteModal from '../../components/admin/modals/CustomerDeleteModal';

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchTimeout = useRef(null);

  const { usersList, customerDeleteModal } = useSelector(state => state.login);

  const handleClick = () => {
    navigate("/new-customer");
  };

  // İlk dəfə backend-dən istifadəçiləri çəkmək
  useEffect(() => {
    dispatch(getUsersList(1, ""));
  }, [dispatch]);

  // Backend search (debounce)
  const handleSearch = (query) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      dispatch(getUsersList(1, query));
    }, 500); // 500ms gecikmə
  };

  return (
    <AdminLayout adminHeader="Müştərilər">
      <CustomerTableHead />
      <AdminBigComponentHeader
        adminHeader="Müştəri məlumatları"
        hideShowBtn={true}
        buttonContent="Yeni müştəri əlavə et"
        onClick={handleClick}
      />
      {/* Input dəyəri state-də saxlanmır, yalnız onSearch */}
      <SearchInpMain onSearch={handleSearch} />
      {/* Yalnız is_staff === false olanlar göstərilir */}
      <CustomerTableEnd usersList={usersList.filter(user => !user.is_staff)} />
      {customerDeleteModal && <CustomerDeleteModal />}
    </AdminLayout>
  );
};

export default Customers;
