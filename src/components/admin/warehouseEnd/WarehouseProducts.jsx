import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
// import "./css/WarehouseProducts.css"

const data = [
  {
    marka: "Castrol",
    productName: "Lada yağı",
    article: ["504", "504A"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Anbarda",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Opel",
    productName: "Mühərrik yağı",
    article: ["001"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Gözləyir",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Hyundai",
    productName: "Radiator",
    article: ["102", "102B"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Anbarda",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Toyota",
    productName: "Əyləc diski",
    article: ["066"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Anbarda",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "BMW",
    productName: "Mühərrik yağı",
    article: ["002", "002C"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Gözləyir",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Hyundai",
    productName: "Radiator",
    article: ["103"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Anbarda",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Toyota",
    productName: "Əyləc diski",
    article: ["105"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Gözləyir",
    purchaseDate: "03.11.2024"
  },
  {
    marka: "Opel",
    productName: "Mühərrik yağı",
    article: ["010"],
    quantity: 1000,
    costPrice: "12 ₼",
    status: "Gözləyir",
    purchaseDate: "03.11.2024"
  },
];


const ITEMS_PER_PAGE = 3;

const WarehouseProducts = () => {
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
                        <th>Artikl</th>
                        <th>Miqdar</th>
                        <th>Maya dəyəri</th>
                        <th>Əməliyyat</th>
                    </tr>
                </thead>
              <tbody>
  {currentPageData.map((item, index) => (
    <tr key={index}>
      <td>{item.productName}</td>
      <td>{item.marka}</td>
      <td>{item.article.join(', ')}</td>
      <td>{item.quantity}</td>
      <td>{item.costPrice}</td>
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

export default WarehouseProducts;
