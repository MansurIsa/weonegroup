import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FaPenToSquare } from 'react-icons/fa6';
import { AiTwotoneDelete } from 'react-icons/ai';
import { deleteSupplierPaymentModal, handleSupplierUpdatePaymentModal } from '../../../redux/slices/admin/incomeSlices';

const ITEMS_PER_PAGE = 5;

const SupplierTableEnd = ({ paymentList }) => {

    console.log(paymentList);
    


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
    const dispatch = useDispatch()

    const deleteSupplier = (x) => {
        dispatch(deleteSupplierPaymentModal(x))
    }


    const updateSupplier = (item) => {
        dispatch(handleSupplierUpdatePaymentModal(item))
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>İstifadəçi adı</th>
                        {/* <th>Məhsul</th>
                        <th>Satış Qiyməti</th>
                        <th>Miqdarı</th> */}
                        <th>Məbləğ</th>
                        <th>Ödəniş Tarixi</th>
                        <th>Düzəliş/Sil</th>
                    </tr>
                </thead>

                <tbody>
                    {currentPageData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.supplier?.first_name || '-'} {item.supplier?.last_name || '-'}</td>
                            <td>{item.supplier?.username || '-'}</td>

                            <td>{item.amount} {item?.currency === 'M' ? '₼' : item?.currency==='D' ? '$' : item?.currency==='R'? '₽': ""}</td>
                            <td>{formatDateTime(item.datetime)}</td>
                            <td className='table_update'>
                                <FaPenToSquare onClick={() => updateSupplier(item)} />
                                <AiTwotoneDelete onClick={() => deleteSupplier(item?.id)} />
                            </td>
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

export default SupplierTableEnd;
