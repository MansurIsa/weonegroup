import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import PurchaseEnd from '../../components/admin/purchaseEnd/PurchaseEnd';
import { useSelector } from 'react-redux';

const SupplierPurchase = () => {
  const { supplierPurchaseObj } = useSelector(state => state.purchase);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Məlumat varsa ilkin olaraq ona uyğun filtered data təyin edilir
  useEffect(() => {
    if (supplierPurchaseObj?.purchaselist_purchases) {
      setFilteredProducts(supplierPurchaseObj.purchaselist_purchases);
    }
  }, [supplierPurchaseObj]);

  // Axtarış funksiyası: məhsul adı və article-lara görə
  const handleSearch = (query) => {
    const loweredQuery = query.toLowerCase();
    const filtered = supplierPurchaseObj.purchaselist_purchases.filter(item => {
      const nameMatch = item?.product?.name?.toLowerCase().includes(loweredQuery);
      const articlesMatch = item?.product?.articles?.some(article =>
        article.name.toLowerCase().includes(loweredQuery)
      );
      return nameMatch || articlesMatch;
    });

    setFilteredProducts(filtered);
  };

  return (
    <AdminLayout adminHeader="Alınmış məhsullar">
      <SearchInpMain onSearch={handleSearch} />
      <PurchaseEnd purchaseList={filteredProducts} />
    </AdminLayout>
  );
};

export default SupplierPurchase;
