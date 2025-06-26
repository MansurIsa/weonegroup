import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const data = [
    { productName: "Lada yağı", article: ["504", "504A"], quantity: 1000, price: "8.2 $", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Anbarda", purchaseDate: "03.11.2024" },
    { productName: "Mühərrik yağı", article: ["001"], quantity: 1000, price: "8.2 $", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Gözləyir", purchaseDate: "03.11.2024" },
    { productName: "Radiator", article: ["102", "102B"], quantity: 1000, price: "8.2 $", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Anbarda", purchaseDate: "03.11.2024" },
    { productName: "Əyləc diski", article: ["066"], quantity: 1000, price: "750 ₽", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Anbarda", purchaseDate: "03.11.2024" },
    { productName: "Mühərrik yağı", article: ["002", "002C"], quantity: 1000, price: "750 ₽", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Gözləyir", purchaseDate: "03.11.2024" },
    { productName: "Radiator", article: ["103"], quantity: 1000, price: "8.2 $", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Anbarda", purchaseDate: "03.11.2024" },
    { productName: "Əyləc diski", article: ["105"], quantity: 1000, price: "750 ₽", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Gözləyir", purchaseDate: "03.11.2024" },
    { productName: "Mühərrik yağı", article: ["010"], quantity: 1000, price: "750 ₽", costPrice: "12 ₼", salePrice: "17 ₼", discountPrice: "15 ₼", status: "Gözləyir", purchaseDate: "03.11.2024" },
];


const ITEMS_PER_PAGE = 3;

const PurchaseEnd = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = data.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Məhsul Adı</th>
                        <th>Artikl</th>
                        <th>Miqdar</th>
                        <th>Qiymət</th>
                        <th>Maya Dəyəri</th>
                        <th>Satış Qiyməti</th>
                        <th>Endirimli Qiymət</th>
                        <th>Status</th>
                        <th>Alış Tarixi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td>{item.article.join(", ")}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.costPrice}</td>
                            <td>{item.salePrice}</td>
                            <td>{item.discountPrice}</td>
                            <td className={`status ${item.status === "Pending" ? 'waiting' : 'stocked'}`}>
                                {item.status}
                            </td>
                            <td>{item.purchaseDate}</td>
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

export default PurchaseEnd;
