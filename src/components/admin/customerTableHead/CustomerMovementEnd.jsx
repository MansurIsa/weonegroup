import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import "./css/customerMovement.css"

const data = [
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 1023,
        paidAmount: 776,
        totalIncome: 776,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 1023,
        paidAmount: 855,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 1023,
        paidAmount: 1023,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 832,
        paidAmount: 832,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 832,
        paidAmount: 832,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 906,
        paidAmount: 906,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 906,
        paidAmount: 906,
        totalIncome: 200,
        debt: 323
    },
    {
        document: "1456789",
        date: "03.06.2025",
        productPrice: 200,
        paidAmount: 200,
        totalIncome: 200,
        debt: 323
    }
];





// const ITEMS_PER_PAGE = 3;

const CustomerMovementEnd = () => {
    // const [currentPage, setCurrentPage] = useState(0);

    // const offset = currentPage * ITEMS_PER_PAGE;
    // const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);
    // const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    // const handlePageClick = (event) => {
    //     setCurrentPage(event.selected);
    // };

    const navigate = useNavigate()

    const handleReturn = () => {
        navigate("/customers")
    }

    const handleCustomerFactura = () => {
        navigate("/customer-movement-facture")
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Faktura nömrəsi</th>
                        <th>Tarix</th>
                        <th>Məhsul qiyməti</th>
                        <th>Ödədiyi məbləğ</th>
                        <th>Ümumi gəlir</th>
                        <th>Qalıq borc</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.document}</td>
                            <td>{item.date}</td>
                            <td className='customer_movement_end_products_price'>{item.productPrice} ₼
                                <svg onClick={handleCustomerFactura} style={{cursor: "pointer"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.5 1.5H6C5.60218 1.5 5.22064 1.65804 4.93934 1.93934C4.65804 2.22064 4.5 2.60218 4.5 3V6H3V7.5H4.5V11.25H3V12.75H4.5V16.5H3V18H4.5V21C4.5 21.3978 4.65804 21.7794 4.93934 22.0607C5.22064 22.342 5.60218 22.5 6 22.5H19.5C19.8978 22.5 20.2794 22.342 20.5607 22.0607C20.842 21.7794 21 21.3978 21 21V3C21 2.60218 20.842 2.22064 20.5607 1.93934C20.2794 1.65804 19.8978 1.5 19.5 1.5ZM19.5 21H6V18H7.5V16.5H6V12.75H7.5V11.25H6V7.5H7.5V6H6V3H19.5V21Z" fill="#202020" />
                                    <path d="M10.5 6H16.5V7.5H10.5V6ZM10.5 11.25H16.5V12.75H10.5V11.25ZM10.5 16.5H16.5V18H10.5V16.5Z" fill="#202020" />
                                </svg>
                            </td>
                            <td>{item.paidAmount} ₼</td>
                            <td>{item.totalIncome} ₼</td>
                            <td>{item.debt} ₼</td>
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

export default CustomerMovementEnd;
