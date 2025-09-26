import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./css/filterProducts.css";
import FilterProductsContainer from "./FilterProductsContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrandList,
  getCategoryList,
  getProductsListTest,
  getStoreList,
  getRecentProductsList,
} from "../../../actions/productsAction/productsAction";
import { getUserObj } from "../../../actions/loginAction/loginAction";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

// Debounce helper
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

// Memoized FilterProductsContainer
const MemoizedProductsContainer = React.memo(FilterProductsContainer);

const FilterProducts = () => {
  const dispatch = useDispatch();

  // Search params (for page)
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page from URL or default to 1 (zero-based in state)
  const pageFromUrl = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl - 1); // 0-based index for ReactPaginate

  const pageSize = 5;

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [activeCategory, setActiveCategory] = useState("Hamısı");
  const [activeBrand, setActiveBrand] = useState("Hamısı");
  const [activeStore, setActiveStore] = useState("Hamısı");

  const {
    recentProductsList,
    categoryList,
    brandList,
    storeList,
    count1,
    productsListTest,
    count2,
  } = useSelector((state) => state.products);

  // Page reset on search or filter change
// useEffect(() => {
//   setCurrentPage(0);
//   setSearchParams({ page: 1 });
// }, [debouncedSearch, activeCategory, activeBrand, activeStore, setSearchParams]);


  // Sync currentPage state with URL changes (if user navigates back/forward)
  useEffect(() => {
    // pageFromUrl might change if URL changes externally (back/forward)
    if (pageFromUrl - 1 !== currentPage) {
      setCurrentPage(pageFromUrl - 1);
    }
  }, [pageFromUrl, currentPage]);

  // Load user and lists once
  useEffect(() => {
    dispatch(getUserObj());
    dispatch(getCategoryList());
    dispatch(getBrandList());
    dispatch(getStoreList());
  }, [dispatch]);

  // Load products based on filters and currentPage
  useEffect(() => {
    if (activeCategory === "Yeni gələnlər") {
      dispatch(
        getRecentProductsList(
          currentPage + 1,
          debouncedSearch,
          activeBrand !== "Hamısı" ? activeBrand : "",
          activeStore !== "Hamısı" ? activeStore : ""
        )
      );
    } else {
      dispatch(
        getProductsListTest(
          currentPage + 1,
          debouncedSearch,
          activeCategory !== "Hamısı" ? activeCategory : "",
          activeBrand !== "Hamısı" ? activeBrand : "",
          activeStore !== "Hamısı" ? activeStore : ""
        )
      );
    }
  }, [
    dispatch,
    currentPage,
    debouncedSearch,
    activeCategory,
    activeBrand,
    activeStore,
  ]);

  // Handle page click: update currentPage and sync URL
  const handlePageClick = useCallback(
    (data) => {
      const selectedPage = data.selected;
      setCurrentPage(selectedPage);
      setSearchParams({ page: selectedPage + 1 }); // update URL (1-based)
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams]
  );

  const pageCount =
    activeCategory === "Yeni gələnlər"
      ? Math.ceil(count1 / pageSize)
      : Math.ceil(count2 / pageSize);

  // Memoize lists
  const latestProducts = useMemo(() => {
    if (!recentProductsList) return [];
    return recentProductsList.length > 100
      ? recentProductsList.slice(-100)
      : recentProductsList;
  }, [recentProductsList]);

  const normalProducts = useMemo(() => productsListTest || [], [productsListTest]);

  const categoryButtons = useMemo(() => {
    return (
      <>
        <button
          onClick={() => setActiveCategory("Hamısı")}
          className={activeCategory === "Hamısı" ? "active_category" : ""}
        >
          Hamısı
        </button>

        <button
          onClick={() => setActiveCategory("Yeni gələnlər")}
          className={activeCategory === "Yeni gələnlər" ? "active_category" : ""}
        >
          Yeni gələnlər
        </button>

        {categoryList?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={activeCategory === cat.name ? "active_category" : ""}
          >
            {cat.name}
          </button>
        ))}
      </>
    );
  }, [categoryList, activeCategory]);

  return (
    <div className="filter_products_parent_container">
      {/* Search və Dropdowns */}
      <div className="filter_products_serach_btn">
        <div className="filter_products_serach">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M17.5605 15.4395L13.7528 11.6318C14.5395 10.446 15 9.02625 15 7.5C15 3.3645 11.6355 0 7.5 0C3.3645 0 0 3.3645 0 7.5C0 11.6355 3.3645 15 7.5 15C9.02625 15 10.446 14.5395 11.6318 13.7528L15.4395 17.5605C16.0245 18.1462 16.9755 18.1462 17.5605 17.5605C18.1462 16.9748 18.1462 16.0252 17.5605 15.4395ZM2.25 7.5C2.25 4.605 4.605 2.25 7.5 2.25C10.395 2.25 12.75 4.605 12.75 7.5C12.75 10.395 10.395 12.75 7.5 12.75C4.605 12.75 2.25 10.395 2.25 7.5Z"
              fill="#8C8C8C"
            />
          </svg>
          <input
            placeholder="Məhsulu axtar..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Marka Dropdown */}
        <div className="brand_dropdown_container">
          <button onClick={() => setBrandDropdownOpen((prev) => !prev)}>
            {activeBrand === "Hamısı" ? "Markalar" : activeBrand}
          </button>
          {brandDropdownOpen && (
            <div className="brand_dropdown">
              <div
                className="brand_item"
                onClick={() => {
                  setActiveBrand("Hamısı");
                  setBrandDropdownOpen(false);
                }}
              >
                Hamısı
              </div>
              {brandList?.map((brand) => (
                <div
                  key={brand.id}
                  className="brand_item"
                  onClick={() => {
                    setActiveBrand(brand.name);
                    setBrandDropdownOpen(false);
                  }}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brend (Store) Dropdown */}
        <div className="brand_dropdown_container">
          <button onClick={() => setStoreDropdownOpen((prev) => !prev)}>
            {activeStore === "Hamısı" ? "Brendlər" : activeStore}
          </button>
          {storeDropdownOpen && (
            <div className="brand_dropdown">
              <div
                className="brand_item"
                onClick={() => {
                  setActiveStore("Hamısı");
                  setStoreDropdownOpen(false);
                }}
              >
                Hamısı
              </div>
              {storeList?.map((store) => (
                <div
                  key={store.id}
                  className="brand_item"
                  onClick={() => {
                    setActiveStore(store.name);
                    setStoreDropdownOpen(false);
                  }}
                >
                  {store.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Kateqoriyalar */}
      <div className="filter_products_categories">{categoryButtons}</div>

      {/* Məhsullar */}
      {activeCategory === "Yeni gələnlər" ? (
        latestProducts?.length === 0 ? (
          <div className="no_products_found">
            <p>Məhsul tapılmadı</p>
          </div>
        ) : (
          <MemoizedProductsContainer productsList={latestProducts} />
        )
      ) : normalProducts?.length === 0 ? (
        <div className="no_products_found">
          <p>Məhsul tapılmadı</p>
        </div>
      ) : (
        <MemoizedProductsContainer productsList={normalProducts} />
      )}

      {/* Pagination */}
      {((activeCategory === "Yeni gələnlər" && count1 > pageSize) ||
        (activeCategory !== "Yeni gələnlər" && count2 > pageSize)) && (
        <ReactPaginate
          previousLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M7 1L1 7L7 13"
                stroke="#9F9FA0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          nextLabel={
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path
                d="M1 1L7 7L1 13"
                stroke="#202020"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"dashboard_end_pagination"}
          pageClassName={"dashboard_end_page"}
          pageLinkClassName={"dashboard_end_page_link"}
          previousClassName={"dashboard_end_arrow"}
          nextClassName={"dashboard_end_arrow"}
          activeClassName={"dashboard_end_active"}
          forcePage={currentPage} // force ReactPaginate to highlight correct page
        />
      )}
    </div>
  );
};

export default FilterProducts;
