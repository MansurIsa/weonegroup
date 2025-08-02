import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/salesTableEnd.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSalesList } from '../../../actions/salesAction/salesAction';
import { getCustomerFactureList } from '../../../actions/loginAction/loginAction';
import { FaPenToSquare } from 'react-icons/fa6';
import { AiTwotoneDelete } from 'react-icons/ai';
import { saleDeleteModalFunc, saleUpdateModalFunc, saleUpdateModalFuncCommon, setSaleUpdateObjFunc } from '../../../redux/slices/admin/salesSlice';
import SearchInpMain from '../searchInpMain/SearchInpMain';

const ITEMS_PER_PAGE = 5;

const SalesTableEnd = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredSales, setFilteredSales] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { salesList } = useSelector(state => state.sales);

    useEffect(() => {
        dispatch(getSalesList());
    }, [dispatch]);

    // salesList gəldikdə ilkin olaraq hamısını göstər
    useEffect(() => {
        setFilteredSales(salesList);
    }, [salesList]);

   const handleSalesCustomer = async (customerId) => {
  if (!customerId) return;

  console.log("Selected Customer ID:", customerId);

  try {
    // dispatch prosesi tamamlanmadan navigate etmə
    await dispatch(getCustomerFactureList(customerId));

    // yalnız bütün məlumatlar alındıqdan sonra səhifəni dəyiş
    navigate(`/customer-movement-facture`);
  } catch (error) {
    console.error("Faktura alınarkən xəta baş verdi:", error);
  }
};



    const formatDateTime = (datetime) => {
        const date = new Date(datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hour}:${minute}`;
    };

    // Axtarış funksiyası
   const handleSearch = (query) => {
  setSearchQuery(query);

  const lowerQuery = query.toLowerCase();

  const filtered = salesList.filter(sale => {
    const customerMatch = sale?.customer?.toLowerCase().includes(lowerQuery);
    const sellerMatch = sale?.seller?.toLowerCase().includes(lowerQuery);
    const amountMatch = sale?.total_amount?.toString().includes(lowerQuery);
    const statusMatch =
      (sale?.sale_status === "S" && "satılıb".includes(lowerQuery)) ||
      (sale?.sale_status === "G" && "gözləyir".includes(lowerQuery));

    return customerMatch || sellerMatch || amountMatch || statusMatch;
  });

  setFilteredSales(filtered);
  setCurrentPage(0);
};

console.log(filteredSales);


    // Tarix filtrası tətbiq et
    const dateFilteredData = filteredSales.filter(item => {
        const itemDate = new Date(item.sale_datetime);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && end) return itemDate >= start && itemDate <= end;
        if (start) return itemDate >= start;
        if (end) return itemDate <= end;
        return true;
    });

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = dateFilteredData.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(dateFilteredData.length / ITEMS_PER_PAGE);
    console.log(currentPageData);
    

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const deleteSale = (id) => {
        dispatch(saleDeleteModalFunc(id));
    };

    const updateSale=(x)=>{
       dispatch(saleUpdateModalFuncCommon(x))      
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
                </div>
            </div>

            <SearchInpMain onSearch={handleSearch} />

            <table className='custom_table custom_table_sales'>
                <thead>
                    <tr>
                        <th className='number_table'></th>
                        <th>Müştəri</th>
                        <th>Satıcı</th>
                        <th>Ümumi Məbləğ</th>
                        <th>Satış Tarixi</th>
                        <th>Status</th>
                        {/* <th>Sil</th> */}
                        <th>Düzəliş/Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((item) => (
                        <tr key={item.id}>
                            <td className='number_table' onClick={() => handleSalesCustomer(item?.id)} style={{ cursor: "pointer" }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 5H6V4H10V5ZM12 14H3V12H4V11H3V8.5H4V7.5H3V5H4V4H3V2H12V15C12.5523 15 13 14.5523 13 14V2C13 1.45 12.55 1 12 1H3C2.45 1 2 1.45 2 2V4H1V5H2V7.5H1V8.5H2V11H1V12H2V14C2 14.55 2.45 15 3 15H12V14ZM10 7.5H6V8.5H10V7.5Z"
                                        fill="#202020" />
                                </svg>
                            </td>
                            <td>{item.customer || "-"}</td>
                            <td>{item?.seller || "-"}</td>
                            <td>{item?.total_amount || "-"} ₼</td>
                            <td>{formatDateTime(item?.sale_datetime)}</td>
                            <td style={{
                                color:
                                    item?.sale_status === "S"
                                        ? "var(--green)"
                                        : item?.sale_status === "G"
                                            ? "var(--yellow)"
                                            : "inherit"
                            }}>{item?.sale_status === "S" ? "Satılıb" : item?.sale_status === "G" ? "Gözləyir" : "-"}</td>
                            <td className='table_update'>
                                <FaPenToSquare onClick={() => updateSale(item)} />
                                <AiTwotoneDelete onClick={() => deleteSale(item?.id)} />
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

export default SalesTableEnd;
