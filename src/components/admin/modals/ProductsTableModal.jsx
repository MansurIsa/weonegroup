import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCloseModal, setSelectedProduct } from '../../../redux/slices/admin/productTableSlice';
import {
  getBrandList,
  getCategoryList,
  getProductsList
} from '../../../actions/productsAction/productsAction';
import './css/modals.css';

const ProductsTableModal = () => {
  const dispatch = useDispatch();

  const { categoryList, brandList, productsList } = useSelector(state => state.products);

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(getBrandList());
    dispatch(getCategoryList());
    dispatch(getProductsList());
  }, [dispatch]);

  const filtered = productsList?.filter(p =>
    (!selectedBrand || p.brand?.id === +selectedBrand) &&
    (!selectedCategory || p.category?.id === +selectedCategory) &&
    (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.articles?.some(a => a.name.toLowerCase().includes(search.toLowerCase()))
    )
  ) || [];

  const handleRowSelect = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null); // deselect if already selected
    } else {
      setSelectedRow(index); // select new one
    }
  };

  const handleSave = () => {
    if (selectedRow === null) return;

    const selectedProduct = filtered[selectedRow];
    console.log("Seçilmiş məhsul:", selectedProduct);

    // Burada istəsəniz Redux-a ötürə bilərsiniz
    dispatch(setSelectedProduct(selectedProduct?.id))

    dispatch(handleCloseModal());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(handleCloseModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container">
          <div className="warehouse_content">
            <div className="warehouse_sidebar">
              <input
                type="text"
                placeholder="Axtar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="">Bütün Markalar</option>
                {brandList?.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>

              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Bütün Kateqoriyalar</option>
                {categoryList?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="warehouse_table_wrapper">
              <table className="warehouse_table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Məhsul Adı</th>
                    <th>Artikl</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="radio"
                          name="selectProduct"
                          checked={selectedRow === index}
                          onChange={() => handleRowSelect(index)}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.articles?.map(a => a.name).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="warehouse_submit">
                <button className="save_btn" onClick={handleSave}>Yadda saxla</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTableModal;
