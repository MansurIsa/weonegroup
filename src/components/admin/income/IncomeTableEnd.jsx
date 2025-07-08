import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentList } from '../../../actions/incomeAction/incomeAction';
import "./css/income.css"; // Stil faylını özünə uyğun əlavə et

const ITEMS_PER_PAGE = 5;

const IncomeTableEnd = ({paymentList}) => {
   

    const [currentPage, setCurrentPage] = useState(0);



    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hour}:${minute}`;
    };

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = paymentList.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(paymentList.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>İstifadəşi adı</th>
                        {/* <th>Məhsul</th>
                        <th>Satış Qiyməti</th>
                        <th>Miqdarı</th> */}
                        <th>Məbləğ</th>
                        <th>Ödəniş Tarixi</th>
                    </tr>
                </thead>

                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.customer?.first_name || '-'} {item.customer?.last_name || '-'}</td>
                            <td>{item.customer?.username || '-'}</td>
                          
                            <td>{item.amount} ₼</td>
                            <td>{formatDateTime(item.datetime)}</td>
                        </tr>
                    ))}
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

export default IncomeTableEnd;
