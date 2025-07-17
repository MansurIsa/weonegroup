import React, { useEffect, useState } from 'react';
import './css/filterProducts.css';
import FilterProductsContainer from './FilterProductsContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrandList,
  getCategoryList,
  getProductsList,
  getStoreList,
} from '../../../actions/productsAction/productsAction';

const FilterProducts = () => {
  const dispatch = useDispatch();
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Hamısı');
  const [activeBrand, setActiveBrand] = useState('Hamısı');
  const [activeStore, setActiveStore] = useState('Hamısı');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getProductsList());
    dispatch(getCategoryList());
    dispatch(getBrandList());
    dispatch(getStoreList());
  }, [dispatch]);

  const { productsList, categoryList, brandList, storeList } = useSelector(
    (state) => state.products
  );

  // ✅ Məhsulları filterlə
  const filteredProducts = productsList?.filter((product) => {
    const matchesCategory =
      activeCategory === 'Hamısı' || product.category?.name === activeCategory;
    const matchesBrand =
      activeBrand === 'Hamısı' || product.brand?.name === activeBrand;
    const matchesStore =
      activeStore === 'Hamısı' || product.store?.name === activeStore;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.articles?.some((article) =>
        article.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesBrand && matchesStore && matchesSearch;
  });

  return (
    <div className="filter_products_parent_container">
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
            {activeBrand === 'Hamısı' ? 'Markalar' : activeBrand}
          </button>
          {brandDropdownOpen && (
            <div className="brand_dropdown">
              <div
                className="brand_item"
                onClick={() => {
                  setActiveBrand('Hamısı');
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
            {activeStore === 'Hamısı' ? 'Brendlər' : activeStore}
          </button>
          {storeDropdownOpen && (
            <div className="brand_dropdown">
              <div
                className="brand_item"
                onClick={() => {
                  setActiveStore('Hamısı');
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
      <div className="filter_products_categories">
        <button
          onClick={() => setActiveCategory('Hamısı')}
          className={activeCategory === 'Hamısı' ? 'active_category' : ''}
        >
          Hamısı
        </button>
        {categoryList?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.name)}
            className={activeCategory === cat.name ? 'active_category' : ''}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Nəticələr */}
      {filteredProducts?.length === 0 ? (
        <div className="no_products_found">
          <p>Məhsul tapılmadı</p>
        </div>
      ) : (
        <FilterProductsContainer productsList={filteredProducts} />
      )}
    </div>
  );
};

export default FilterProducts;
