import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/purchaseEnd.css"
import { FaPenToSquare } from 'react-icons/fa6';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { purchaseUpdateModalFunc, setUpdatePurchaseObjFunc } from '../../../redux/slices/admin/purchaseSlices';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const PurchaseEnd = ({ purchaseList }) => {

    const [currentPage, setCurrentPage] = useState(0);
    const dispatch=useDispatch()
    const navigate=useNavigate()

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

    const deletePurchase=(x)=>{
       dispatch(purchaseUpdateModalFunc(x))
    
       
    }
    const updatePurchase=(item)=>{
        navigate("/update-new-purchase")
         dispatch(setUpdatePurchaseObjFunc(item))
    }

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
                        <th>Düzəliş/Sil</th>
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
                                <td className='table_article_scroll'>{articleNames}</td>
                                <td>{item.amount}</td>
                                <td>{product.purchase_price} {currencyMap[product?.currency] || ""}</td>
                                <td>{product.cost_price} ₼</td>
                                <td>{product.price} ₼</td>
                                <td>{product.discount_price} ₼</td>
                                <td className={`status ${statusClass}`}>{statusText}</td>
                                <td>{formatDate(item.date)}</td>
                                <td className='table_update'>
                                    <FaPenToSquare onClick={() => updatePurchase(item)} />
                                    <AiTwotoneDelete onClick={() => deletePurchase(item?.id)} />
                                </td>
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
