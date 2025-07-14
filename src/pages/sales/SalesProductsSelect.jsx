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
  const [selectedRows, setSelectedRows] = useState([]);
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

  const toggleRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
      setQuantityValues(prev => {
        const copy = { ...prev }; delete copy[index]; return copy;
      });
      setPriceValues(prev => {
        const copy = { ...prev }; delete copy[index]; return copy;
      });
      setStatusValues(prev => {
        const copy = { ...prev }; delete copy[index]; return copy;
      });
    } else {
      setSelectedRows([...selectedRows, index]);
      const product = filtered[index]?.product;
      setQuantityValues(prev => ({ ...prev, [index]: prev[index] ?? 1 }));
      setPriceValues(prev => ({ ...prev, [index]: prev[index] ?? product?.price }));
      setStatusValues(prev => ({ ...prev, [index]: prev[index] ?? 'G' }));
    }
  };

  const handleQuantityChange = (index, value, max) => {
    const val = +value;
    if (val >= 0 && val <= max) {
      setQuantityValues({ ...quantityValues, [index]: val });
    }
  };

  const handlePriceChange = (index, value) => {
    const val = +value;
    if (val >= 0) {
      setPriceValues({ ...priceValues, [index]: val });
    }
  };

  const handleStatusChange = (index, value) => {
    setStatusValues({ ...statusValues, [index]: value });
  };

  const handleDateChange = (e) => {
    setSelectedDateTime(e.target.value);
  };

  const handleSave = () => {
    if (!selectedCustomerId || !selectedDateTime) {
      toast.error("Zəhmət olmasa müştəri və satış tarixini seçin.");
      return;
    }

    const selectedItems = selectedRows.map(index => {
      const product = filtered[index]?.product;
      return {
        product_id: product?.id,
        quantity: +quantityValues[index] || 0,
        price: +priceValues[index] || product?.price,
        status: statusValues[index] || 'G'
      };
    });

    if (selectedItems.some(item => item.quantity <= 0)) {
      toast.error("Miqdar sıfırdan böyük olmalıdır.");
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

    console.log("Payload:", payload);
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
              {filtered.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRow(index)}
                    />
                  </td>
                  <td>{item.product?.name}</td>
                  <td>{item.product?.articles?.map(a => a.name).join(', ')}</td>
                  <td>{item.amount}</td>
                  <td>{item.product?.cost_price} ₼</td>
                  <td>
                    {selectedRows.includes(index) ? (
                      <input
                        type="number"
                        value={priceValues[index] ?? item.product?.price}
                        onChange={e => handlePriceChange(index, e.target.value)}
                        className="price_input"
                      />
                    ) : (
                      `${item.product?.price} ₼`
                    )}
                  </td>
                  <td>{item.product?.discount_price ?? '-'} ₼</td>
                  <td>
                    {selectedRows.includes(index) && (
                      <input
                        type="number"
                        value={quantityValues[index] ?? ''}
                        onChange={(e) => handleQuantityChange(index, e.target.value, item.amount)}
                        className="quantity_input"
                      />
                    )}
                  </td>
                  <td>
                    {selectedRows.includes(index) && (
                      <select
                        value={statusValues[index] ?? 'G'}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                      >
                        <option value="G">Gözləyir</option>
                        <option value="S">Satılıb</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
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
