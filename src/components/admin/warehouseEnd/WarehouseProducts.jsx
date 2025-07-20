import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
// import "./css/warehouseProducts.css"; // CSS fayl adını uyğunlaşdır

const ITEMS_PER_PAGE = 5;

const WarehouseProducts = ({ stockList }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = stockList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(stockList.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className='admin_container dashboard_end_container'>
      <table className='custom_table'>
        <thead>
          <tr>
            <th>Məhsul Adı</th>
            <th>Kateqoriya</th>
            <th>Marka</th>
            <th>Brend</th>
            <th>Artikl</th>
            <th>Miqdar</th>
            <th>Maya dəyəri</th>
            {/* <th>Əməliyyat</th> */}
          </tr>
        </thead>
        <tbody>
          {currentPageData?.map((item, index) => {
            const product = item.product;
            const brand = product?.brand?.name || "—";
            const category = product?.category?.name || "—";
            const store = product?.store?.name || "—";
            const name = product?.name || "—";
            const costPrice = product?.cost_price || "—";
            const articles = product?.articles?.map(a => a.name).join(", ") || "—";

            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{category}</td>
                <td>{brand}</td>
                <td>{store}</td>
                <td className='table_article_scroll'>{articles}</td>
                <td>{item.amount}</td>
                <td>{costPrice} ₼</td>
                {/* <td className="operation">+ Stok əlavə et</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L1 7L7 13" stroke="#9F9FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>}
        nextLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'dashboard_end_pagination'}
        pageClassName={'dashboard_end_page'}
        pageLinkClassName={'dashboard_end_page_link'}
        previousClassName={'dashboard_end_arrow'}
        nextClassName={'dashboard_end_arrow'}
        activeClassName={'dashboard_end_active'}
      />
    </div>
  );
};

export default WarehouseProducts;
