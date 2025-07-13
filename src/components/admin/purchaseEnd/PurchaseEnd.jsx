import React, {  useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/purchaseEnd.css"

const ITEMS_PER_PAGE = 5;

const PurchaseEnd = ({purchaseList}) => {
  
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = purchaseList.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(purchaseList.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const getStatusLabel = (code) => {
        switch (code) {
            case 'A': return 'Anbarda';
            case 'G': return 'Gözləyir';
            default: return 'Naməlum';
        }
    };

    const getStatusClass = (code) => {
        switch (code) {
            case 'A': return 'stocked';
            case 'G': return 'waiting';
            default: return 'unknown';
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('az-AZ');
    };

    const currencyMap = {
  D: "$",
  M: "₼",
  R: "₽"
};

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Məhsul Adı</th>
                        <th>Artikl</th>
                        <th>Miqdar</th>
                        <th>Alış Qiyməti</th>
                        <th>Maya Dəyəri</th>
                        <th>Satış Qiyməti</th>
                        <th>Endirimli Qiymət</th>
                        <th>Status</th>
                        <th>Alış Tarixi</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData?.map((item, index) => {
                        const product = item.product;
                        const articleNames = product.articles?.map(article => article.name).join(', ') || "-";
                        const statusText = getStatusLabel(item.status);
                        const statusClass = getStatusClass(item.status);

                        return (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{articleNames}</td>
                                <td>{item.amount}</td>
                               <td>{product.purchase_price} {currencyMap[product?.currency] || ""}</td>
                                <td>{product.cost_price} ₼</td>
                                <td>{product.price} ₼</td>
                                <td>{product.discount_price} ₼</td>
                                <td className={`status ${statusClass}`}>{statusText}</td>
                                <td>{formatDate(item.date)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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
        </div>
    );
};

export default PurchaseEnd;
