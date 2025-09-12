import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/adminLayout/AdminLayout';
import { useNavigate } from 'react-router-dom';
import { getStockList } from '../../actions/stockActions/stockActions';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import CustomCustomerSelect from '../../components/admin/salesTableHead/CustomCustomerSelect';
import { getUsersList } from '../../actions/loginAction/loginAction';
import { updateSale } from '../../actions/salesAction/salesAction';

const UpdateSalesProductsSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stockList } = useSelector(state => state.stock);
  const { usersList } = useSelector(state => state.login);
  const { saleUpdateObj } = useSelector(state => state.sales);

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [quantityValues, setQuantityValues] = useState({});
  const [priceValues, setPriceValues] = useState({});
  const [statusValues, setStatusValues] = useState({});
  const [errorIndexes, setErrorIndexes] = useState([]);

 useEffect(() => {
    dispatch(getStockList());
    dispatch(getUsersList(1, "")); 
  }, [dispatch]);

    const handleCustomerSearch = (searchTerm) => {
    dispatch(getUsersList(1, searchTerm));
  };

  // Sale update info set
  useEffect(() => {
    if (saleUpdateObj) {
      setSelectedCustomerId(saleUpdateObj.customer?.id || '');
      setSelectedDateTime(saleUpdateObj.datetime?.substring(0, 16) || '');
    }
  }, [saleUpdateObj]);

  // Filter stock to only sale product
  const filtered = stockList?.filter(p => p.product?.id === saleUpdateObj?.product?.id) || [];

  // Initialize inputs values on load
  useEffect(() => {
    if (!saleUpdateObj || filtered.length === 0) return;
    const index = 0; // single product
    setQuantityValues({ [index]: saleUpdateObj.amount.toString() });
    setPriceValues({ [index]: saleUpdateObj.price });
    setStatusValues({ [index]: saleUpdateObj.status });
    setErrorIndexes([]);
  }, [saleUpdateObj, filtered.length]);

  // Handlers
  const handleCustomerChange = id => setSelectedCustomerId(id);
  const handleDateChange = e => setSelectedDateTime(e.target.value);

  const handleQuantityChange = (index, value) => {
    // Remove leading zeros, allow empty string to clear input
    const numericValue = value.replace(/^0+(?=\d)/, '');
    if (numericValue === '' || /^\d*$/.test(numericValue)) {
      setQuantityValues(prev => ({ ...prev, [index]: numericValue }));
      // Clear error on change
      setErrorIndexes(prev => prev.filter(i => i !== index));
    }
  };

  const handlePriceChange = (index, value) => {
    const val = Number(value);
    if (val >= 0) {
      setPriceValues(prev => ({ ...prev, [index]: val }));
    }
  };

  const handleStatusChange = (index, value) => {
    setStatusValues(prev => ({ ...prev, [index]: value }));
    setErrorIndexes(prev => prev.filter(i => i !== index));
  };

  const returnSales = () => navigate("/customer-movement-facture");

  const handleSave = async () => {
    setErrorIndexes([]);
    if (!selectedCustomerId) {
      toast.error("Zəhmət olmasa müştəri seçin.");
      return;
    }
    if (!selectedDateTime) {
      toast.error("Zəhmət olmasa satış tarixini seçin.");
      return;
    }

    const index = 0;
    const item = filtered[index];
    const product = item?.product;
    if (!product) {
      toast.error("Məhsul tapılmadı.");
      return;
    }

    const quantityStr = quantityValues[index] ?? '';
    const quantity = Number(quantityStr);

    if (!quantityStr || quantity <= 0) {
      toast.error("Miqdar sıfırdan böyük olmalıdır.");
      return;
    }

    const price = priceValues[index] ?? product.price;
    const status = statusValues[index] ?? 'G';

    if (status === 'S' && quantity > item.amount) {
      setErrorIndexes([index]);
      toast.error(`Satış statusunda olan məhsulun miqdarı anbardakı ${item.amount} ədəd sayından çox ola bilməz.`);
      return;
    }

    const payload = {
      customer: selectedCustomerId,
      product: product.id,
      amount: quantity,
      price,
      datetime: selectedDateTime,
      status,
    };

    await dispatch(updateSale(payload, saleUpdateObj?.id, navigate));
    navigate("/sales");
  };

  return (
    <AdminLayout adminHeaderHide={true}>
      <div className="admin_container warehouse_page">
        <div className="return_btn">
          <button onClick={returnSales}>Geri dön</button>
        </div>

        <div className="left_box left_box_mb">
         <CustomCustomerSelect
            customers={usersList.filter(u => !u.is_staff)}
            value={selectedCustomerId}
            onChange={setSelectedCustomerId}
            onSearch={handleCustomerSearch}   // 🔹 Burda search-i bağladıq
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
                return (
                  <tr key={index}>
                    <td><input type="checkbox" checked readOnly /></td>
                    <td>{product?.name}</td>
                    <td className='table_article_scroll'>{product?.articles?.map(a => a.name).join(', ')}</td>
                    <td>{item.amount}</td>
                    <td>{product?.cost_price} ₼</td>
                    <td>
                      <input
                        type="number"
                        className="price_input"
                        value={priceValues[index] ?? product?.price}
                        onChange={e => handlePriceChange(index, e.target.value)}
                      />
                    </td>
                    <td>{product?.discount_price ?? '-'} ₼</td>
                    <td>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className={`quantity_input ${errorIndexes.includes(index) ? 'error_input' : ''}`}
                        value={quantityValues[index] ?? ''}
                        onChange={e => handleQuantityChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={statusValues[index] ?? 'G'}
                        onChange={e => handleStatusChange(index, e.target.value)}
                      >
                        <option value="G">Gözləyir</option>
                        <option value="S">Satılıb</option>
                      </select>
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

export default UpdateSalesProductsSelect;
