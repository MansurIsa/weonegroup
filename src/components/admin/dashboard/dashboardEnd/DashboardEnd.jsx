import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./css/dashboardEnd.css"

const data = [
    { mehsul: "Əyləc diski", marka: "Castrol", istehsalci: "AvtoParts MMC", qaliq: 2, tarix: "03.11.2024", status: "Tükənir" },
    { mehsul: "Mühərrik yağı", marka: "Opel", istehsalci: "Tekno Avto", qaliq: 0, tarix: "03.11.2024", status: "Bitib" },
    { mehsul: "Radiator", marka: "Hyundai", istehsalci: "OilMax", qaliq: 5, tarix: "03.11.2024", status: "Tükənir" },
    { mehsul: "Əyləc diski", marka: "Toyota", istehsalci: "OilMax", qaliq: 3, tarix: "03.11.2024", status: "Tükənir" },
    { mehsul: "Mühərrik yağı", marka: "BMW", istehsalci: "Tekno Avto", qaliq: 1, tarix: "03.11.2024", status: "Tükənir" },
    { mehsul: "Radiator", marka: "Hyundai", istehsalci: "AvtoParts MMC", qaliq: 0, tarix: "03.11.2024", status: "Bitib" },
    { mehsul: "Əyləc diski", marka: "Toyota", istehsalci: "Tekno Avto", qaliq: 6, tarix: "03.11.2024", status: "Tükənir" },
    { mehsul: "Mühərrik yağı", marka: "Opel", istehsalci: "AvtoParts MMC", qaliq: 7, tarix: "03.11.2024", status: "Tükənir" }
];

const ITEMS_PER_PAGE = 3;

const DashboardEnd = () => {
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
                        <th>Marka</th>
                        <th>İstehsalçı</th>
                        <th>Qalıq</th>
                        <th>Tarix</th>
                        <th>Status</th>
                        <th>Əməliyyat</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.mehsul}</td>
                            <td>{item.marka}</td>
                            <td>{item.istehsalci}</td>
                            <td>{item.qaliq}</td>
                            <td>{item.tarix}</td>
                            <td className={`status ${item.status === "Bitib" ? 'over' : 'runs_out'}`}>
                                {item.status}
                            </td>
                            <td className="operation">+ Stok əlavə et</td>
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

export default DashboardEnd;
