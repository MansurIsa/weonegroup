import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPenToSquare } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { deleteProductReturnModalFunc, handleProductReturnUpdateModalFunc } from '../../../redux/slices/admin/productTableSlice';

const ITEMS_PER_PAGE = 10;

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const ProductsReturnedEnd = ({ returnBackList = [], count = 0, fetchReturnBacks, searchTerm, currentPage, setCurrentPage }) => {
  const dispatch = useDispatch();

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(event.selected); // frontend üçün aktiv səhifəni saxlayır
    fetchReturnBacks(selectedPage, searchTerm); // backend çağırışı
  };

  const updateProductReturn = (item) => {
    dispatch(handleProductReturnUpdateModalFunc(item));
  };

  const deleteProductReturn = (id) => {
    dispatch(deleteProductReturnModalFunc(id));
  };

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

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
            <th>Düzəliş/Sil</th>
          </tr>
        </thead>
        <tbody>
          {returnBackList.map((item) => {
            const product = item?.sale?.product || {};
            const customer = item?.sale?.customer || {};
            const articles = product.articles?.map(a => a.name).join(', ') || '-';
            const dateFormatted = formatDate(item.date);

            return (
              <tr key={item.id}>
                <td>{customer.first_name} {customer.last_name}</td>
                <td>{product.name || '—'}</td>
                <td className='table_article_scroll'>{articles}</td>
                <td>{dateFormatted}</td>
                <td>{item.reason || '—'}</td>
                <td>{item.amount || 0}</td>
                <td>{item?.sale?.price + `₼` || '—'}</td>
                <td className='table_update'>
                  <FaPenToSquare onClick={() => updateProductReturn(item)} />
                  <AiTwotoneDelete onClick={() => deleteProductReturn(item?.id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="#9F9FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          nextLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M1 1L7 7L1 13" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'dashboard_end_pagination'}
          pageClassName={'dashboard_end_page'}
          pageLinkClassName={'dashboard_end_page_link'}
          previousClassName={'dashboard_end_arrow'}
          nextClassName={'dashboard_end_arrow'}
          activeClassName={'dashboard_end_active'}
        />
      )}
    </div>
  );
};

export default ProductsReturnedEnd;
