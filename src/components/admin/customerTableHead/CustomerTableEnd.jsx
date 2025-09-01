import React, { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPenToSquare } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { customerUpdateModalFunc, setUpdateCustomerObjFunc } from '../../../redux/slices/loginSlices';
import { getUsersList } from '../../../actions/loginAction/loginAction';

const CustomerTableEnd = ({ searchTerm = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { usersList, count } = useSelector(state => state.login); // count backend-dən gəlir

  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;
  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

  // Backend səhifələmə üçün səhifəni seçəndə
  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1; // backend 1-based index ola bilər
    setCurrentPage(event.selected);
    dispatch(getUsersList(selectedPage, searchTerm));
  };

  const updateCustomer = (item) => {
    navigate("/update-new-customer");
    dispatch(setUpdateCustomerObjFunc(item));
  };

  const deleteCustomer = (id) => {
    dispatch(customerUpdateModalFunc(id));
  };

  // İlk render zamanı səhifə 1 çağırılır
  useEffect(() => {
    dispatch(getUsersList(1, searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <div className='admin_container dashboard_end_container'>
      <table className='custom_table'>
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>İstifadəçi adı</th>
            <th>Əlaqə nömrəsi</th>
            <th>Ünvan</th>
            <th>Bizə borc</th>
            <th>Bizim borc</th>
            <th>Ödəniş status</th>
            <th>Düzəliş/Sil</th>
          </tr>
        </thead>
        <tbody>
          {usersList?.map((item, index) => (
            <tr key={index}>
              <td>{item.first_name || "-"} {item.last_name || "-"}</td>
              <td>{item.username || "-"}</td>
              <td>{item.phone_number || "-"}</td>
              <td>{item.address || "-"}</td>
              <td>{item?.customer_debt_amount || 0} ₼</td>
              <td>
                {item?.is_supplier && Array.isArray(item?.our_debt_amount) ? (() => {
                  const [manat, dollar, rubl] = item.our_debt_amount;
                  const debts = [];
                  if (manat !== 0) debts.push(`${manat} ₼`);
                  if (dollar !== 0) debts.push(`${dollar} $`);
                  if (rubl !== 0) debts.push(`${rubl} ₽`);
                  return debts.length > 0 ? debts.join(' | ') : '0 ₼';
                })() : `${item?.our_debt_amount || 0} ₼`}
              </td>
              <td>
                {item.status === "S" ? "Satış Qiyməti"
                  : item.status === "E" ? "Endirimli Qiyməti"
                  : "—"}
              </td>
              <td className='table_update'>
                <FaPenToSquare onClick={() => updateCustomer(item)} />
                <AiTwotoneDelete onClick={() => deleteCustomer(item?.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pageCount > 1 && (
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
      )}
    </div>
  );
};

export default CustomerTableEnd;
