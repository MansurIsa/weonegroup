import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchaseListList, updatePurchaseCommon } from '../../../actions/purchaseAction/purchaseAction';
import { closePurchaseUpdateModalFunc } from '../../../redux/slices/admin/purchaseSlices';
// import your redux actions if needed

const PurchaseUpdateModalCommon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { purchaseUpdateModalCommonObj } = useSelector(state => state.purchase);

  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (purchaseUpdateModalCommonObj) {
      setDate(purchaseUpdateModalCommonObj.date || '');
      setCurrency(purchaseUpdateModalCommonObj.currency || '');
      setStatus(purchaseUpdateModalCommonObj.status || '');
    }
  }, [purchaseUpdateModalCommonObj]);

  const handleSubmit = async () => {
    const payload = {
      date: date || null,
      currency: currency || null,
      status: status || null,
    };

    console.log("Yenilənmiş alış məlumatı:", payload);

    // dispatch funksiyanız varsa burada çağırın
    await dispatch(updatePurchaseCommon(payload, purchaseUpdateModalCommonObj?.id, navigate));
    await dispatch(closePurchaseUpdateModalFunc());
    await dispatch(getPurchaseListList());

  };

  return (
    <div className="modal_overlay" onClick={() => dispatch(closePurchaseUpdateModalFunc())}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="modal_inner_container income_add_payment_modal_container">
          <div className="left_box">
            <IoMdClose className="close_icon" onClick={() => dispatch(closePurchaseUpdateModalFunc())} />

            <div className="form_group">
              <label>Tarix</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

           <div className="form_group">
  <label>Valyuta</label>
  <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
  >
    <option value="">Seçin</option>
    <option value="M">₼ Manat</option>
    <option value="D">$ Dollar</option>
    <option value="R">₽ Rubl</option>
  </select>
</div>


            <div className="form_group">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Seçin</option>
                <option value="A">Anbarda</option>
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

export default PurchaseUpdateModalCommon;
