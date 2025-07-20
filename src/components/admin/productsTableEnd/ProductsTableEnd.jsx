import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { FaPenToSquare } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { productsDeleteModalFunc, setUpdateProductsObjFunc } from '../../../redux/slices/admin/productTableSlice';
import { useNavigate } from 'react-router-dom';
// import "./css/ProductsTableEnd.css"




const ITEMS_PER_PAGE = 8;

const ProductsTableEnd = ({ productsList }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = productsList?.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(productsList?.length / ITEMS_PER_PAGE);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const currencyMap = {
        D: "$",
        M: "₼",
        R: "₽"
    };

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const deleteProducts=(x)=>{
        dispatch(productsDeleteModalFunc(x))
    }

     const updateProducts=(item)=>{
        navigate("/update-new-products")
        dispatch(setUpdateProductsObjFunc(item))
    }

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Məhsul Adı</th>
                        <th>Artikl</th>
                        <th>Miqdar</th>
                        <th>Maya Dəyəri</th>
                        <th>Alış Qiyməti</th>
                        <th>Satış Qiyməti</th>
                        <th>Endirimli Qiymət</th>
                        {/* <th>Gəliş Tarixi</th> */}
                        <th>Düzəliş/Sil</th>
                    </tr>
                </thead>

                <tbody>
                    {currentPageData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.name || "-"}</td>
                            <td className='table_article_scroll'>{item?.articles?.map(article => article.name).join(', ') || "-"}</td>
                            <td>{item?.amount || "-"}</td>
                            <td>{item?.cost_price + " ₼" || "-"}</td>
                            <td>{item?.purchase_price} {currencyMap[item?.currency] || ""}</td>
                            <td>{item?.price + " ₼" || "-"}</td>
                            <td>{item?.discount_price + " ₼" || "-"}</td>
                            {/* <td>{item?.date || "-"}</td> */}
                            <td className='table_update'>
                                <FaPenToSquare onClick={() => updateProducts(item)} />
                                <AiTwotoneDelete onClick={() => deleteProducts(item?.id)} />
                            </td>
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

export default ProductsTableEnd;
