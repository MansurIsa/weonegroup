import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import "./css/customerFacture.css"

const ITEMS_PER_PAGE = 4;

const CustomerFactureEnd = ({ factureList = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = factureList.slice(offset, offset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(factureList.length / ITEMS_PER_PAGE);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const returnCustomerMovement = () => {
    navigate("/customer-movement");
  };

  // Ümumi məbləğ hesabla
  const totalAmount = factureList.reduce(
    (acc, item) => acc + (item.amount * item.price),
    0
  );
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='admin_container dashboard_end_container'>
      <table className='custom_table'>
        <thead>
          <tr>
            <th>N</th>
            <th>Məhsul Adı</th>
            <th>Artikl</th>
            <th>Kateqoriya</th>
            <th>Marka</th>
            <th>Brend</th>
            <th>Miqdar</th>
            <th>Satış Qiyməti</th>
            <th>Ümumi məbləğ</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => (
            <tr key={item.id}>
              <td>{offset + index + 1}</td>
              <td>{item.product?.name || '—'}</td>
              <td>
                {item.product?.articles?.map((art) => art.name).join(', ') || '—'}
              </td>
               <td>{item.product?.category?.name || '—'}</td>
               <td>{item.product?.brand?.name || '—'}</td>
               <td>{item.product?.store?.name || '—'}</td>
              <td>{item.amount}</td>
              <td>{item.price} ₼</td>
              <td>{(item.amount * item.price).toFixed(2)} ₼</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="warehouse_summary">
        <div>
          <label>Ümumi gəlir</label>
          <span>{totalAmount.toFixed(2)} AZN</span>
        </div>
      </div>

      <div className="warehouse_submit sales_products_factura_btns">
        <button className="save_btn" onClick={handlePrint}>Çap et</button>

        <button className="save_btn" onClick={returnCustomerMovement}>
          Geri dön
        </button>
      </div>

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

export default CustomerFactureEnd;
