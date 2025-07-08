import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 5;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const ProductsReturnedEnd = ({ returnBackList = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = returnBackList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(returnBackList.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  console.log(currentPageData);
  

  return (
    <div className='admin_container dashboard_end_container'>
      <table className='custom_table'>
        <thead>
          <tr>
             <th>Müştəri</th>
            <th>Məhsul Adı</th>
            <th>Artikl</th>
            <th>Qaytarılma Tarixi</th>
            <th>Səbəb</th>
            <th>Miqdar</th>
            <th>Dəyəri</th>
           
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => {
            const product = item?.sale?.product || {};
            const customer = item?.sale?.customer || {};
            const articles = product.articles?.map(a => a.name).join(', ') || '-';
            const dateFormatted = formatDate(item.date);

            return (
              <tr key={item.id}>
                 <td>{customer.first_name} {customer.last_name}</td>
                <td>{product.name || '—'}</td>
                <td>{articles}</td>
                <td>{dateFormatted}</td>
                <td>{item.reason || '—'}</td>
                <td>{item.amount || 0}</td>
                <td>{item?.sale?.price +`₼` || '—'}</td>
               
              </tr>
            );
          })}
        </tbody>
      </table>

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

export default ProductsReturnedEnd;
