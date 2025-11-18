import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/salesTableEnd.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList } from '../../../actions/salesAction/salesAction';
import { getCustomerFactureList } from '../../../actions/loginAction/loginAction';
import { FaPenToSquare } from 'react-icons/fa6';
import { AiTwotoneDelete } from 'react-icons/ai';
import { plusSalesFunc, saleDeleteModalFunc, saleUpdateModalFunc, saleUpdateModalFuncCommon, setSaleUpdateObjFunc } from '../../../redux/slices/admin/salesSlice';
import SearchInpMain from '../searchInpMain/SearchInpMain';
import { FaPlus } from 'react-icons/fa';

const ITEMS_PER_PAGE = 10;
const STORAGE_KEY = 'salesTableCurrentPage';
const DATE_RANGE_STORAGE_KEY = 'salesTableDateRange';
const AMOUNT_RANGE_STORAGE_KEY = 'salesTableAmountRange';

const SalesTableEnd = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    // localStorage-dan məlumatları oxuyaraq state-ləri başlat
    const [minAmount, setMinAmount] = useState(() => {
        const savedAmountRange = localStorage.getItem(AMOUNT_RANGE_STORAGE_KEY);
        return savedAmountRange ? JSON.parse(savedAmountRange).minAmount : '';
    });
    
    const [maxAmount, setMaxAmount] = useState(() => {
        const savedAmountRange = localStorage.getItem(AMOUNT_RANGE_STORAGE_KEY);
        return savedAmountRange ? JSON.parse(savedAmountRange).maxAmount : '';
    });
    
    const [startDate, setStartDate] = useState(() => {
        const savedDateRange = localStorage.getItem(DATE_RANGE_STORAGE_KEY);
        return savedDateRange ? JSON.parse(savedDateRange).startDate : '';
    });
    
    const [endDate, setEndDate] = useState(() => {
        const savedDateRange = localStorage.getItem(DATE_RANGE_STORAGE_KEY);
        return savedDateRange ? JSON.parse(savedDateRange).endDate : '';
    });
    
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem(STORAGE_KEY);
        return savedPage ? parseInt(savedPage, 10) : 1;
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { salesList, count } = useSelector(state => state.sales);
    console.log(salesList);

    useEffect(() => {
        fetchSales(currentPage, searchQuery, minAmount, maxAmount, startDate, endDate);
    }, [currentPage, searchQuery, minAmount, maxAmount, startDate, endDate]);

    // Səhifə dəyişdikdə localStorage-a yaz
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, currentPage.toString());
    }, [currentPage]);

    // Tarix aralığı dəyişdikdə localStorage-a yaz
    useEffect(() => {
        const dateRange = { startDate, endDate };
        localStorage.setItem(DATE_RANGE_STORAGE_KEY, JSON.stringify(dateRange));
    }, [startDate, endDate]);

    // Məbləğ aralığı dəyişdikdə localStorage-a yaz
    useEffect(() => {
        const amountRange = { minAmount, maxAmount };
        localStorage.setItem(AMOUNT_RANGE_STORAGE_KEY, JSON.stringify(amountRange));
    }, [minAmount, maxAmount]);

    // Komponent unmount olarkən təmizləmək istəsəniz (lazım deyil, amma option kimi)
    // useEffect(() => {
    //     return () => {
    //         localStorage.removeItem(STORAGE_KEY);
    //         localStorage.removeItem(DATE_RANGE_STORAGE_KEY);
    //         localStorage.removeItem(AMOUNT_RANGE_STORAGE_KEY);
    //     };
    // }, []);

    const fetchSales = (page = 1, search = searchQuery, min = minAmount, max = maxAmount, start_date = startDate, end_date = endDate) => {
        dispatch(getSalesList(page, search, min, max, start_date, end_date));
        setCurrentPage(page);
    };

    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1;
        fetchSales(selectedPage);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        fetchSales(1, query);
    };

    const handleFilterAmount = () => {
        fetchSales(1, searchQuery, minAmount, maxAmount);
    };

    const handleFilterDate = () => {
        fetchSales(1, searchQuery, minAmount, maxAmount, startDate, endDate);
    };

    // Tarix filtrlərini təmizləmək üçün funksiya
    const handleClearDateFilter = () => {
        setStartDate('');
        setEndDate('');
        localStorage.removeItem(DATE_RANGE_STORAGE_KEY);
        fetchSales(1, searchQuery, minAmount, maxAmount, '', '');
    };

    // Məbləğ filtrlərini təmizləmək üçün funksiya
    const handleClearAmountFilter = () => {
        setMinAmount('');
        setMaxAmount('');
        localStorage.removeItem(AMOUNT_RANGE_STORAGE_KEY);
        fetchSales(1, searchQuery, '', '', startDate, endDate);
    };

    // Bütün filtrləri təmizləmək üçün funksiya
    const handleClearAllFilters = () => {
        setStartDate('');
        setEndDate('');
        setMinAmount('');
        setMaxAmount('');
        setSearchQuery('');
        localStorage.removeItem(DATE_RANGE_STORAGE_KEY);
        localStorage.removeItem(AMOUNT_RANGE_STORAGE_KEY);
        fetchSales(1, '', '', '', '', '');
    };

    const handleSalesCustomer = async (id, customerId) => {
        if (!id) return;
        await dispatch(getCustomerFactureList(id));
        navigate(`/customer-movement-facture`);
        localStorage.setItem("customerId", customerId)
    };

    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('az-AZ');
    };

    const deleteSale = (id) => {
        console.log(id);
        dispatch(saleDeleteModalFunc(id));
    }

    const updateSale = (x) => dispatch(saleUpdateModalFuncCommon(x));

    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    const plusUpdateSale = async (item) => {
        console.log(item);
        navigate("/sales-products-select")
        await dispatch(plusSalesFunc(item))
        await dispatch(getCustomerFactureList(item?.id));
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <div className="form_group sales_dates_inputs">
                <label>Tarix aralığı</label>
                <div className="date_range">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    -
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    {/* <button 
                        style={{ marginTop: "20px", marginLeft: "10px" }} 
                        className="submit_btn" 
                        onClick={handleFilterDate}
                    >
                        Tətbiq et
                    </button> */}
                    {(startDate || endDate) && (
                        <button 
                            style={{ marginTop: "20px", marginLeft: "10px", backgroundColor: '#ff4444' }} 
                            className="submit_btn" 
                            onClick={handleClearDateFilter}
                        >
                            Təmizlə
                        </button>
                    )}
                </div>
            </div>

            <div className="form_group">
                <label>Məbləğ aralığı</label>
                <div>
                    <input type="number" placeholder="Min" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
                    -
                    <input type="number" placeholder="Max" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
                    {/* <button style={{ marginTop: "20px" }} className="submit_btn" onClick={handleFilterAmount}>Tətbiq et</button> */}
                    {(minAmount || maxAmount) && (
                        <button 
                            style={{ marginTop: "20px", marginLeft: "10px", backgroundColor: '#ff4444' }} 
                            className="submit_btn" 
                            onClick={handleClearAmountFilter}
                        >
                            Təmizlə
                        </button>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <SearchInpMain onSearch={handleSearch} />
                {(startDate || endDate || minAmount || maxAmount || searchQuery) && (
                    <button 
                        style={{ backgroundColor: '#888', height: 'fit-content' }} 
                        className="submit_btn" 
                        onClick={handleClearAllFilters}
                    >
                        Bütün Filtrləri Təmizlə
                    </button>
                )}
            </div>

            <table className='custom_table custom_table_sales'>
                <thead>
                    <tr>
                        <th className='number_table'></th>
                        <th>Müştəri</th>
                        <th>Satıcı</th>
                        <th>Ümumi Məbləğ</th>
                        <th>Satış Tarixi</th>
                        <th>Status</th>
                        <th>Düzəliş/Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {salesList?.map((item) => (
                        <tr key={item.id}>
                            <td className='number_table' onClick={() => handleSalesCustomer(item?.id, item?.customer_id)} style={{ cursor: "pointer" }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 5H6V4H10V5ZM12 14H3V12H4V11H3V8.5H4V7.5H3V5H4V4H3V2H12V15C12.5523 15 13 14.5523 13 14V2C13 1.45 12.55 1 12 1H3C2.45 1 2 1.45 2 2V4H1V5H2V7.5H1V8.5H2V11H1V12H2V14C2 14.55 2.45 15 3 15H12V14ZM10 7.5H6V8.5H10V7.5Z"
                                        fill="#202020" />
                                </svg>
                            </td>
                            <td>{item.customer || "-"}</td>
                            <td>{item.seller || "-"}</td>
                            <td>{Math.round(item.total_amount * 100) / 100 ?? 0} ₼</td>
                            <td>{formatDateTime(item.sale_datetime)}</td>
                            <td style={{ color: item?.sale_status === "S" ? "green" : item?.sale_status === "G" ? "orange" : "inherit" }}>
                                {item?.sale_status === "S" ? "Satılıb" : item?.sale_status === "G" ? "Gözləyir" : "-"}
                            </td>
                            <td className='table_update'>
                                <FaPenToSquare onClick={() => updateSale(item)} />
                                <AiTwotoneDelete onClick={() => deleteSale(item?.id)} />
                                <FaPlus onClick={() => plusUpdateSale(item)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pageCount > 1 && (
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
                    forcePage={currentPage - 1}
                />)}
        </div>
    );
};

export default SalesTableEnd;