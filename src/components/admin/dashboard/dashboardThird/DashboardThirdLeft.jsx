import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMostDebtDashboardList } from '../../../../actions/dashboardAction/dashboardAction';
import ReactPaginate from 'react-paginate';

const ITEMS_PER_PAGE = 10;

const DashboardThirdLeft = () => {
  const dispatch = useDispatch();
  const { mostDebtObj } = useSelector(state => state.dashboard);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, dispatch]);

  const fetchData = (page) => {
    dispatch(getMostDebtDashboardList({ page }));
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1); // selected = 0-based index
  };

  const customers = mostDebtObj?.most_indebted_customers || [];
  const pageCount = Math.ceil(mostDebtObj?.count / ITEMS_PER_PAGE || 0);

  return (
    <div className='dashboard_third_left'>
      <div className="dashboard_third_left_header">
        <h3>Ən çox borcu olan müştərilər</h3>
        <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM14 0C12.9 0 12 0.9 12 2C12 3.1 12.9 4 14 4C15.1 4 16 3.1 16 2C16 0.9 15.1 0 14 0ZM8 0C6.9 0 6 0.9 6 2C6 3.1 6.9 4 8 4C9.1 4 10 3.1 10 2C10 0.9 9.1 0 8 0Z" fill="#FFC900" />
        </svg>
      </div>

      <table>
        <thead>
          <tr>
            <th>Müştəri Adı</th>
            <th>Borcu</th>
            <th>Əlaqə</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((data, i) => (
            <tr key={i}>
              <td>{data?.name}</td>
              <td>{data?.debt} ₼</td>
              <td>{data?.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default DashboardThirdLeft;
