import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import CustomerFactureEnd from '../../components/admin/customerFactureHeader/CustomerFactureEnd';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFactureList, getUsersList } from '../../actions/loginAction/loginAction';
import SaleDeleteModal from '../../components/admin/modals/SaleDeleteModal';

const CustomerMovementFacture = () => {
  const dispatch = useDispatch();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const { saleUpdateModal } = useSelector(state => state.sales);
  const { customerFactureList } = useSelector(state => state.login);

  console.log(customerFactureList);
  

  // Əgər məlumat yoxdursa və ya salelist_sales boşdursa, heç nə göstərməyək
  if (!customerFactureList || !customerFactureList.salelist_sales) {
    return (
      <AdminLayout adminHeaderHide={true}>
        <SearchInpMain onSearch={setSearchTerm} />
        <CustomerFactureEnd factureList={[]} />
        {saleUpdateModal && <SaleDeleteModal />}
      </AdminLayout>
    );
  }
console.log(customerFactureList);

  // Müştəriyə və ya məhsul adına görə filter et
 const filteredSales = customerFactureList.salelist_sales.filter((sale) => {
  const matchesCustomer = selectedCustomerId
    ? sale.customer?.id === parseInt(selectedCustomerId)
    : true;

  const searchValue = searchTerm.toLowerCase();

  const productName = sale.product?.name?.toLowerCase() || "";

  const articleNames = Array.isArray(sale.product?.articles)
    ? sale.product.articles.map(article => article.name?.toLowerCase()).join(" ")
    : "";

  const matchesSearch =
    productName.includes(searchValue) ||
    articleNames.includes(searchValue);

  return matchesCustomer && matchesSearch;
});




  // customerFactureList obyekt formatında qalır, sadəcə içindəki salelist_sales dəyişir
  const factureToShow = [{
    ...customerFactureList,
    salelist_sales: filteredSales
  }];

  return (
    <AdminLayout adminHeaderHide={true}>
      <SearchInpMain onSearch={setSearchTerm} />
      <CustomerFactureEnd factureList={factureToShow} />
      {saleUpdateModal && <SaleDeleteModal />}
    </AdminLayout>
  );
};

export default CustomerMovementFacture;
