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
  const [selectedRows, setSelectedRows] = useState([0]);
  const [quantityValues, setQuantityValues] = useState({});
  const [priceValues, setPriceValues] = useState({});
  const [statusValues, setStatusValues] = useState({});

  console.log(saleUpdateObj);
  

  useEffect(() => {
    dispatch(getStockList());
    dispatch(getUsersList());
  }, [dispatch]);

  useEffect(() => {
    if (saleUpdateObj) {
      setSelectedCustomerId(saleUpdateObj.customer?.id || '');
      setSelectedDateTime(saleUpdateObj.datetime?.substring(0, 16) || '');
    }
  }, [saleUpdateObj]);

  const filtered = stockList?.filter(p => p.product?.id === saleUpdateObj?.product?.id) || [];

  useEffect(() => {
    if (!saleUpdateObj || filtered.length === 0) return;
    const index = 0; // yalnız bir məhsul olacaq

    setSelectedRows([index]);
    setQuantityValues({ [index]: saleUpdateObj.amount });
    setPriceValues({ [index]: saleUpdateObj.price });
    setStatusValues({ [index]: saleUpdateObj.status });
  }, [saleUpdateObj, filtered.length]);

  const handleCustomerChange = (id) => {
    setSelectedCustomerId(id);
  };

  const handleQuantityChange = (index, value, max) => {
    const val = Number(value);
    if (val >= 0 && val <= max) {
      setQuantityValues({ ...quantityValues, [index]: val });
    }
  };

  const handlePriceChange = (index, value) => {
    const val = Number(value);
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

  const returnSales = () => {
    navigate("/sales");
  };

  const handleSave = () => {
    if (!selectedCustomerId) {
      toast.error("Zəhmət olmasa müştəri seçin.");
      return;
    }
    if (!selectedDateTime) {
      toast.error("Zəhmət olmasa satış tarixini seçin.");
      return;
    }

    const index = 0;
    const product = filtered[index]?.product;
    if (!product) {
      toast.error("Məhsul tapılmadı.");
      return;
    }

    const quantity = quantityValues[index] || 0;
    const price = priceValues[index] || product.price;
    const status = statusValues[index] || 'G';

    if (quantity <= 0) {
      toast.error("Miqdar sıfırdan böyük olmalıdır.");
      return;
    }

    const payload = {
      customer: selectedCustomerId,
      product: product.id,
      amount: quantity,
      price: price,
      datetime: selectedDateTime,
      status: status
    };
    console.log(payload);
    

    dispatch(updateSale(payload, saleUpdateObj?.id, navigate));
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
            onChange={handleCustomerChange}
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
              {filtered.map((item, index) => (
                <tr key={index}>
                  <td><input type="checkbox" checked readOnly /></td>
                  <td>{item.product?.name}</td>
                  <td>{item.product?.articles?.map(a => a.name).join(', ')}</td>
                  <td>{item.amount}</td>
                  <td>{item.product?.cost_price} ₼</td>
                  <td>
                    <input
                      type="number"
                      className="price_input"
                      value={priceValues[index] ?? item.product?.price}
                      onChange={e => handlePriceChange(index, e.target.value)}
                    />
                  </td>
                  <td>{item.product?.discount_price ?? '-'} ₼</td>
                  <td>
                    <input
                      type="number"
                      className="quantity_input"
                      min={0}
                      max={item.amount}
                      value={quantityValues[index] ?? ''}
                      onChange={e => handleQuantityChange(index, e.target.value, item.amount)}
                    />
                  </td>
                  <td>
                    <select
                      value={statusValues[index] ?? 'G'}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                    >
                      <option value="G">Gözləyir</option>
                      <option value="S">Satılıb</option>
                    </select>
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

export default UpdateSalesProductsSelect;
