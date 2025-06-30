import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/salesTableEnd.css"
import { useNavigate } from 'react-router-dom';

const data = [
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Opel",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Toyuto",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Toyuto",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Toyuto",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Opel",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Opel",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Opel",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
    {
        customerName: "Elçin Quliyev",
        productName: "Mühərrik yağı",
        brand: "Opel",
        quantity: 1000,
        totalPrice: "200 ₼",
        date: "15.05.2025 12:00",
    },
];



const ITEMS_PER_PAGE = 3;

const SalesTableEnd = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const navigate=useNavigate()

    const handleSalesCustomer=()=>{
        navigate("/product-sales-customer")
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <div className="form_group sales_dates_inputs">
                <label>Tarix aralığı</label>
                <div className="date_range">
                    <input type="date" defaultValue="2024-11-03" />
                    -
                    <input type="date" defaultValue="2025-06-03" />
                </div>
            </div>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Müştəri Adı</th>
                        <th>Məhsul</th>
                        <th>Marka</th>
                        <th>Miqdar</th>
                        <th>Ümumi Məbləğ</th>
                        <th>Tarix</th>
                    </tr>
                </thead>

                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            <td onClick={()=>handleSalesCustomer()} style={{ cursor: "pointer" }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 5H6V4H10V5ZM12 14H3V12H4V11H3V8.5H4V7.5H3V5H4V4H3V2H12V15C12.5523 15 13 14.5523 13 14V2C13 1.45 12.55 1 12 1H3C2.45 1 2 1.45 2 2V4H1V5H2V7.5H1V8.5H2V11H1V12H2V14C2 14.55 2.45 15 3 15H12V14ZM10 7.5H6V8.5H10V7.5Z" fill="#202020" />
                                </svg>
                            </td>
                            <td>{item.customerName}</td>
                            <td>{item.productName}</td>
                            <td>{item.brand}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.date}</td>
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

export default SalesTableEnd;
