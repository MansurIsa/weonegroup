import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/productMovementEnd.css"
import { useNavigate } from 'react-router-dom';

const data = [
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: 1000,
        sold: 2,
        remaining: 45
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 1,
        remaining: 44
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: 1000,
        sold: "",
        remaining: 1000
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 1,
        remaining: 999
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 2,
        remaining: 987
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 3,
        remaining: 995
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 4,
        remaining: 993
    },
    {
        document: "1456789",
        customer: "Elçin Quliyev",
        date: "03.06.2025",
        incoming: "",
        sold: 4,
        remaining: 990
    },
];




// const ITEMS_PER_PAGE = 3;

const ProductMovementEnd = () => {
    // const [currentPage, setCurrentPage] = useState(0);

    // const offset = currentPage * ITEMS_PER_PAGE;
    // const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);
    // const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    // const handlePageClick = (event) => {
    //     setCurrentPage(event.selected);
    // };

    const navigate = useNavigate()

    const handleReturn = () => {
        navigate("/products-table")
    }

    const handleProductsMovementCustomer=()=>{
        navigate("/product-movement-customer")
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Anbar/Sənəd</th>
                        <th>Müştəri</th>
                        <th>Tarix</th>
                        <th>Gələn məhsul sayı</th>
                        <th>Satılan məhsul sayı</th>
                        <th>Qalan məhsul sayı</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.document}</td>
                            <td className='customer_icon'>
                                <span>{item.customer}</span>
                                <svg onClick={()=>handleProductsMovementCustomer()} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 1.5H6C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V6H3V7.5H4.5V11.25H3V12.75H4.5V16.5H3V18H4.5V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5ZM19.5 21H6V18H7.5V16.5H6V12.75H7.5V11.25H6V7.5H7.5V6H6V3H19.5V21Z" fill="#202020" />
                                    <path d="M10.5 6H16.5V7.5H10.5V6ZM10.5 11.25H16.5V12.75H10.5V11.25ZM10.5 16.5H16.5V18H10.5V16.5Z" fill="#202020" />
                                </svg>
                            </td>
                            <td>{item.date}</td>
                            <td>{item.incoming}</td>
                            <td>{item.sold}</td>
                            <td>{item.remaining}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form_footer">
                <button onClick={handleReturn} type="submit" className="save_btn">Geri dön</button>
            </div>

            {/* <ReactPaginate
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
            /> */}
        </div>
    );
};

export default ProductMovementEnd;
