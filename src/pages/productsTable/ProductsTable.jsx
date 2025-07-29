import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import ProductTableHead from '../../components/admin/productTableHead/ProductTableHead';
import AdminBigComponentHeader from '../../components/admin/adminBigComponentHeader/AdminBigComponentHeader';
import { useNavigate } from 'react-router-dom';
import SearchInpMain from '../../components/admin/searchInpMain/SearchInpMain';
import ProductsTableEnd from '../../components/admin/productsTableEnd/ProductsTableEnd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandList, getProductsList } from '../../actions/productsAction/productsAction';
import ProductsDeleteModal from '../../components/admin/modals/ProductsDeleteModal';

const ProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeBrandId, setActiveBrandId] = useState(null); // null = all

  const { productsList, brandList } = useSelector(state => state.products);
  const { productsDeleteModal } = useSelector(state => state.productTable);

  useEffect(() => {
    dispatch(getProductsList());
    dispatch(getBrandList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(productsList);
  }, [productsList]);

  const handleClick = () => {
    navigate("/new-products");
  };

  const handleSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filtered = productsList.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(lowerQuery);
      const articlesMatch = product.articles.some(article =>
        article.name.toLowerCase().includes(lowerQuery)
      );
      return nameMatch || articlesMatch;
    });

    setFilteredProducts(filtered);
    setActiveBrandId(null); // Axtarışda brand filter sıfırlansın
  };

  const handleBrandFilter = (brandId) => {
    setActiveBrandId(brandId);
    if (brandId === null) {
      setFilteredProducts(productsList);
    } else {
      const filtered = productsList.filter(product => product.brand.id === brandId);
      setFilteredProducts(filtered);
    }
  };

  return (
    <AdminLayout adminHeader="Məhsullar">
      <ProductTableHead />
      <AdminBigComponentHeader
        adminHeader={"Məhsul cədvəli"}
        hideShowBtn={true}
        buttonContent="Yeni məhsul əlave et"
        onClick={handleClick}
      />

      <SearchInpMain onSearch={handleSearch} />

      <div className="admin_container brand_list_buttons">
        <button
          onClick={() => handleBrandFilter(null)}
          className={activeBrandId === null ? 'active' : ''}
        >
          Bütün markalar
        </button>
        

        {brandList?.map((data) => (
          <button
            key={data.id}
            onClick={() => handleBrandFilter(data.id)}
            className={activeBrandId === data.id ? 'active' : ''}
          >
            {data.name}
          </button>
        ))}
      </div>

      <ProductsTableEnd productsList={filteredProducts} />

      {productsDeleteModal && <ProductsDeleteModal />}
    </AdminLayout>
  );
};

export default ProductsTable;
