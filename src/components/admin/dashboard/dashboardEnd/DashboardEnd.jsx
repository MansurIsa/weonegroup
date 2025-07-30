import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './css/dashboardEnd.css';
import { useDispatch, useSelector } from 'react-redux';
import { getStockOutDashboardList } from '../../../../actions/dashboardAction/dashboardAction';

const ITEMS_PER_PAGE = 3;

const DashboardEnd = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getStockOutDashboardList());
  }, [dispatch]);

  const { stockOutList } = useSelector(state => state.dashboard);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = stockOutList?.slice(offset, offset + ITEMS_PER_PAGE) || [];
  const pageCount = Math.ceil((stockOutList?.length || 0) / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="admin_container dashboard_end_container">
      <div className="table_wrapper">
         <table className="custom_table">
        <thead>
          <tr>
            <th>Məhsul Adı</th>
            <th>Marka</th>
            <th>Kateqoriya</th>
            <th>Qalıq</th>
            <th>Tarix</th>
            <th>Status</th>
            {/* <th>Əməliyyat</th> */}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => {
            const statusText = item.amount <= 0 ? 'Bitib' : 'Bitmək üzrə';
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.brand?.name}</td>
                <td>{item.category?.name}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td className={`status ${item.amount <= 0 ? 'over' : 'runs_out'}`}>
                  {statusText}
                </td>
                {/* <td className="operation">+ Stok əlavə et</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
     

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

export default DashboardEnd;
