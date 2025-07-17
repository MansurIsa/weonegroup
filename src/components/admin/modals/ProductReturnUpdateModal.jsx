import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getReturnBackList, updateReturnBack } from '../../../actions/productsTableAction/productsTableAction';
import { handleCloseModal } from '../../../redux/slices/admin/productTableSlice';
import CustomSalesSelect from './CustomSalesSelect'; // PATH düzəldilməlidir

const ProductReturnUpdateModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { salesList } = useSelector(state => state.sales);
  const { productReturnUpdateObj } = useSelector(state => state.productTable);

  const [selectedSaleId, setSelectedSaleId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (productReturnUpdateObj) {
      setSelectedSaleId(productReturnUpdateObj.sale?.id?.toString() || '');
      setReturnDate(productReturnUpdateObj.date || '');
      setReason(productReturnUpdateObj.reason || '');
      setAmount(productReturnUpdateObj.amount?.toString() || '');
    }
  }, [productReturnUpdateObj]);

  const handleSubmit = async () => {
    const payload = {
      sale: selectedSaleId || null,
      date: returnDate || null,
      reason: reason || null,
      amount: amount || null,
    };

    await dispatch(updateReturnBack(payload, productReturnUpdateObj?.id, navigate));
    await dispatch(handleCloseModal());
    await dispatch(getReturnBackList());
  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(handleCloseModal())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className='close_icon' onClick={() => dispatch(handleCloseModal())} />

            {/* CustomSalesSelect */}
            <CustomSalesSelect
              sales={salesList}
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

            <button className="submit_btn" onClick={handleSubmit}>Yadda saxla</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReturnUpdateModal;
