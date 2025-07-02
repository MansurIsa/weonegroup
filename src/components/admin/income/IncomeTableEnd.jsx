import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const incomeData = [
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 1,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
    {
        name: "Elçin Quliyev",
        product: "Disk 17",
        price: "240 AZN",
        quantity: 10,
        total: "200 ₼",
        date: "15.05.2025",
        time: "12:00"
    },
];

const ITEMS_PER_PAGE = 4;

const IncomeTableEnd = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = incomeData.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(incomeData.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>Məhsul</th>
                        <th>Satış Qiyməti</th>
                        <th>Miqdarı</th>
                        <th>Məbləğ</th>
                        <th>Ödəniş Tarixi</th>
                    </tr>
                </thead>

                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.product}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.total}</td>
                            <td>{item.date} &nbsp;&nbsp; {item.time}</td>
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
