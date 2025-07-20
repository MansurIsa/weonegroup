import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { getBrandList, getCategoryList } from '../../actions/productsAction/productsAction';
import { getStockList } from '../../actions/stockActions/stockActions';
import { useDispatch, useSelector } from 'react-redux';
import { addSale } from '../../actions/salesAction/salesAction';
import toast from 'react-hot-toast';
import CustomCustomerSelect from '../../components/admin/salesTableHead/CustomCustomerSelect';
import { getUsersList } from '../../actions/loginAction/loginAction';

const SalesProductsSelect = () => {
  const [search, setSearch] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [quantityValues, setQuantityValues] = useState({});
  const [priceValues, setPriceValues] = useState({});
  const [statusValues, setStatusValues] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stockList } = useSelector(state => state.stock);
  const { usersList } = useSelector(state => state.login);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');

  useEffect(() => {
    dispatch(getBrandList());
    dispatch(getCategoryList());
    dispatch(getStockList());
    dispatch(getUsersList());
  }, [dispatch]);

  const returnSales = () => navigate("/sales");

  const filtered = stockList?.filter(p =>
    p.product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.product?.articles?.some(a => a.name.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  const toggleRow = (productId, product, stockAmount) => {
    const isSelected = selectedProductIds.includes(productId);

    if (isSelected) {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
      setQuantityValues(prev => {
        const copy = { ...prev }; delete copy[productId]; return copy;
      });
      setPriceValues(prev => {
        const copy = { ...prev }; delete copy[productId]; return copy;
      });
      setStatusValues(prev => {
        const copy = { ...prev }; delete copy[productId]; return copy;
      });
    } else {
      setSelectedProductIds(prev => [...prev, productId]);
      setQuantityValues(prev => ({ ...prev, [productId]: prev[productId] ?? 1 }));
      setPriceValues(prev => ({ ...prev, [productId]: prev[productId] ?? product?.price }));
      setStatusValues(prev => ({ ...prev, [productId]: prev[productId] ?? 'G' }));
    }
  };
const handleQuantityChange = (productId, value, maxAmount) => {
  const numericValue = value.replace(/^0+/, ''); // əvvəlki sıfırları sil
  if (numericValue === '' || (!isNaN(numericValue) && +numericValue >= 0)) {
    setQuantityValues((prev) => ({
      ...prev,
      [productId]: numericValue,
    }));
  }
};



  const handlePriceChange = (productId, value) => {
    const val = +value;
    if (val >= 0) {
      setPriceValues({ ...priceValues, [productId]: val });
    }
  };

  const handleStatusChange = (productId, value) => {
    setStatusValues({ ...statusValues, [productId]: value });
  };

  const handleDateChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const handleSave = () => {
    if (!selectedCustomerId || !selectedDateTime) {
      toast.error("Zəhmət olmasa müştəri və satış tarixini seçin.");
      return;
    }

    let hasError = false;
    const invalidProducts = [];

    const selectedItems = selectedProductIds.map(productId => {
      const stockItem = stockList.find(item => item.product.id === productId);
      const product = stockItem?.product;
      const quantity = +quantityValues[productId] || 0;
      const status = statusValues[productId] || 'G';

      const inStock = stockItem?.amount || 0;

      // ❗ Satılıb və miqdar > anbardakı say
      if (status === 'S' && quantity > inStock) {
        hasError = true;
        invalidProducts.push({ name: product?.name, available: inStock, id: productId });
      }

      return {
        product_id: productId,
        quantity,
        price: +priceValues[productId] || product?.price,
        status
      };
    });

    if (hasError) {
      invalidProducts.forEach(p => {
        toast.error(`Anbarda ${p.name} üçün yalnız ${p.available} ədəd mövcuddur.`);
      });
      return;
    }

    const payload = {
      customer: selectedCustomerId,
      products: selectedItems.map(p => p.product_id),
      prices: selectedItems.map(p => p.price),
      amounts: selectedItems.map(p => p.quantity),
      datetimes: selectedItems.map(() => selectedDateTime),
      statuses: selectedItems.map(p => p.status),
    };

    dispatch(addSale(payload, navigate));
  };


  return (
    <AdminLayout adminHeaderHide={true}>
      <div className="admin_container warehouse_page">
        <div className="return_btn">
          <button onClick={returnSales}>Geri dön</button>
        </div>

        <div className="left_box left_box_mb">
          <CustomCustomerSelect
            customers={usersList.filter(user => !user.is_staff)}
            value={selectedCustomerId}
            onChange={(id) => setSelectedCustomerId(id)}
          />

          <div className="form_group form_group_sales_table_head">
            <label>Satış tarixi</label>
            <input
              type="datetime-local"
              value={selectedDateTime}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="admin_header_search project_container">
          <input
            type="text"
            placeholder="Axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="warehouse_table_wrapper">
          <table className="warehouse_table">
            <thead>
              <tr>
                <th></th>
                <th>Məhsul Adı</th>
                <th>Artikl</th>
                <th>Qalan Say</th>
                <th>Maya Dəyəri</th>
                <th>Satış Qiyməti</th>
                <th>Endirimli Qiymət</th>
                <th>Miqdar</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => {
                const product = item.product;
                const productId = product.id;
                const isSelected = selectedProductIds.includes(productId);
                return (
                  <tr key={productId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(productId, product, item.amount)}
                      />
                    </td>
                    <td>{product?.name}</td>
                    <td className='table_article_scroll'>{product?.articles?.map(a => a.name).join(', ')}</td>
                    <td>{item.amount}</td>
                    <td>{product?.cost_price} ₼</td>
                    <td>
                      {isSelected ? (
                        <input
                          type="number"
                          value={priceValues[productId] ?? product?.price}
                          onChange={e => handlePriceChange(productId, e.target.value)}
                          className="price_input"
                        />
                      ) : (
                        `${product?.price} ₼`
                      )}
                    </td>
                    <td>{product?.discount_price ?? '-'} ₼</td>
                    <td>
                      {isSelected && (
                        <input
                          type="number"
                          value={quantityValues[productId] ?? ''}
                          onChange={(e) => handleQuantityChange(productId, e.target.value, item.amount)}
                          className={`quantity_input ${statusValues[productId] === 'S' &&
                              +quantityValues[productId] > item.amount
                              ? 'input-error' // qırmızı border class
                              : ''
                            }`}
                        />

                      )}
                    </td>
                    <td>
                      {isSelected && (
                        <select
                          value={statusValues[productId] ?? 'G'}
                          onChange={(e) => handleStatusChange(productId, e.target.value)}
                        >
                          <option value="G">Gözləyir</option>
                          <option value="S">Satılıb</option>
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="warehouse_submit">
            <button className="save_btn" onClick={handleSave}>Yadda saxla</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SalesProductsSelect;
