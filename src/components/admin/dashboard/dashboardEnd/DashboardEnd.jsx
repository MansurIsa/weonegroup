import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './css/dashboardEnd.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStockOutDashboardList } from '../../../../actions/dashboardAction/dashboardAction';
import SearchInpMain from '../../searchInpMain/SearchInpMain';

const ITEMS_PER_PAGE = 10;

const DashboardEnd = () => {
  const dispatch = useDispatch();
  const { stockOutList, count } = useSelector(state => state.dashboard);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Backenddən data fetch funksiyası
  const fetchData = (page, search) => {
    dispatch(getStockOutDashboardList({ page, search }));
  };

  // İlk render və hər dəyişiklikdə fetch
  useEffect(() => {
    fetchData(currentPage, searchTerm);
  }, [currentPage, searchTerm, dispatch]);

  // Pagination klik
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); // ReactPaginate 0-based index istifadə edir
  };

  // Search input üçün callback
  const handleSearch = (val) => {
    setSearchTerm(val);
    setCurrentPage(1); // yeni searchda səhifəni 1-ə qaytarırıq
  };

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  console.log(stockOutList);
  

  return (
    <div className="admin_container dashboard_end_container">
      <SearchInpMain onSearch={handleSearch} />

      <div className="table_wrapper dashboard_end_table">
        <table className="custom_table">
          <thead>
            <tr>
              <th>Məhsul Adı</th>
              <th>Marka</th>
              <th>Kateqoriya</th>
              <th>Brend</th>
              <th>Qalıq</th>
              <th>Tarix</th>
              <th>Status</th>
            </tr>
          </thead>
         <tbody>
  {stockOutList?.map((item, index) => {
    let statusText = '';
    let statusClass = '';

    if (item.amount === 0) {
      statusText = 'Bitib';
      statusClass = 'over';
    } else if (item.amount <= 20) {
      statusText = 'Tükənir';
      statusClass = 'runs_out';
    } else {
      statusText = 'Var';
      statusClass = 'in_stock'; // əlavə class lazım olarsa
    }

    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.brand?.name}</td>
        <td>{item.category?.name}</td>
        <td>{item.store?.name}</td>
        <td>{item.amount}</td>
        <td>{item.date}</td>
        <td className={`status ${statusClass}`}>{statusText}</td>
      </tr>
    );
  })}
</tbody>

        </table>
      </div>

      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1L1 7L7 13" stroke="#9F9FA0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          nextLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M1 1L7 7L1 13" stroke="#202020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          pageCount={pageCount}
          onPageChange={handlePageClick}
          forcePage={currentPage - 1}
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

export default DashboardEnd;
