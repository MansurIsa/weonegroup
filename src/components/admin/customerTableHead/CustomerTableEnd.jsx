import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';







const ITEMS_PER_PAGE = 3;

const CustomerTableEnd = ({ usersList }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentPageData = usersList.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(usersList.length / ITEMS_PER_PAGE);


    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className='admin_container dashboard_end_container'>
            <table className='custom_table'>
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>İstifadəçi adı</th>
                        <th>Əlaqə nömrəsi</th>
                        <th>Ünvan</th>
                        <th>Bizə borc</th>
                        <th>Bizim borc</th>
                        <th>Ödəniş status</th>
                        <th style={{ cursor: "pointer" }}>
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.22 16.4563L9.981 15.9483L20.584 5.21833C20.6676 5.13263 20.7142 5.01747 20.7136 4.89772C20.7131 4.77797 20.6654 4.66325 20.581 4.57833L19.946 3.93633C19.905 3.89417 19.8559 3.8606 19.8018 3.83759C19.7477 3.81458 19.6895 3.80258 19.6306 3.8023C19.5718 3.80203 19.5135 3.81347 19.4591 3.83597C19.4048 3.85846 19.3554 3.89156 19.314 3.93333L8.739 14.6353L8.22 16.4563ZM21.203 2.66433L21.838 3.30733C22.714 4.19433 22.722 5.62533 21.854 6.50333L10.928 17.5613L7.164 18.6453C7.05021 18.6773 6.93123 18.6866 6.81386 18.6726C6.6965 18.6586 6.58303 18.6216 6.47996 18.5637C6.37688 18.5059 6.28621 18.4283 6.21313 18.3354C6.14004 18.2425 6.08597 18.1361 6.054 18.0223C6.00496 17.8573 6.00426 17.6817 6.052 17.5163L7.147 13.6763L18.044 2.64733C18.2512 2.43869 18.4979 2.2734 18.7696 2.16109C19.0414 2.04878 19.3328 1.9917 19.6269 1.99319C19.9209 1.99468 20.2117 2.05471 20.4823 2.16976C20.7529 2.28482 20.9979 2.4536 21.203 2.66433ZM9.684 3.81733C10.18 3.81733 10.582 4.22433 10.582 4.72633C10.5828 4.845 10.5602 4.96266 10.5155 5.07259C10.4708 5.18251 10.4048 5.28255 10.3214 5.36697C10.238 5.45139 10.1388 5.51854 10.0294 5.56459C9.92004 5.61064 9.80267 5.63468 9.684 5.63533H6.092C5.1 5.63533 4.296 6.44934 4.296 7.45233V18.3583C4.296 19.3623 5.1 20.1763 6.092 20.1763H16.868C17.86 20.1763 18.665 19.3623 18.665 18.3583V14.7233C18.665 14.2213 19.067 13.8143 19.563 13.8143C20.059 13.8143 20.461 14.2213 20.461 14.7243V18.3583C20.461 20.3663 18.852 21.9943 16.868 21.9943H6.092C4.108 21.9943 2.5 20.3663 2.5 18.3583V7.45233C2.5 5.44533 4.108 3.81733 6.092 3.81733H9.684Z" fill="#202020" />
                            </svg>
                        </th>
                    </tr>
                </thead>


                <tbody>
                    {currentPageData?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.first_name  || "-"} {item.last_name|| "-"}</td>

                            <td>{item.username || "-"}</td>
                            <td>{item.phone_number || "-"}</td>
                            <td>{item.address || "-"}</td>
                            <td>0 ₼</td> {/* Bizə borc üçün hazırda dummy dəyər */}
                            <td>0 ₼</td> {/* Bizim borc üçün hazırda dummy dəyər */}
                            <td>
                                {
                                    item.status === "S" ? "Satış Qiyməti"
                                        : item.status === "E" ? "Endirimli Qiyməti"
                                            : item.status === "SE" ? "Satış və Endirimli Qiyməti"
                                                : "—"
                                }
                            </td>
                            <td style={{ cursor: "pointer" }}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="4" r="1.5" fill="#202020" />
                                    <circle cx="10" cy="10" r="1.5" fill="#202020" />
                                    <circle cx="10" cy="16" r="1.5" fill="#202020" />
                                </svg>
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

export default CustomerTableEnd;
