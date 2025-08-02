import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeSaleUpdateModalFunc } from '../../../redux/slices/admin/salesSlice';
import { getSalesList, updateSaleCommon } from '../../../actions/salesAction/salesAction';
// import { updateSaleCommon, closeSaleUpdateModalFunc, getSalesList } from 'your/actions'

const SaleUpdateModalCommon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { saleUpdateModalCommonObj } = useSelector(state => state.sales);

  console.log(saleUpdateModalCommonObj);
  

  const [dateTime, setDateTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (saleUpdateModalCommonObj) {
      // sale_datetime = "2025-08-01T17:29:00Z" → convert to local ISO format
      const formattedDate = saleUpdateModalCommonObj.sale_datetime
        ? new Date(saleUpdateModalCommonObj.sale_datetime).toISOString().slice(0, 16)
        : '';
      setDateTime(formattedDate);
      setStatus(saleUpdateModalCommonObj.sale_status || '');
    }
  }, [saleUpdateModalCommonObj]);

  const handleSubmit = async () => {
    const payload = {
      dt: dateTime ? new Date(dateTime).toISOString() : null,
      status: status || null,
    };

    console.log("Yenilənmiş satış məlumatı:", payload);

    await dispatch(updateSaleCommon(payload, saleUpdateModalCommonObj?.id, navigate));
    await dispatch(closeSaleUpdateModalFunc());
    await dispatch(getSalesList());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(closeSaleUpdateModalFunc())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className="close_icon" onClick={() => dispatch(closeSaleUpdateModalFunc())} />

            <div className="form_group">
              <label>Tarix və saat</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Seçin</option>
                <option value="S">Satılıb</option>
                <option value="G">Gözləyir</option>
              </select>
            </div>

            <button className="submit_btn" onClick={handleSubmit}>
              Yadda saxla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleUpdateModalCommon;
