import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getSaleList } from '../../../actions/salesAction/salesAction';
import { handleCloseModal } from '../../../redux/slices/admin/productTableSlice';
import { addReturnBack, getReturnBackList } from '../../../actions/productsTableAction/productsTableAction';
import CustomSalesSelect from './CustomSalesSelect'; // Yol doğru olsun

const ProductReturnedModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSaleId, setSelectedSaleId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Y'); // Default olaraq "Yararsız"

  useEffect(() => {
    dispatch(getSaleList());
  }, [dispatch]);

  const { saleList } = useSelector(state => state.sales);
  console.log(saleList);
  

  const handleSubmit = async () => {
    const payload = {
      sale: selectedSaleId || null,
      date: returnDate || null,
      reason: reason || null,
      amount: amount || null,
      status: status || null
    };

    await dispatch(addReturnBack(payload, navigate));
    await dispatch(handleCloseModal());
    await dispatch(getReturnBackList());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(handleCloseModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className='close_icon' onClick={() => dispatch(handleCloseModal())} />

            <CustomSalesSelect
              sales={saleList}
              value={selectedSaleId}
              onChange={setSelectedSaleId}
            />

            <div className="form_group">
              <label>Tarix</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>Səbəb</label>
              <input
                type="text"
                placeholder="Qaytarılma səbəbi"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>Miqdar</label>
              <input
                type="text"
                placeholder="Miqdarı daxil edin"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form_group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Y">Yararsız</option>
                <option value="I">İşlək</option>
              </select>
            </div>

            <button className="submit_btn" onClick={handleSubmit}>Yadda saxla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReturnedModal;
