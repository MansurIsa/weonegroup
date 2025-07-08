import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getSalesList } from '../../../actions/salesAction/salesAction';
import { handleCloseModal } from '../../../redux/slices/admin/productTableSlice';
import { addReturnBack } from '../../../actions/productsTableAction/productsTableAction';

const ProductReturnedModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedSaleId, setSelectedSaleId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    dispatch(getSalesList());
  }, [dispatch]);

  const { salesList } = useSelector(state => state.sales);

  const handleSubmit = () => {
    const payload = {
      sale: selectedSaleId || null,
      date: returnDate || null,
      reason: reason || null,
      amount: amount || null
    };

    console.log('Göndəriləcək məlumat:', payload);

    dispatch(addReturnBack(payload, navigate));
    dispatch(handleCloseModal());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(handleCloseModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>

        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className='close_icon' onClick={() => dispatch(handleCloseModal())} />

            <div className="form_group">
              <label>Satış seçin</label>
              <select value={selectedSaleId} onChange={(e) => setSelectedSaleId(e.target.value)}>
                <option value="">Satışı seçin</option>
                {salesList?.map(sale => (
                  <option key={sale.id} value={sale.id}>
                    {sale.customer.first_name} {sale.customer.last_name} — {sale.product.name}
                  </option>
                ))}
              </select>
            </div>

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

            <button className="submit_btn" onClick={handleSubmit}>Yadda saxla</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductReturnedModal;
