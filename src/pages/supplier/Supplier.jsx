import React, { useEffect, useState } from 'react'
import AdminLayout from '../../layouts/adminLayout/AdminLayout'
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader'
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain'
import { useDispatch, useSelector } from 'react-redux'
import { getSupplierList } from '../../actions/incomeAction/incomeAction'
import SupplierTableEnd from '../../components/admin/supplier/SupplierTableEnd'
import { handleSupplierAddPaymentModal } from '../../redux/slices/admin/incomeSlices'
import SupplierAddPaymentModal from '../../components/admin/modals/SupplierAddPaymentModal'
import SupplierUpdatePaymentModal from '../../components/admin/modals/SupplierUpdatePaymentModal'
import SupplierDeletePaymentModal from '../../components/admin/modals/SupplierDeletePaymentModal'

const Supplier = () => {
     const dispatch = useDispatch();
  const [filteredPayments, setFilteredPayments] = useState([]);

  const { supplierAddPaymentModal, supplierList,supplierUpdatePaymentModal,
    supplierDeletePaymentModal
   } = useSelector(state => state.income);

  useEffect(() => {
    dispatch(getSupplierList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPayments(supplierList); // ilk olaraq hamısını göstər
  }, [supplierList]);

  const handleClick = () => {
    dispatch(handleSupplierAddPaymentModal());
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = supplierList.filter(payment => {
      const supplier = payment.supplier || {};
      return (
        supplier.username?.toLowerCase().includes(lowerQuery) ||
        supplier.first_name?.toLowerCase().includes(lowerQuery) ||
        supplier.last_name?.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredPayments(filtered);
  };
    return (
        <AdminLayout adminHeader="Kassa">
            <AdminBigComponentHeader
                adminHeader="Ödəniş cədvəli"
                hideShowBtn={true}
                buttonContent="Ödəniş əlavə et"
                onClick={handleClick}
            />
            <SearchInpMain onSearch={handleSearch} />
            <SupplierTableEnd paymentList={filteredPayments} />
            {supplierAddPaymentModal && <SupplierAddPaymentModal/>}
            {supplierUpdatePaymentModal && <SupplierUpdatePaymentModal/>}
            {supplierDeletePaymentModal && <SupplierDeletePaymentModal/>}
        </AdminLayout>
    )
}

export default Supplier