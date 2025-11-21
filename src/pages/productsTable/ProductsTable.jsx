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
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 10; // Backend default per page sayı ilə uyğun olmalıdır

const ProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productsList, brandList, count } = useSelector(state => state.products);
  const { productsDeleteModal } = useSelector(state => state.productTable);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeBrandId, setActiveBrandId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // İlk load
  useEffect(() => {
    dispatch(getBrandList());
    fetchProducts();
  }, [dispatch]);

  // Backend-dən məhsulları çəkmək
  const fetchProducts = (page = 1, search = '', brand = '') => {
    dispatch(getProductsList(page, search, '', brand));
    setCurrentPage(page);
  };

  const handleClick = () => navigate("/new-products");

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchProducts(1, query, activeBrandId || '');
  };

  const handleBrandFilter = (brandId) => {
    setActiveBrandId(brandId);
    fetchProducts(1, searchQuery, brandId || '');
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // ReactPaginate 0-based
    fetchProducts(selectedPage, searchQuery, activeBrandId || '');
  };

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  return (
    <AdminLayout adminHeader="Məhsullar">
      <ProductTableHead />
      <AdminBigComponentHeader
        adminHeader="Məhsul cədvəli"
        hideShowBtn={true}
        buttonContent="Yeni məhsul əlavə et"
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
    onClick={() => handleBrandFilter(data.name)}   // name göndərilir
    className={activeBrandId === data.name ? 'active' : ''}   // name ilə müqayisə olunur
  >
    {data.name}
  </button>
))}

      </div>

      <ProductsTableEnd productsList={productsList} />

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="#9F9FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          nextLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L1 13" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={'dashboard_end_pagination'}
          pageClassName={'dashboard_end_page'}
          pageLinkClassName={'dashboard_end_page_link'}
          previousClassName={'dashboard_end_arrow'}
          nextClassName={'dashboard_end_arrow'}
          activeClassName={'dashboard_end_active'}
        />
      )}

      {productsDeleteModal && <ProductsDeleteModal />}
    </AdminLayout>
  );
};

export default ProductsTable;
