import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader';
import ProductsReturnedEnd from '../../components/admin/productsReturnedEnd/ProductsReturnedEnd';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import { useDispatch, useSelector } from 'react-redux';
import { getReturnBackList } from '../../actions/productsTableAction/productsTableAction';
import { handleAddReturnedModal } from '../../redux/slices/admin/productTableSlice';
import ProductReturnedModal from '../../components/admin/modals/ProductReturnedModal';
import ProductReturnUpdateModal from '../../components/admin/modals/ProductReturnUpdateModal';
import ProductReturnDeleteModal from '../../components/admin/modals/ProductReturnDeleteModal';

const ProductsReturned = () => {
  const dispatch = useDispatch();
  const [filteredList, setFilteredList] = useState([]);

  const { returnBackList,productReturnedModal,productReturnUpdateModal,productReturnDeleteModal } = useSelector(state => state.productTable);

  useEffect(() => {
    dispatch(getReturnBackList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredList(returnBackList); // ilk olaraq bütününü göstər
  }, [returnBackList]);

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();

    const filtered = returnBackList.filter(item => {
      const productName = item?.sale?.product?.name || '';
      const customerName = `${item?.sale?.customer?.first_name || ''} ${item?.sale?.customer?.last_name || ''}`;
      return (
        productName.toLowerCase().includes(lowerQuery) ||
        customerName.toLowerCase().includes(lowerQuery) ||
        item.reason?.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredList(filtered);
  };

  const handleClick = () => {
    dispatch(handleAddReturnedModal());
  };

  return (
    <AdminLayout adminHeader="Məhsullar">
      <AdminBigComponentHeader adminHeader="Geri qaytarılanların cədvəli" hideShowBtn={true}
        buttonContent="Geri qaytarılma əlavə et"
        onClick={handleClick}/>
      <SearchInpMain onSearch={handleSearch} />
      <ProductsReturnedEnd returnBackList={filteredList} />
      {productReturnedModal && <ProductReturnedModal/>}
      {productReturnUpdateModal && <ProductReturnUpdateModal/>}
      {productReturnDeleteModal && <ProductReturnDeleteModal/>}
    </AdminLayout>
  );
};

export default ProductsReturned;
