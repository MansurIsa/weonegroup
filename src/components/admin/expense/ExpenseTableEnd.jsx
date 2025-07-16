import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPenToSquare } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { deleteExpensePaymentModal, handleExpenseUpdatePaymentModal } from '../../../redux/slices/admin/incomeSlices';

const ITEMS_PER_PAGE = 5;

const ExpenseTableEnd = ({ expenseList = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = expenseList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(expenseList.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const dispatch=useDispatch()

    const deleteExpense = (x) => {
          dispatch(deleteExpensePaymentModal(x))
      }
  
  
      const updateExpense = (item) => {
          dispatch(handleExpenseUpdatePaymentModal(item))
      }

  return (
    <div className='admin_container dashboard_end_container'>
      <table className='custom_table'>
        <thead>
          <tr>
            <th>N</th>
            <th>Xərcin adı</th>
            <th>Məbləğ</th>
            <th>Tarix</th>
            <th>Düzəliş/Sil</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <tr key={item.id}>
              <td>{offset + index + 1}</td>
              <td>{item.name || '—'}</td>
              <td>{item.amount} ₼</td>
              <td>
                {(() => {
                  const date = new Date(item.date);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  return `${day}.${month}.${year}`;
                })()}
              </td>
              <td className='table_update'>
                <FaPenToSquare onClick={() => updateExpense(item)} />
                <AiTwotoneDelete onClick={() => deleteExpense(item?.id)} />
              </td>
            </tr>

          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1L1 7L7 13" stroke="#9F9FA0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        }
        nextLabel={<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L1 13" stroke="#202020" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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

export default ExpenseTableEnd;
